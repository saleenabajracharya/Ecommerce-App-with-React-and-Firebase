
import { FaRegTrashAlt } from "react-icons/fa";
import { Layout } from "../../layout/Layout";

const products = [
  {
      id: 1,
      name: 'Nike Air Force 1 07 LV8',
      href: '#',
      price: 'Rs. 47,199',
      originalPrice: 'Rs. 48,900',
      discount: '5% Off',
      color: 'Orange',
      size: '8 UK',
      imageSrc:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
  },
  {
      id: 2,
      name: 'Nike Blazer Low 77 SE',
      href: '#',
      price: 'Rs. 1,549',
      originalPrice: 'Rs. 2,499',
      discount: '38% off',
      color: 'White',
      leadTime: '3-4 weeks',
      size: '8 UK',
      imageSrc:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
  },
  {
      id: 3,
      name: 'Nike Air Max 90',
      href: '#',
      price: 'Rs. 2219 ',
      originalPrice: 'Rs. 999',
      discount: '78% off',
      color: 'Black',
      imageSrc:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
  },
]

export const CartPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mx-auto py-5">
          <h1 className="h3 fw-bold text-dark">Shopping Cart</h1>
          <form className="mt-4 row g-3">
            <section className="col-lg-8 bg-white rounded p-3">
              <h2 className="sr-only">Cart Items</h2>
              <ul className="list-group">
                {products.map((product) => (
                  <div key={product.id}>
                    <li className="list-group-item d-flex align-items-center py-3">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="img-thumbnail"
                          style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <h5 className="mb-1">
                            <a href={product.href} className="text-dark text-decoration-none">
                              {product.name}
                            </a>
                          </h5>
                        </div>
                        <p className="mb-1 text-muted">{product.color}</p>
                        {product.size && <p className="mb-1 text-muted">Size: {product.size}</p>}
                        <div className="d-flex align-items-center">
                          <p className="text-decoration-line-through text-muted me-2">
                            {product.originalPrice}
                          </p>
                          <p className="fw-bold me-2">{product.price}</p>
                          <p className="text-success fw-bold">{product.discount}</p>
                        </div>
                      </div>
                    </li>
                    <div className="d-flex align-items-center py-2">
                      <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-outline-secondary btn-sm">
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center mx-2"
                          style={{ width: "50px" }}
                          defaultValue={1}
                        />
                        <button type="button" className="btn btn-outline-secondary btn-sm">
                          +
                        </button>
                      </div>
                      <button type="button" className="btn btn-link text-danger text-decoration-none ms-3 ">
                        <FaRegTrashAlt  size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            </section>

         
            <section className="col-lg-4 bg-white rounded p-3">
              <h2 className="border-bottom pb-2 mb-3 h5">Order Summary</h2>
              <dl className="row">
                <dt className="col-8">Price (3 items)</dt>
                <dd className="col-4 text-end fw-bold">Rs. 52,398</dd>

                <dt className="col-8">Discount</dt>
                <dd className="col-4 text-end text-success fw-bold">- Rs. 3,431</dd>

                <dt className="col-8">Delivery Charges</dt>
                <dd className="col-4 text-end text-success fw-bold">Free</dd>

                <dt className="col-8 fw-bold border-top pt-3">Total Amount</dt>
                <dd className="col-4 text-end fw-bold border-top pt-3">Rs. 48,967</dd>
              </dl>

              <div className="d-flex justify-content-end">
                <button className="btn btn-primary py-2 px-4">Proceed to Checkout</button>
              </div>

            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};


