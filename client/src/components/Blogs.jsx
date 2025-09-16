import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
  
    <div className=" bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={`${import.meta.env.VITE_BACKEND_API}uploads/${blog.image}`} // Image path assuming it's in uploads folder
        alt={blog.heading}
      />
      <div className="p-6 space-y-4">
        <h3 className="sm:text-xl text-lg font-semibold text-gray-900 group-hover:text-primary transition duration-300">{blog.heading}</h3>
        <p className="text-gray-700 text-base">{blog.description}</p>
        <div className="flex items-center justify-between">
          <Link
            to={`/blog/${blog._id}`}
            className="inline-block bg-ternary text-black text-sm font-semibold py-2 px-4 rounded-lg hover:bg-primary transition duration-300 ease-in-out"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from the API
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getblog/`);
        const data = await response.json();
        setBlogs(data); // Store fetched blogs in the state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs(); // Fetch blogs when component mounts
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-secondary text-black text-center py-20 relative">
        <h1 className="text-2xl sm:text-5xl font-semibold mb-4 animate-slide-in-up">Our Blogs</h1>
        <p className="text-lg max-w-3xl mx-auto mb-8 animate-slide-in-down">
          Stay updated with the latest insights and articles from our expert team. We bring you fresh content to keep you informed and inspired.
        </p>
      </section>

      <div className='bg-ternary w-40 sm:w-56 px-3 mt-8 rounded-r-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out animate-slide-in-right'>
        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-8 ">Latest Blogs</h2>
       </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blogs;
