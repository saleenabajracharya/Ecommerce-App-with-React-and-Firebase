import React from 'react'
import { Layout } from '../layout/Layout'
import { useLocation } from "react-router-dom";
export const ProductInfo = () => {
    const location = useLocation();
  const product = location.state;

  if (!product) {
    return <h2 className="text-center">No Product Found</h2>;
  }
  return (
    <div>
        <Layout>
        <div className="container py-5">
      <div className="row">
        <div className="col-md-6 my-4">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid border rounded"  style={{
                height: "450px",  
                width: "100%",
                objectFit: "contain",


               }}
          />
        </div>
        <div className="col-md-6 my-4">
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-muted">{product.desc}</p>
          <h3 className="fw-semibold">Rs. {product.price}</h3>
          <button className="btn btn-success mt-3">Buy Now</button>
        </div>
      </div>
    </div>
        </Layout>
    </div>
  )
}
