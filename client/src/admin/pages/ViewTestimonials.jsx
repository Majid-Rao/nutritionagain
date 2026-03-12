import React, { useEffect, useState,useMemo } from "react";
import axios from "axios";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import toast from "react-hot-toast";
const ViewTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("All");
  // ✅ Backend URL ko memoize karein
  const backend = useMemo(() => {
    const url = import.meta.env.VITE_BACKEND_API;
    if (!url) {
      console.error('Backend URL not configured');
      return '';
    }
    return url.replace(/\/$/, "");
  }, []);

  // ✅ Image path properly construct karne ka function
  const getImagePath = (imageUrl) => {
    if (!imageUrl) return '/placeholder.jpg';
    if (!backend) return '/placeholder.jpg';
    
    try {
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }

      const cleanPath = imageUrl
        .replace(/^\/+/, '')
        .replace(/^uploads\/testimonials\//, '');

      const fullPath = `${backend}/api/image/${cleanPath}`;
      
      return fullPath;
    } catch (error) {
      console.error('Image path construction error:', error);
      return '/placeholder.jpg';
    }
  };

  // ✅ Image component with error handling
  const TestimonialImage = ({ item }) => {
    const [imgState, setImgState] = useState({
      loading: true,
      error: false,
      src: null
    });

    useEffect(() => {
      let mounted = true;
      
      const loadImage = async () => {
        if (!mounted) return;
        
        try {
          const src = getImagePath(item.imageUrl);
          
          const img = new Image();
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });

          if (mounted) {
            setImgState({
              loading: false,
              error: false,
              src
            });
          }
        } catch (error) {
          if (mounted) {
            setImgState({
              loading: false,
              error: true,
              src: null
            });
          }
        }
      };

      loadImage();

      return () => {
        mounted = false;
      };
    }, [item.imageUrl]);

    if (imgState.error) {
      return (
        <div className="w-full h-64 bg-gray-600 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      );
    }

    return (
      <div className="relative w-full h-64">
        {imgState.loading && (
          <div className="absolute inset-0 bg-gray-600 animate-pulse" />
        )}
        {imgState.src && (
          <img
            src={imgState.src}
            alt={item.category}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imgState.loading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
      </div>
    );
  };
 // ✅ Fetch testimonials (filtered)
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const url =
        category === "All"
          ? `${backend}/api/gettestimonials`
          : `${backend}/api/gettestimonials?category=${encodeURIComponent(
              category
            )}`;
      const res = await axios.get(url);
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete testimonial
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backend}/api/deletetestimonial/${id}`);
      setMessage("🗑️ Testimonial deleted successfully!");
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success("Testimonial deleted successfully");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      setMessage("❌ Failed to delete testimonial");
      toast.error("Failed to delete testimonial");
      setTimeout(() => setMessage(""), 2500);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [category]);

   return (
    <>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        {/* Background */}
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
          <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
        <Sidebar />
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='View Testimonials' />
          <main className='max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8'>
            <div className="max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-semibold mb-6 text-center text-white">
                Manage Testimonials
              </h2>

              {/* ✅ Filter + Status Message */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>All</option>
                  <option>Low AMH</option>
                  <option>Positive Pregnancies With Other Fertility Issues</option>
                  <option>Reversals</option>
                  <option>Male Fertility</option>
                  <option>Miracles Through Our Program</option>
                  <option>Miracles With Azoospermia & Ovarian Failure</option>
                </select>

                {message && (
                  <p className="text-sm text-green-400 font-medium text-center sm:text-right">
                    {message}
                  </p>
                )}
              </div>

              {/* ✅ Loading / Empty */}
              {loading ? (
                <p className="text-center text-gray-400">Loading testimonials...</p>
              ) : testimonials.length === 0 ? (
                <p className="text-center text-gray-400">
                  No testimonials found for this category.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-600 p-2"
                    >
                      <TestimonialImage item={item} />
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold mb-3 text-white">
                          {item.category}
                        </h3>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ViewTestimonials;
