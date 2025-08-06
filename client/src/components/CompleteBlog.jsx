import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const CompleteBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getblog/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Content */}
          <div className="lg:col-span-2">
            <img
              className="w-full h-[150px] md:h-[400px] sm:h-[250px] rounded-md"
              src={`${import.meta.env.VITE_BACKEND_API}uploads/${blog.image}`}
              alt={blog.heading}
            />
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mt-6 mb-4">{blog.heading}</h1>
            <div className="prose prose-lg max-w-none text-gray-800">
              <p>{blog.content}</p>
            </div>

            {blog.video && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Watch the Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={blog.video}
                    title={blog.heading}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-8 h-fit-screen">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscribe to Newsletter</h2>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h2>
              <ul className="space-y-4">
                <li className="border-b pb-2 text-gray-700 hover:text-blue-600 cursor-pointer">React 19 Beta Released</li>
                <li className="border-b pb-2 text-gray-700 hover:text-blue-600 cursor-pointer">Tailwind CSS v4 Roadmap</li>
                <li className="border-b pb-2 text-gray-700 hover:text-blue-600 cursor-pointer">Top 10 JS Frameworks in 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CompleteBlog;
