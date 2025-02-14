import { Layout } from "../../layout/Layout";
const products = [
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: 'Rs. 61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
];

export const UserDashboard = () => {
    return (
        <Layout>
            <div className="container my-5">
                <div className="card border border-success-subtle shadow-sm mb-4" style={{backgroundColor:"#e8fae3"}}>
                    <div className="card-body text-center">
                        <img
                            src="/images/user.png"
                            alt="User"
                            className="mb-3"
                            width="80"
                        />
                        <h5 className="card-title"><strong>Name:</strong> Salina Bajracharya</h5>
                        <p className="card-text"><strong>Email:</strong> salina.bajracharya@gmail.com</p>
                    </div>
                </div>

                <h2 className="text-center fw-bold">Order Details</h2>

                <div className="card border border-success-subtle shadow-sm mt-4">
                    <div className="row g-0">
                        <div className="col-md-3 border-end border-success-subtle p-4" style={{backgroundColor:"#e8fae3"}}>
                            <div className="mb-3">
                                <h6 className="fw-semibold">Order ID</h6>
                                <p className="mb-0">#74557994327</p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-semibold">Date</h6>
                                <p className="mb-0">4 March, 2023</p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-semibold">Total Amount</h6>
                                <p className="mb-0">Rs. 84,499</p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-semibold">Order Status</h6>
                                <p className=" fw-bold" style={{color:"#67a357"}} >Confirmed</p>
                            </div>
                        </div>
                        <div className="col-md-9 p-4">
                            <ul className="list-group list-group-flush">
                                {products.map((product) => (
                                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="img-thumbnail me-3"
                                                style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                            />
                                            <div>
                                                <h6 className="fw-bold mb-1">{product.name}</h6>
                                                <p className="text-muted mb-1">{product.color}</p>
                                                <p className="text-muted mb-0">x {product.quantity}</p>
                                            </div>
                                        </div>
                                        <h5 className="fw-bold mb-0">{product.price}</h5>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

