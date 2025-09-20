import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import one from "../assets/1.webp";
import two from "../assets/2.webp";
import three from "../assets/3.webp";


const testimonials = [
  {
    img: one,
  },
  {

    img: two,
  },
  {
    img: three,
  },

];

const TestimonialMain = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <>
   
    <div className="bg-blue-50">

    <section className="bg-white py-16 px-4 dark:bg-gray-900 dark:text-white duration-200">
      
      <div className="slider-container max-w-7xl mx-auto sm:pt-5 pb-10">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 mb-2">
              <div className=" p-6  dark:bg-gray-900 dark:text-white duration-200 rounded-lg  text-center h-full">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full sm:h-[450px] h-[110px] mx-auto mb-5 rounded-lg object-cover"
                />
               
              </div>
            </div>
            
          ))}
        </Slider>
      </div>
      </section>
    </div>
    </>
  );
};

export default TestimonialMain;
