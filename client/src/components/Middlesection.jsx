import React from "react";
import img from "../assets/xyz.jpg"
import i from "../assets/i.webp"
import { useNavigate } from "react-router-dom";
const Middlesection = () => {
  const Navigate = useNavigate();
  return (
    <section className="bg-white py-16 px-5 lg:px-20 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 ">
        {/* Left: Text Content */}
        <div className="lg:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:text-left text-center dark:text-white">About Dr Aisha Lakhwani</h2>
          <p className="text-ternary font-semibold mb-3 sm:text-left text-center">
            Fertility Expert
          </p>
           <p className="text-gray-600 mb-4 font-semibold sm:text-left text-center dark:text-white">Hi, I’m Dr. Aisha Lakhwani.</p>
          <p className="text-gray-600 mb-4 sm:text-left text-center dark:text-white">
           
           I am a fertility specialist with advanced training from Harvard University (USA) in Lifestyle Medicine, and I started my journey in healthcare back in 2017.

          </p>
          <p className="text-gray-600 mb-6 sm:text-left text-center dark:text-white">
           Today, I’m proud to run a thriving fertility and wellness clinic, supported by a dedicated team of 5 professionals who share my passion for transforming lives.
          </p>
          <div className="flex justify-center items-center sm:justify-start">
          <button className="bg-ternary  text-white px-6 py-2 rounded hover:bg-pink-300 transition" onClick={()=>Navigate('/about')}>
            Read More
          </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2">
          <img
            src={i}
            alt="Our Farm"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Middlesection;
