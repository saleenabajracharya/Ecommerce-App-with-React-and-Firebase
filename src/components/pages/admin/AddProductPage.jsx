import { useContext, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { myContext } from "../../../context/myContext";
import { toast, ToastContainer } from "react-toastify";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../loader/Loader";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "skincare" },
  { name: "books" },
];

export const AddProductPage = () => {

  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImage: "",
    category: "",
    description: "",
    quantity: 1,
    imageName: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validExtensions = ["image/jpeg", "image/png", "image/webp"];
    if (!validExtensions.includes(file.type)) {
      toast.error("Invalid file format. Use JPEG, PNG, or WEBP.");
      return;
    }

    // Validate file size (if >1MB, compress)
    if (file.size > 0.8 * 1024 * 1024) {
      compressImage(file, 0.5);
    } else {
      convertToBase64(file);
    }
  };

  const compressImage = (file, quality) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        setPreview(compressedBase64);
        setBase64Image(compressedBase64);
      };
    };
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setPreview(event.target.result);
      setBase64Image(event.target.result);
    };
  };

  const addProductFunction = async () => {
    debugger;
    if (
      product.title === "" ||
      product.price === "" ||
      product.category === "" ||
      product.description === "" ||
      !base64Image
    ) {
      return toast.error("All fields are required, including an image");
    }

    setLoading(true);
    try {
      // Generate a unique image name (e.g., using timestamp)
      const imageName = preview ? `image_${Date.now()}.jpg` : "";
      // Save product with Base64 image
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, {
        ...product,
        productImage: base64Image,
        imageName: imageName,
      });

      toast.success("Product added successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Add product failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      {loading && <Loader />}
      <div
        className="login_Form p-4 border border-success rounded shadow"
        style={{ backgroundColor: "#f0f9ee" }}
      >
        <div className="mb-4 d-flex align-items-center justify-content-between">
  <h2 className="fw-bold flex-grow-1 text-center" style={{ color: "#67a357" }}>
    Add Product
  </h2>
  <button type="button" className="btn-close mb-5" onClick={() => navigate("/admin-dashboard")}></button>
</div>


        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Product Title"
            className="form-control border-success text-muted"
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="form-control border-success text-muted"
          />
        </div>

        <div className="container mt-3">
          <input
            type="file"
            className="form-control mb-2"
            onChange={handleFileChange}
            accept="image/*"
          />

          {preview && (
            <div className="my-2">
              <img
                src={preview}
                alt="Selected Preview"
                className="img-fluid rounded shadow"
                width="300"
                height="400"
                style={{ height: "250px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <select
            className="form-select text-muted border-success"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          >
            <option disabled>Select Product Category</option>
            {categoryList.map((value, index) => (
              <option key={index} value={value.name} className="text-capitalize">
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            rows="5"
            className="form-control text-muted border-success"
          ></textarea>
        </div>

        <div className="mb-3">
          <button
            type="button"
            onClick={addProductFunction}
            className="btn w-100 fw-bold"
            style={{ backgroundColor: "#67a357", color: "White" }}
          >
            Add Product
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
