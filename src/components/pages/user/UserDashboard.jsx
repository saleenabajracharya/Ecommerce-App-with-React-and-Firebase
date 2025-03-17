import { useContext } from "react";
import { Layout } from "../../layout/Layout";
import { myContext } from "../../../context/myContext";
import { Loader } from "../../loader/Loader";

export const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem("users"));

    const context = useContext(myContext);
    const { loading, getAllOrder } = context;
    console.log(getAllOrder);


    return (
        <Layout>
            <div className="container my-5">
                <div
                    className="card border border-success-subtle shadow-sm mb-4"
                    style={{ backgroundColor: "#e8fae3" }}
                >
                    <div className="card-body text-center">
                        <img
                            src="/images/user.png"
                            alt="User"
                            className="mb-3"
                            width="80"
                        />
                        <h5 className="card-title">
                            <strong>Name:</strong> {user?.fullName}
                        </h5>
                        <p className="card-text">
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <p className="card-text">
                            <strong>Date:</strong> {user?.date}
                        </p>
                        <p className="card-text">
                            <strong>Role:</strong> {user?.role}
                        </p>
                    </div>
                </div>

                <h2 className="text-center fw-bold">Order Details</h2>

                <div className="d-flex justify-content-center position-relative mt-3">
                    {loading && <Loader />}
                </div>

                {getAllOrder
                    .filter((obj) => obj.userid === user?.uid)
                    .map((order, orderIndex) => {
                        return (
                            <div key={orderIndex} className="card border border-success-subtle shadow-sm mt-4">
                                <div className="row g-0">
                                    <div
                                        className="col-md-3 border-end border-success-subtle p-4"
                                        style={{ backgroundColor: "#e8fae3" }}
                                    >
                                        <div className="mb-3">
                                            <h6 className="fw-semibold">Order ID</h6>
                                            <p className="mb-0">#{order.id}</p>
                                        </div>

                                        <div className="mb-3">
                                            <h6 className="fw-semibold">Date</h6>
                                            <p className="mb-0">{order.date}</p>
                                        </div>

                                        <div className="mb-3">
                                            <h6 className="fw-semibold">Total Amount</h6>
                                            <p className="mb-0">Rs. {order.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                                        </div>

                                        <div className="mb-3">
                                            <h6 className="fw-semibold">Order Status</h6>
                                            <p className="fw-bold" style={{ color: "#67a357" }}>
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 p-4">
                                        <ul className="list-group list-group-flush">
                                            {order.cartItems.map((item, itemIndex) => {
                                                const { id, date, quantity, price, title, productImage, category } = item;
                                                return (
                                                    <li key={itemIndex} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={productImage}
                                                                alt={title}
                                                                className="img-thumbnail me-3"
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    objectFit: "contain",
                                                                }}
                                                            />
                                                            <div>
                                                                <h6 className="fw-bold mb-1">{title}</h6>
                                                                <p className="text-muted mb-1">{category}</p>
                                                                <p className="text-muted mb-0">Qty: {quantity}</p>
                                                            </div>
                                                        </div>
                                                        <h5 className="fw-bold mb-0">Rs. {price}</h5>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
};
