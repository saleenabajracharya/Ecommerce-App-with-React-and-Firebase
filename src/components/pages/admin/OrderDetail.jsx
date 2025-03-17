import { useContext } from "react";
import { myContext } from "../../../context/myContext";
import { MdDelete } from "react-icons/md";

export const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, deleteProduct } = context;

    return (
        <div>
            <div>
                <div className="py-3">
                    {/* text  */}
                    <h1 className="fs-4 fw-bold" style={{ color: "#67a357" }}>
                        All Order
                    </h1>
                </div>

                <div className="w-100 overflow-auto">
                    <table className="table table-bordered table-hover text-success">
                        <tbody>
                            <tr>
                                <th className="py-3 text-md border bg-light fw-bold">S.No.</th>
                                <th className="py-3 text-md border bg-light fw-bold">Order Id</th>
                                <th className="py-3 text-md border bg-light fw-bold">Image</th>
                                <th className="py-3 text-md border bg-light fw-bold">Title</th>
                                <th className="py-3 text-md border bg-light fw-bold">Category</th>
                                <th className="py-3 text-md border bg-light fw-bold">Price</th>
                                <th className="py-3 text-md border bg-light fw-bold">Quantity</th>
                                <th className="py-3 text-md border bg-light fw-bold">Total Price</th>
                                <th className="py-3 text-md border bg-light fw-bold">Status</th>
                                <th className="py-3 text-md border bg-light fw-bold">Name</th>
                                <th className="py-3 text-md border bg-light fw-bold">Address</th>
                                <th className="py-3 text-md border bg-light fw-bold">Pin Code</th>
                                <th className="py-3 text-md border bg-light fw-bold">Phone No.</th>
                                <th className="py-3 text-md border bg-light fw-bold">Email</th>
                                <th className="py-3 text-md border bg-light fw-bold">Date</th>
                                <th className="py-3 text-md border bg-light fw-bold">Action</th>
                            </tr>

                            {getAllOrder.map((order) =>
                                order.cartItems.map((item, index) => {
                                    const { id, productImage, title, category, price, quantity } = item;
                                    return (
                                        <tr key={`${order.id}-${id}`} className="text-danger">
                                            <td className="py-3 px-3 border text-secondary">{index + 1}.</td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.id}
                                            </td>
                                            <td className="py-3 px-3 border text-success">
                                                {productImage ? (
                                                    <img
                                                        src={productImage}
                                                        alt={title}
                                                        style={{
                                                            width: "150px",
                                                            height: "150px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>
                                            <td className="py-3 px-3 border text-danger">{title}</td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {category}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                Rs. {price}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {quantity}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                Rs. {price * quantity}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.status}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.addressInfo.name}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.addressInfo.address}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.addressInfo.pincode}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.addressInfo.mobileNumber}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.email}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                {order.date}
                                            </td>
                                            <td className="py-3 px-3 border text-secondary text-capitalize">
                                                <span
                                                    className="text-danger fs-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => deleteProduct(order.id)}
                                                >
                                                    <MdDelete />
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
