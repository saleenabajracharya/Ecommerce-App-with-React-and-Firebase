import {useContext} from 'react'
import { Layout } from '../layout/Layout'
import { useNavigate } from "react-router";
import { myContext } from '../../context/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from "../../redux/cartSlice"; 
import { ToastContainer, toast } from 'react-toastify';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 
// const productData = [
//     {
//       id: 1,
//       image:
//         "/images/sale/shoes.jpg",
//       title: "Nike Air Force 1 High",
//       desc: "Step up your style with the Nike Air Force 1 High in a sleek white and red colorway. Featuring a premium leather upper, high-top design for added support, and a cushioned midsole for all-day comfort, this classic sneaker is perfect for both casual wear and street fashion.",
//       price: 5500,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 2,
//       image:
//         "/images/sale/dress.jpg",
//       title: "Red Long-Sleeve Dress",
//       desc: "Make a statement with this stunning red long-sleeve dress, designed for elegance and sophistication. Featuring a flowing silhouette, soft fabric, and a flattering fit, this dress is perfect for special occasions, evening events, or formal gatherings.",
//       price: 1800,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 3,
//       image:
//         "/images/sale/loops.jpg",
//       title: "Lasso Hoops",
//       desc: "Crafted for elegance and durability, this jewelry piece enhances your style effortlessly.. Positive impact.",
//       price: 1000,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 4,
//       image:
//         "/images/sale/clear.jpg",
//       title: "Minimalist Clear Eyeglasses",
//       desc: "These stylish clear eyeglasses offer a sleek and modern design, perfect for a sophisticated and effortless look. Featuring a lightweight frame and transparent lenses, they complement any outfit while providing all-day comfort.",
//       price: 1299,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 1,
//       image:
//        "/images/sale/lipstick.jpg",
//       title: "MAC Matte Lipstick",
//       desc: "The MAC Ruby Woo Matte Lipstick is a timeless classic, known for its bold and vibrant red shade that suits all skin tones. With its long-lasting, non-drying matte formula, it delivers a rich, velvety finish that stays put for hours. ",
//       price: 1750,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 2,
//       image:
//     "/images/sale/nails.jpg",
//       title: "Luxury Press-On Nails",
//       desc: "Elevate your manicure game with these premium press-on nails, designed for a flawless, salon-quality look in minutes. Featuring a variety of stylish shapes, lengths, and finishes, these nails offer a hassle-free application with long-lasting wear.",
//       price: 699,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 3,
//       image:
//         "/images/sale/shirt.jpg",
//       title: "Classic Blue Dress Shirt",
//       desc: "Upgrade your wardrobe with this timeless blue and white checkered dress shirt, perfect for both casual and formal settings. Crafted from breathable, high-quality fabric, it offers a comfortable fit with a sharp, polished look.",
//       price: 1300,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//     {
//       id: 4,
//       image:
//         "/images/sale/bag.jpg",
//       title: "Pink Crossbody Bag",
//       desc: "Add a touch of sophistication to your outfit with this chic pink leather crossbody bag. Designed for both style and functionality, it features a sleek silhouette, durable leather construction, and an adjustable strap for versatile wear.",
//       price: 2500,
//       trendingProductName: "Featured",
//       quantity: 1,
//     },
//   ];
export const AllProducts = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const {getAllProduct} = context;

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
        <Layout>
      <div className="mt-5">
        {/* Heading  */}
        <div className="text-center my-3">
          <h1 className="fw-semibold fs-4">All Products</h1>
        </div>
        {/* main  */}
        <section className="text-secondary">
          <div className="container px-5 py-3 mx-auto">
            <div className="d-flex flex-wrap mx-n2">
            {getAllProduct.map((item, index) => {
                            const { id, title, price,productImage, rating } = item;
                return (
                  <div key={index} className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 p-2">
                    <div className="border border-secondary rounded overflow-hidden shadow-sm cursor-pointer hover-shadow" 
                    >
                      <img
                        className="img-fluid"
                        src={productImage}
                        alt="blog"
                        style={{
                          height: "320px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        onClick={()=> navigate(`/product-info/${id}`)}
                      />
                      <div className="p-3">
                        <h2 className="text-muted small mb-1"></h2>
                        <h1 className="h5 fw-medium text-dark mb-2 fs-6 fs-md-6 fs-lg-5 fs-xl-4 title">
                          {title.substring(0, 25)}
                        </h1>
                        <div className="d-flex mb-2">{renderStars(rating)}</div>
                        <h1 className="h5 fw-medium text-dark mb-3 fs-6 fs-md-5 fs-lg-4" title>
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
            </div>
            
          </div>
        </section>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
      </Layout>
    );
}
