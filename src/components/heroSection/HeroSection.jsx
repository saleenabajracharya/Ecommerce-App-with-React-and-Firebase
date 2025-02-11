import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
    <button className="slick-prev custom-arrow" onClick={onClick}>
      ❮
    </button>
  );
  

  const NextArrow = ({ onClick }) => (
    <button className="slick-next custom-arrow" onClick={onClick}>
      ❯
    </button>
  );
const images = [
  "/images/sunglasses.jpg",
  "/images/powder.jpg",
  "/images/clothes.jpg",
  "/images/saree.jpg",
"/images/guasha.jpg",

  "/images/sari.jpg",
  "/images/earbuds.jpg",
  "/images/makeup.jpg",
];

export const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />, 
    nextArrow: <NextArrow />,
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide pt-2 mt-1">
            <img src={img} alt={`Slide ${index}`} style={{ width: "100%", height: "500px", objectFit: "cover" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
