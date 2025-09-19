import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import t1 from "../assets/t1.webp";
import t2 from "../assets/t2.webp";
import t3 from "../assets/t3.webp";
import t4 from "../assets/t4.webp";
import t5 from "../assets/t5.webp";

const testimonials = [
  {
    img: t1,
  },
  {

    img: t2,
  },
  {
    img: t3,
  },
  {
    
    img: t4,
  },
  {
    img: t5,  
  },
];

const TestimonialMain = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
    <Navbar />
    <div className="bg-blue-50">
     {/* Hero Section */}
<section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="sm:text-5xl text-3xl font-semibold mb-4 animate-slide-in-up">Our Testimonials</h1>
  <h2 className="sm:text-2xl text-lg font-semibold mb-4 animate-slide-in-up">Fertility & Low AMH Expert</h2>
</section>
    <section className="bg-white py-16 px-4 dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex justify-center ">
   
      <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-center dark:text-white text-gray-800 mb-10">
       Some Reviews From Our Happy Clients
      </h2></div>
      <div className="slider-container max-w-7xl mx-auto sm:pt-5 pb-10">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 mb-2">
              <div className=" p-6 bg-gray-200  dark:bg-gray-900 dark:text-white duration-200 rounded-lg  text-center h-full">
                <img
                  src={item.img}
                  alt={item.name}
                  className=" w-56 h-[300px] mx-auto mb-5 rounded-lg object-cover"
                />
               
              </div>
            </div>
            
          ))}
        </Slider>
      </div>
      <div className="slider-container max-w-7xl mx-auto sm:pt-5 pb-10">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 mb-2">
              <div className=" p-6 bg-gray-200  dark:bg-gray-900 dark:text-white duration-200 rounded-lg  text-center h-full">
                <img
                  src={item.img}
                  alt={item.name}
                  className=" w-56 h-[300px] mx-auto mb-5 rounded-lg object-cover"
                />
               
              </div>
            </div>
            
          ))}
        </Slider>
      </div>
    </section>
    </div>
    <Footer />
    </>
  );
};

export default TestimonialMain;
