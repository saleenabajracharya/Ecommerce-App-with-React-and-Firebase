import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { myContext } from "../../../context/myContext";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { Loader } from "../../loader/Loader";
import { doc, getDoc, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

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

export const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();

  // State for product details
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImage: "",
    category: "",
    description: "",
    quantity: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [preview, setPreview] = useState(""); // For image preview
  const [base64Image, setBase64Image] = useState(""); // For base64 image
  const [file, setFile] = useState(null); // For storing the selected file

  // Fetch single product data
  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productRef = doc(fireDB, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        setProduct({
          title: productData?.title,
          price: productData?.price,
          productImage: productData?.productImage,
          category: productData?.category,
          description: productData?.description,
          quantity: productData?.quantity,
          time: productData?.time,
          date: productData?.date,
        });

        // Set image preview if an image exists
        if (productData?.productImage) {
          setPreview(productData.productImage);
        }
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product data");
    }
    setLoading(false);
  };

  // Handle file selection
  // Handle file selection
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile) return;

  // Validate file type
  const validExtensions = ["image/jpeg", "image/png", "image/webp"];
  if (!validExtensions.includes(selectedFile.type)) {
    toast.error("Invalid file format. Use JPEG, PNG, or WEBP.");
    return;
  }

  // Validate file size (if >800KB, compress)
  if (selectedFile.size > 0.8 * 1024 * 1024) {
    compressImage(selectedFile, 0.5);
  } else {
    convertToBase64(selectedFile);
  }

  setFile(selectedFile);
  setProduct({
    ...product,
    imageName: selectedFile.name,
  });
};

// Compress Image Function
const compressImage = (selectedFile, quality) => {
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size (reduce resolution for compression)
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        } else {
          width = (width * MAX_HEIGHT) / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to base64 with compression
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      setPreview(compressedBase64);
      setBase64Image(compressedBase64);
    };
  };
};

// Convert image file to Base64
const convertToBase64 = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    setPreview(event.target.result);
    setBase64Image(event.target.result);
  };
};

// Update product in Firestore
const updateProduct = async () => {
  if (
    product.title === "" ||
    product.price === "" ||
    product.description === ""
  ) {
    return toast.error("All fields are required, including an image");
  }

  setLoading(true);
  try {
    const productRef = doc(fireDB, "products", id);
    const updatedData = {
      ...product,
      productImage: base64Image ? base64Image : product.productImage, // Ensure old image is retained
      time: Timestamp.now(),
    };

    await updateDoc(productRef, updatedData);

    toast.success("Product updated successfully");
    navigate("/admin-dashboard");
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product");
  }
  setLoading(false);
};


  useEffect(() => {
    getSingleProductFunction();
  }, []);

  const deleteProduct = async (id) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'products', id))
        toast.success('Product Deleted successfully')
        getAllProductFunction();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      {loading && <Loader />}
      <div
        className="login_Form p-4 border border-success rounded shadow"
        style={{ backgroundColor: "#f0f9ee" }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: "#67a357" }}>
          Update Product
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Product Title"
          className="form-control border-success text-muted mb-3"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Product Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="form-control border-success text-muted mb-3"
        />

        {/* Image Upload */}
        <div className="container mt-3">
          <input
            type="file"
            className="form-control mb-2"
            onChange={handleFileChange}
            accept="image/*"
          />
          {preview && (
            <img
              src={preview}
              alt="Selected Preview"
              className="img-fluid rounded shadow my-2"
              width="300"
              height="400"
              style={{ height: "250px", objectFit: "cover" }}
            />
          )}
        </div>

        {/* Category */}
        <select
          className="form-select text-muted border-success mb-3"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
          <option disabled>Select Product Category</option>
          {categoryList.map((value, index) => (
            <option key={index} value={value.name} className="text-capitalize">
              {value.name}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Product Description"
          rows="5"
          className="form-control text-muted border-success mb-3"
        ></textarea>

        {/* Update Button */}
        <button
          type="button"
          onClick={updateProduct}
          className="btn w-100 fw-bold"
          style={{ backgroundColor: "#67a357", color: "White" }}
        >
          Update Product
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
