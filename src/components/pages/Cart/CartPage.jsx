
import { FaRegTrashAlt } from "react-icons/fa";
import { Layout } from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, addToCart, deleteFromCart, clearCart } from "../../../redux/cartSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BuyNowModal } from "../../buyNowModal/BuyNowModal";
import { Navigate } from "react-router-dom";
import { Timestamp, addDoc, collection} from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";


// const products = [
//   {
//       id: 1,
//       name: 'Nike Air Force 1 07 LV8',
//       href: '#',
//       price: 'Rs. 47,199',
//       originalPrice: 'Rs. 48,900',
//       discount: '5% Off',
//       color: 'Orange',
//       size: '8 UK',
//       imageSrc:
//           'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
//   },
//   {
//       id: 2,
//       name: 'Nike Blazer Low 77 SE',
//       href: '#',
//       price: 'Rs. 1,549',
//       originalPrice: 'Rs. 2,499',
//       discount: '38% off',
//       color: 'White',
//       leadTime: '3-4 weeks',
//       size: '8 UK',
//       imageSrc:
//           'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
//   },
//   {
//       id: 3,
//       name: 'Nike Air Max 90',
//       href: '#',
//       price: 'Rs. 2219 ',
//       originalPrice: 'Rs. 999',
//       discount: '78% off',
//       color: 'Black',
//       imageSrc:
//           'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
//   },
// ]

export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart")
}

const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
};

const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
};

const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

const user = JSON.parse(localStorage.getItem('users'))

// Buy Now Function
const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    )
});

const buyNowFunction = () => {
    // validation 
    if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
        return toast.error("All Fields are required")
    }

    

    const orderInfo = {
        cartItems,
        addressInfo,
        email: user.email,
        userid: user.uid,
        status: "confirmed",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        ),
        
    }
  try {
      const orderRef = collection(fireDB, 'order');
      addDoc(orderRef, orderInfo);
      dispatch(clearCart());
      setAddressInfo({
          name: "",
          address: "",
          pincode: "",
          mobileNumber: "",
      })
      toast.success("Order Placed Successfull")
  } catch (error) {
      console.log(error)
      toast.success("Error while Placing order")
  }
   

}
return (
  <Layout>
      <div className="container">
          <div className="row justify-content-center py-4">
              <div className="col-lg-10">
                  <h1 className="h3 fw-bold text-dark"></h1>
                  <form className="mt-4 row">
                      <section aria-labelledby="cart-heading" className="col-lg-8 bg-white rounded p-3 shadow-sm">
                          <h2 id="cart-heading" className="visually-hidden"></h2>
                          <ul className="list-group">
                              {cartItems.length > 0 ? (
                                  <>
                                      {cartItems.map((item, index) => {
                                          const { id, title, price, productImage, quantity, category } = item;
                                          return (
                                              <div key={index} className="border-bottom pb-3 mb-3">
                                                  <li className="d-flex align-items-center py-3">
                                                      <div className="flex-shrink-0">
                                                          <img
                                                              src={productImage}
                                                              alt="img"
                                                              className="img-fluid rounded"
                                                              style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                                          />
                                                      </div>
                                                      <div className="ms-3 flex-grow-1">
                                                          <div className="d-flex justify-content-between">
                                                              <h3 className="h6 fw-semibold">{title}</h3>
                                                          </div>
                                                          <p className="text-muted small">{category}</p>
                                                          <p className="fw-medium text-dark">Rs. {price}</p>
                                                      </div>
                                                  </li>
                                                  <div className="d-flex align-items-center">
                                                      <div className="d-flex align-items-center">
                                                          <button onClick={() => handleDecrement(id)} type="button" className="btn btn-outline-secondary btn-sm">
                                                              -
                                                          </button>
                                                          <input
                                                              type="text"
                                                              className="mx-2 text-center form-control form-control-sm"
                                                              value={quantity}
                                                              style={{ width: "50px" }}
                                                              readOnly
                                                          />
                                                          <button onClick={() => handleIncrement(id)} type="button" className="btn btn-outline-secondary btn-sm">
                                                              +
                                                          </button>
                                                      </div>
                                                      <button onClick={() => deleteCart(item)} type="button" className="btn btn-link text-danger ms-3 text-decoration-none">
                                                          <FaRegTrashAlt size={12} className="me-1" />
                                                          Remove
                                                      </button>
                                                  </div>
                                              </div>
                                          );
                                      })}
                                  </>
                              ) : (
                                  <h1 className="text-center">Not Found</h1>
                              )}
                          </ul>
                      </section>

                      {/* Order summary */}
                      <section aria-labelledby="summary-heading" className="col-lg-4 mt-4 mt-lg-0 bg-white rounded p-3 shadow-sm">
                          <h2 id="summary-heading" className="border-bottom pb-2 mb-3 h5 fw-bold text-dark">Order Summary</h2>
                          <dl className="mb-3">
                              <div className="d-flex justify-content-between">
                                  <dt className="small text-muted">Price ({cartItemTotal} item)</dt>
                                  <dd className="small fw-medium text-dark">Rs. {cartTotal}</dd>
                              </div>
                              <div className="d-flex justify-content-between my-3">
                                  <dt className="small text-muted">Delivery Charges</dt>
                                  <dd className="small fw-medium text-success">Free</dd>
                              </div>
                              <div className="d-flex justify-content-between border-top pt-3">
                                  <dt className="fw-bold text-dark">Total Amount</dt>
                                  <dd className="fw-bold text-dark">Rs. {cartTotal}</dd>
                              </div>
                          </dl>
                          <div className="text-center mt-3 d-flex justify-content-end">
                    
                          {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            /> : <Navigate to={'/login'}/>
                                        }
                          </div>
                      </section>
                  </form>
              </div>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />
      </div>
  </Layout>
);

};


