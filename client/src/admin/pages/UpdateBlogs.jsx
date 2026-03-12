import React, { useState, useEffect } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const UpdateBlogs = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 
  useEffect(() => {
    // Fetch the current blog details
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/getblog/${id}`);
        const blog = response.data;
        setName(blog.heading);
        setDescription(blog.description);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    fetchBlogData();
  }, [id]);

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle video file change (optional)
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Handle form submission for updating the blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the FormData to send the update request
    const formData = new FormData();
    formData.append('heading', name); // Append heading
    formData.append('description', description); // Append description
    if (image) formData.append('image', image); // Append image file (if any)
    if (video) formData.append('video', video); // Append video file (if any)

    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_API}/api/updateblog/${id}`, formData);

      if (response.status === 200) {
        console.log('Blog updated successfully:', response.data);
        // Navigate back to the blog list page or show a success message
        navigate('/viewblogs'); // This will redirect to the blogs list page
      } else {
        console.error('Error updating blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

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
          <Header title='Update Blog' />
          <main className='max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8'>
            <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500 mb-6">Update Blog</h1>
              <form onSubmit={handleSubmit} className="space-y-1">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-md sm:text-lg font-medium">Heading</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-md sm:text-lg font-medium">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-md sm:text-lg font-medium">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Video Upload (Optional) */}
                <div>
                  <label htmlFor="video" className="block text-md sm:text-lg font-medium">Upload Video (Optional)</label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={handleVideoChange}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 mt-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UpdateBlogs;
