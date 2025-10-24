import React, { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition duration-300 ease-in-out flex flex-col h-full">
      <img
        className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={`${import.meta.env.VITE_BACKEND_API}uploads/${blog.image}`}
        alt={blog.heading}
      />
      
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <h3 className="sm:text-xl text-lg font-semibold text-gray-900 group-hover:text-primary transition duration-300">
          {blog.heading}
        </h3>

        
        <p className="text-gray-700 text-base flex-1">
          {blog.description}
        </p>

        
        <div className="flex items-center justify-between mt-auto">
          <Link
            to={`/blog/${blog._id}`}
            className="inline-block bg-ternary text-black text-sm font-semibold py-2 px-4 rounded-lg hover:bg-primary transition duration-300 ease-in-out"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getblog/`)
        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false) 
      }
    }

    fetchBlogs()
  }, [])

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

      <div className="bg-ternary w-40 sm:w-56 px-3 mt-8 rounded-r-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out animate-slide-in-right">
        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-8">Latest Blogs</h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? ( 
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2, 
                },
              },
            }}
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Blogs
