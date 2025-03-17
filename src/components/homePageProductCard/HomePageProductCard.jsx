import { useContext } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { myContext } from "../../context/myContext";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 

export const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

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


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  return (
    <div className="mt-10">
      <div className="text-center my-4">
        <h1 className="fw-semibold fs-4">Flash Sale</h1>
      </div>

      <section className="text-secondary">
        <div className="container px-5 py-5 mx-auto">
          <div className="d-flex flex-wrap mx-n2">
            {(getAllProduct || []).slice(0, 8).map((item, index) => {
              if (!item) return null;
              const { id, title, price, productImage, rating = 0 } = item;

              return (
                <div key={index} className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 p-2">
                  <div className="border border-secondary rounded overflow-hidden shadow-sm cursor-pointer hover-shadow">
                    <img
                      className="img-fluid"
                      src={productImage}
                      alt="product"
                      style={{
                        height: "320px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      onClick={() => navigate(`/product-info/${id}`)}
                    />
                    <div className="p-3">
                      <h1 className="h5 fw-medium text-dark mb-2 fs-6 title">
                        {title.substring(0, 25)}
                      </h1>

                     
                      <div className="d-flex mb-2">{renderStars(rating)}</div>

                      <h1 className="h5 fw-medium text-dark mb-3 fs-6">
                        Rs. {price}
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
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
