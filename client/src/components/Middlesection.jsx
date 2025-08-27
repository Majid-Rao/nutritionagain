import React from "react";
import img from "../assets/xyz.jpg"

const Middlesection = () => {
  return (
    <section className="bg-white py-16 px-5 lg:px-20 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 ">
        {/* Left: Text Content */}
        <div className="lg:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:text-left text-center dark:text-white">Your Diet Matter's</h2>
          <p className="text-ternary font-semibold mb-3 sm:text-left text-center">
            Fresh. Local. Organic.
          </p>
          <p className="text-gray-600 mb-4 sm:text-left text-center dark:text-white">
            At NatureHarvest, we believe in bringing you the freshest organic
            produce directly from our partnered farmers. Our mission is to
            promote healthy living, sustainable farming, and fair trade for
            local communities.
          </p>
          <p className="text-gray-600 mb-6 sm:text-left text-center dark:text-white">
            We carefully select farms that follow natural practices — no
            chemicals, no shortcuts. Just pure, wholesome food delivered
            straight to your doorstep.
          </p>
          <div className="flex justify-center items-center sm:justify-start">
          <button className="bg-ternary  text-white px-6 py-2 rounded hover:bg-pink-300 transition">
            Learn More
          </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2">
          <img
            src={img}
            alt="Our Farm"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Middlesection;
