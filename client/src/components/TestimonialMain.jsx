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
import t6 from "../assets/t6.webp";
import t7 from "../assets/t7.webp";
import t8 from "../assets/t8.webp";
import t9 from "../assets/t9.webp";
import t10 from "../assets/t10.webp";
import t11 from "../assets/t11.webp";
import t12 from "../assets/t12.webp";
import t13 from "../assets/t13.webp";
import t14 from "../assets/t14.webp";
import t15 from "../assets/t15.webp";
import t16 from "../assets/t16.webp";
import t17 from "../assets/t17.webp";
import t18 from "../assets/t18.webp";
import t19 from "../assets/t19.webp";
import t20 from "../assets/t20.webp";
import t21 from "../assets/t21.webp";
import t22 from "../assets/t22.webp";
import t23 from "../assets/t23.webp";
import t24 from "../assets/t24.webp";
import t25 from "../assets/t25.webp";
import t26 from "../assets/t26.webp";
import t27 from "../assets/t27.webp";
import t30 from "../assets/t30.webp";




const testimonials = [
  {
    img: t12,
  },
  {

    img: t13,
  },
  {
    img: t14,
  },
  {
    
    img: t15,
  },
  {
    img: t16,  
  },
  {
    img: t17,  
  },
];
const testimonialstwo = [
  {
    img: t1,
  },
  {

    img: t5,
  },
  {
    img: t3,
  },
  {
    
    img: t6,
  },
  {
    img: t7,  
  },
  {
    img: t8,  
  },
  {
    img: t9,  
  },
  {
    img: t10,  
  },
  {
    img: t11,  
  },
];
const testimonialsthree = [
  {
    img: t6,
  },
  {

    img: t18,
  },
  {
    img: t19,
  },
  {
    img: t20,
  },
  {
    img: t21,  
  },
   {
    img: t22,  
  }, 
  {
    img: t23,
  },
];
const testimonialsfour = [
  {
    img: t24,
  },
  {

    img: t25,
  },
  {
    img: t26,
  },
  {
    
    img: t27,
  },
  {
    img: t30,
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
  const settingstwo = {
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
  const settingsthree = {
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
   const settingsfour = {
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
<div className="flex justify-center bg-gray-200  pt-10">
   <h2 className=" sm:text-3xl md:text-4xl text-xl font-bold text-center dark:text-white text-gray-800 mb-10">
       Reviews From Our Happy Clients
      </h2></div>
    <section className="bg-white py-16 px-4 dark:bg-gray-900 dark:text-white duration-200">
     
      <div className="flex justify-center ">
   
      <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-center dark:text-white text-gray-800 mb-10">
        Low AMH
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
      </section>
      <section className="bg-ternary py-14 px-4 dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex justify-center  p-10 ">
   <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-center dark:text-white text-gray-800 mb-10">
         Positive Pregnancies With Other Fertility Issues
      </h2></div>
      <div className="slider-container max-w-8xl mx-auto sm:pt-5 pb-10 bg-ternary">
        <Slider {...settingstwo}>
          {testimonialstwo.map((item, index) => (
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
    <section className="bg-white py-14 px-4 dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex justify-center  p-10 ">
   <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-center dark:text-white text-gray-800 mb-10">
        Reversals 
      </h2></div>
      <div className="slider-container max-w-8xl mx-auto sm:pt-5 pb-10 ">
        <Slider {...settingsthree}>
          {testimonialsthree.map((item, index) => (
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
    <section className="bg-ternary py-14 px-4 dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex justify-center  p-10 ">
   <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-center dark:text-white text-gray-800 mb-10">
       Male Fertility
      </h2></div>
      <div className="slider-container max-w-8xl mx-auto sm:pt-5 pb-10 bg-ternary">
        <Slider {...settingsfour}>
          {testimonialsfour.map((item, index) => (
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
