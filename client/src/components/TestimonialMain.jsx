import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import TestimonialSlider from "./TestimonialSlider";

const TestimonialMain = () => {
  return (
    <>
      <Navbar />
      <div className="bg-blue-50 dark:bg-gray-800 duration-200">
        {/* Hero Section */}
        <section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative dark:bg-gray-700 dark:text-white duration-200">
          <h1 className="sm:text-5xl text-3xl font-semibold mb-4">
            Our Testimonials
          </h1>
          <h2 className="sm:text-2xl text-lg font-medium mb-4">
            Fertility & Low AMH Expert
          </h2>
        </section>

        {/* Reviews Heading */}
        <div className="flex justify-center bg-gray-200 pt-10 pb-4">
          <h2 className="sm:text-3xl md:text-4xl text-xl font-bold text-gray-800 dark:text-white">
            Reviews From Our Happy Clients
          </h2>
        </div>

        {/* Dynamic Sliders */}
        <section>
          <TestimonialSlider category="Low AMH" />
          <TestimonialSlider category="Positive Pregnancies With Other Fertility Issues" />
          <TestimonialSlider category="Reversals" />
          <TestimonialSlider category="Male Fertility" />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TestimonialMain;
