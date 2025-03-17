import { useContext, useEffect, useState } from 'react';
import { Layout } from '../layout/Layout';
import { myContext } from '../../context/myContext';
import { useParams } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { Loader } from '../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiStar } from 'react-icons/ci';
import { getAuth } from 'firebase/auth';

export const ProductInfo = () => {
  const user = JSON.parse(localStorage.getItem('users'));
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const auth = getAuth();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, 'products', id));
      if (productTemp.exists()) {
        setProduct(productTemp.data());
        setRating(productTemp.data().rating || 0);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductData();
    }
  }, [id]);

  const addCart = (item) => {
    const itemToSave = {
      ...item,
      time: item.time ? item.time.toDate().toISOString() : new Date().toISOString(),
    };
    dispatch(addToCart(itemToSave));
    toast.success('Added to cart');
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Removed from cart');
  };

  const handleRating = async (newRating) => {
    setRating(newRating);
    try {
      await updateDoc(doc(fireDB, 'products', id), { rating: newRating });
      toast.success(`Rated ${newRating} stars!`);
    } catch (error) {
      console.error('Error updating rating:', error);
      toast.error('Failed to update rating.');
    }
  };

  const submitReview = async () => {
    if (!review.trim()) {
      toast.error('Review cannot be empty');
      return;
    }
    if (!auth.currentUser) {
      toast.error('You must be logged in to submit a review');
      return;
    }
    try {
      const userName = auth.currentUser.displayName || 'Anonymous';
      await updateDoc(doc(fireDB, 'products', id), {
        reviews: arrayUnion({ username: userName, text: review, date: new Date().toISOString() })
      });
      setReview('');
      getProductData(); 
      toast.success('Review added!');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review.');
    }
  };

  return (
    <div>
      <Layout>
        <div className="container py-5">
          {loading && <Loader />}
          {!loading && !product ? (
            <h2 className="text-center">No Product Found</h2>
          ) : (
            <div className="row">
              <div className="col-md-6 my-4">
                <img
                  src={product?.productImage}
                  alt={product?.title}
                  className="img-fluid border rounded"
                  style={{ height: '450px', width: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-6 my-4">
                <h2 className="fw-bold">{product?.title}</h2>
                <div className="d-flex">
                  <h6 className="text-success">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CiStar
                        key={star}
                        size={24}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRating(star)}
                        color={star <= rating ? '#ffc107' : 'gray'}
                      />
                    ))}
                  </h6>
                </div>
                <p className="text-muted">{product?.description}</p>
                <h3 className="fw-semibold">Rs. {product?.price}</h3>
                {cartItems.some((p) => p.id === product?.id) ? (
                  <button
                    className="btn fw-bold"
                    onClick={() => deleteCart(product)}
                    style={{ backgroundColor: '#c3e1bb', color: 'White' }}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="btn fw-bold"
                    onClick={() => addCart(product)}
                    style={{ backgroundColor: '#67a357', color: 'White' }}
                  >
                    Add to Cart
                  </button>
                )}

                <div className="mt-5">
                  <h5>Reviews:</h5>
                  {product?.reviews?.length ? (
                    product.reviews.map((rev, index) => (
                      <div key={index} className="border p-2 my-2 rounded">
                        <strong>{rev.username}:</strong>
                        <p>{rev.text}</p>
                        <small className="text-muted">{new Date(rev.date).toLocaleString()}</small>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>

                <div className="mt-4">
                  <h5>Leave a Review:</h5>
                  <textarea
                    className="form-control"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="3"
                    placeholder="Write your review here..."
                  ></textarea>
                  <button className="btn  mt-2" onClick={submitReview}
                  style={{ backgroundColor: '#67a357', color: 'White' }}>
                    Submit Review
                  </button>
                </div>
                
                
                
              </div>
            </div>
          )}
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </Layout>
    </div>
  );
};
