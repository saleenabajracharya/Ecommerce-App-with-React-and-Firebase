import React from 'react';
const category = [
    { image: "/images/icons/consumption.png", name: 'fashion' },
    { image: "/images/icons/shirt.png", name: 'shirt' },
    { image: "/images/icons/shop.png", name: 'jacket' },
    { image: "/images/icons/smartphone.png", name: 'mobile' },
    { image: "/images/icons/laptop.png", name: 'laptop' },
    { image: "/images/icons/sneakers.png", name: 'shoes' },
    { image: "/images/icons/skincare.png", name: 'skincare' },
    { image: "/images/icons/book.png", name: 'books' }
];

export const Category = () => {
    return (
        <div className="container mt-3">
            <div className="row justify-content-center justify-content-xl-between">
                {category.map((item, index) => (
                    <div key={index} className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-auto text-center mb-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center mb-2 category shadow"
                             style={{ width: "85px", height: "85px", transition: "0.3s" }}>
                            <img src={item.image} alt={item.name} className="img-fluid rounded-circle" 
                                 style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                        </div>
                        <h6 className="fw-medium text-capitalize text-start ps-3">{item.name}</h6>
                    </div>
                ))}
            </div>
        </div>
    );
}


