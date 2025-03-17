import { useParams, useNavigate } from "react-router";
import { Layout } from "../../layout/Layout";
import { useContext, useEffect } from "react";
import { myContext } from "../../../context/myContext";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
export const CategoryPage = () => {
    const {categoryname} = useParams();
    
    const context = useContext(myContext);
    const {getAllProduct, loading } = context;
    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj)=> obj.category.includes(categoryname));

    const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();

  const addCart = (item) => {
    const itemToSave = {
      ...item,
      time: item.time ? item.time.toDate().toISOString() : new Date().toISOString(),
    };

    dispatch(addToCart(itemToSave));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };
    return (
        <Layout>
        <div className="mt-4">
            {/* Heading */}
            <div className="text-center mb-4">
                <h1 className="text-capitalize fw-semibold fs-3">{categoryname}</h1>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <Loader />
                </div>
            ) : (
                <section className="text-secondary">
                    <div className="container px-4 py-4 mx-auto">
                        <div className="row justify-content-center">
                            {filterProduct.length > 0 ? (
                                <>
                                    {filterProduct.map((item, index) => {
                                        const { id, title, price, productImage } = item;
                                        return (
                                            <div key={index} className="col-12 col-md-6 col-lg-3 p-2">
                                                <div className="border border-secondary rounded-3 overflow-hidden shadow-sm cursor-pointer">
                                                    <img
                                                        onClick={() => navigate(`/product-info/${id}`)}
                                                        className="img-fluid w-100"
                                                        style={{ height: "320px", objectFit: "cover" }}
                                                        src={productImage}
                                                        alt="img"
                                                    />
                                                    <div className="p-3">
                                                        <h2 className="text-muted text-uppercase small mb-1"></h2>
                                                        <h1 className="fw-medium fs-5 text-dark mb-2">
                                                            {title.substring(0, 25)}
                                                        </h1>
                                                        <h1 className="fw-medium fs-5 text-dark mb-2">
                                                            Rs.{price}
                                                        </h1>
                                                        <div className="d-flex justify-content-center">
                                                        {cartItems.some((p) => p.id === item.id) ? (
                                        <button
                                            className="btn w-100 fw-bold"
                                            onClick={() => deleteCart(item)}
                                            style={{ backgroundColor: "#c3e1bb", color: "White" }}
                                        >
                                            Remove from Cart
                                        </button>
                                        ) : (
                                        <button
                                            className="btn w-100 fw-bold"
                                            onClick={() => addCart(item)}
                                            style={{ backgroundColor: "#67a357", color: "White" }}
                                        >
                                            Add to Cart
                                        </button>
                                        )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <img
                                            className="mb-2"
                                            src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                            alt=""
                                        />
                                    </div>
                                    <h1 className="text-dark fs-4">No {categoryname} product found</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
           <ToastContainer position="top-center" autoClose={3000} /> 
        </div>
    </Layout>
    );
}

