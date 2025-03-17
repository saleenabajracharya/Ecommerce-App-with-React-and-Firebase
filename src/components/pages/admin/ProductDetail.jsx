import {useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { myContext } from '../../../context/myContext';
import { Loader } from '../../loader/Loader';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../../firebase/FirebaseConfig';
import { toast,ToastContainer } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    // console.log(getAllProduct)

    // navigate 
    const navigate = useNavigate();
    
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
    <div><div>
    <div className="py-3 d-flex justify-content-between align-items-center">

        <h1 className="fs-4 fw-bold"  style={{color:"#67a357"}}>All Product</h1>
        <Link to={'/addproduct'}>
        <button className="btn bg-light product-button" style={{borderColor:"#67a357", color:"#67a357"}}>Add Product</button>
        </Link>
    </div>

    <div className="w-100 overflow-auto">
        <div className="d-flex justify-content-center position-relative mt-5">
        {loading && <Loader />}
        </div>

        <table className="table table-bordered table-hover">
            <tbody>
                <tr>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">S.No.</th>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">Image</th>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">Title</th>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">Price</th>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">Category</th>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">Date</th>
                    <th scope="col" className="py-3 px-4 text-md border bg-light fw-bold">Actions</th>

                </tr>
                {getAllProduct.map((item, index) => {
                    const { id, title, price, category, date, productImage } = item;
                    
                    return (
                <tr key={index} className="text-danger" >
                    <td className="py-3 px-4 border text-secondary">{index + 1}.</td>
                    <td className="py-3 px-4 border text-secondary text-capitalize">
                        {productImage ? (
                            <img src={productImage} alt={title} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                        ) : (
                            "No Image"
                        )}
                    </td>

                    <td className="py-3 px-4 border text-secondary text-capitalize">{title}</td>
                    <td className="py-3 px-4 border text-secondary text-capitalize">Rs.{price}</td>
                    <td className="py-3 px-4 border text-secondary text-capitalize">{category}</td>
                    <td className="py-3 px-4 border text-secondary text-capitalize">{date}</td>
                    <td className="py-3 px-4 border " style={{ cursor: "pointer" }}>
                    {/* Edit Link */}
                    <Link className="text-success text-decoration-none pe-2 fs-3" to={`/updateproduct/${id}`}>
                        <FaEdit />
                    </Link>
                    
                    {/* Delete Button */}
                    <span className="text-danger fs-3" onClick={() => deleteProduct(id)} style={{ cursor: "pointer" }}>
                    <MdDelete />
                    </span>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </table>
    </div>
</div>
<ToastContainer position="top-center" autoClose={2000} />
</div>
  )
}
