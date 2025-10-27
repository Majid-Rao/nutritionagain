import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSlider = ({ category = "Low AMH", limit = 15 }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}api/gettestimonials?category=${encodeURIComponent(
            category
          )}&limit=${limit}`
        );
        // Remove duplicates (by _id)
        const unique = Array.from(
          new Map(res.data.map((t) => [t._id, t])).values()
        );
        setTestimonials(unique);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [category, limit, refresh]);

  // Listen for new testimonial event (from AddTestimonial)
  useEffect(() => {
    const handleAdded = () => setRefresh((prev) => !prev);
    window.addEventListener("testimonialAdded", handleAdded);
    return () => window.removeEventListener("testimonialAdded", handleAdded);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerPadding: "20px" },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerPadding: "0px" },
      },
    ],
  };

  return (
    <section className="bg-white py-12 px-4 dark:bg-gray-900 dark:text-white duration-200">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          {category}
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading testimonials...
        </p>
      ) : testimonials.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No testimonials found for this category.
        </p>
      ) : (
        <div className="slider-container max-w-6xl mx-auto">
          <Slider {...settings}>
            {testimonials.map((item, index) => (
              <div key={item._id || index} className="px-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-52 h-72 overflow-hidden rounded-xl mb-5 shadow-md">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_API.replace(/\/$/, "")}${item.imageUrl}`}
                      alt={item.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default TestimonialSlider;
