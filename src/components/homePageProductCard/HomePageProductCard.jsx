import React from "react";

const productData = [
  {
    id: 1,
    image:
      "/images/sale/shoes.jpg",
    title: "Nike Air Force 1 High",
    desc: "Step up your style with the Nike Air Force 1 High in a sleek white and red colorway. Featuring a premium leather upper, high-top design for added support, and a cushioned midsole for all-day comfort, this classic sneaker is perfect for both casual wear and street fashion.",
    price: 5500,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 2,
    image:
      "/images/sale/dress.jpg",
    title: "Red Long-Sleeve Dress",
    desc: "Make a statement with this stunning red long-sleeve dress, designed for elegance and sophistication. Featuring a flowing silhouette, soft fabric, and a flattering fit, this dress is perfect for special occasions, evening events, or formal gatherings.",
    price: 1800,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 3,
    image:
      "/images/sale/loops.jpg",
    title: "Lasso Hoops",
    desc: "Crafted for elegance and durability, this jewelry piece enhances your style effortlessly.. Positive impact.",
    price: 1000,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 4,
    image:
      "/images/sale/clear.jpg",
    title: "Minimalist Clear Eyeglasses",
    desc: "These stylish clear eyeglasses offer a sleek and modern design, perfect for a sophisticated and effortless look. Featuring a lightweight frame and transparent lenses, they complement any outfit while providing all-day comfort.",
    price: 1299,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 1,
    image:
     "/images/sale/lipstick.jpg",
    title: "MAC Matte Lipstick",
    desc: "The MAC Ruby Woo Matte Lipstick is a timeless classic, known for its bold and vibrant red shade that suits all skin tones. With its long-lasting, non-drying matte formula, it delivers a rich, velvety finish that stays put for hours. ",
    price: 1750,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 2,
    image:
  "/images/sale/nails.jpg",
    title: "Luxury Press-On Nails",
    desc: "Elevate your manicure game with these premium press-on nails, designed for a flawless, salon-quality look in minutes. Featuring a variety of stylish shapes, lengths, and finishes, these nails offer a hassle-free application with long-lasting wear.",
    price: 699,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 3,
    image:
      "/images/sale/shirt.jpg",
    title: "Classic Blue Dress Shirt",
    desc: "Upgrade your wardrobe with this timeless blue and white checkered dress shirt, perfect for both casual and formal settings. Crafted from breathable, high-quality fabric, it offers a comfortable fit with a sharp, polished look.",
    price: 1300,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 4,
    image:
      "/images/sale/bag.jpg",
    title: "Pink Crossbody Bag",
    desc: "Add a touch of sophistication to your outfit with this chic pink leather crossbody bag. Designed for both style and functionality, it features a sleek silhouette, durable leather construction, and an adjustable strap for versatile wear.",
    price: 2500,
    trendingProductName: "Featured",
    quantity: 1,
  },
];

export const HomePageProductCard = () => {
  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="text-center my-4">
        <h1 className="fw-semibold fs-4">Flash Sale</h1>
      </div>
      {/* main  */}
      <section className="text-secondary">
        <div className="container px-5 py-5 mx-auto">
          <div className="d-flex flex-wrap mx-n2">
            {productData.map((item, index) => {
              const { image, title, price } = item;
              return (
                <div key={index} className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 p-2">
                  <div className="border border-secondary rounded overflow-hidden shadow-sm cursor-pointer">
                    <img
                      className="img-fluid"
                      src={image}
                      alt="blog"
                      style={{
                        height: "320px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="p-3">
                      <h2 className="text-muted small mb-1"></h2>
                      <h1 className="h5 fw-medium text-dark mb-2 fs-6 fs-md-6 fs-lg-5 fs-xl-4 title">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="h5 fw-medium text-dark mb-3 fs-6 fs-md-5 fs-lg-4" title>
                        Rs.{price}
                      </h1>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-success w-100 fw-bold">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </section>
    </div>
  );
};
