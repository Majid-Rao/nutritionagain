import React, { useState } from "react";
import ReactQuill from "react-quill-new"; 
import "react-quill-new/dist/quill.snow.css";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import toast from "react-hot-toast";

const AddPrograms = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !content) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_BACKEND_API}api/addprogram`;
      
      // Validate API URL
      if (!apiUrl) {
        toast.error("API configuration missing");
        return;
      }

      console.log("Submitting to API:", apiUrl);

      const formData = new FormData();
      formData.append("heading", name);
      formData.append("description", description);
      formData.append("content", content);
      
      // Add file validation before append
      if (image) {
        if (!validateFile(image, 'image')) return;
        formData.append("image", image);
      }
      
      if (video) {
        if (!validateFile(video, 'video')) return;
        formData.append("video", video);
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.status === 500) {
        throw new Error("Server error - please try again later");
      }

      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.status}`);
      }

      toast.success("Program added successfully!");
      resetForm();
      window.dispatchEvent(new Event("programAdded"));

    } catch (err) {
      console.error("Submission failed:", {
        error: err.message,
        status: err.status,
        apiUrl: import.meta.env.VITE_BACKEND_API
      });
      
      toast.error(
        err.message === "Failed to fetch" 
          ? "Cannot connect to server" 
          : err.message || "Error adding program"
      );
      
      setMessage("❌ Upload failed - please try again");
    } finally {
      setLoading(false);
    }
  };

  // Add file validation helper
  const validateFile = (file, type) => {
    const maxSize = type === 'image' ? 5242880 : 104857600; // 5MB for images, 100MB for videos
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm'];

    if (file.size > maxSize) {
      toast.error(`${type === 'image' ? 'Image' : 'Video'} size too large`);
      return false;
    }

    const validTypes = type === 'image' ? validImageTypes : validVideoTypes;
    if (!validTypes.includes(file.type)) {
      toast.error(`Invalid ${type} format`);
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setContent("");
    setImage(null);
    setVideo(null);
    setMessage("✅ Program added successfully!");
    setTimeout(() => setMessage(""), 2500);
  };

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) {
        toast.error("Image size should be less than 5MB");
        e.target.value = '';
        return;
      }
      setImage(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 104857600) {
        toast.error("Video size should be less than 100MB");
        e.target.value = '';
        return;
      }
      setVideo(file);
    }
  };
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

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
          <Header title='Add Package' />
          <main className="flex-1 p-6 flex justify-center items-start">
            <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-700 mt-10">
              <h2 className="text-3xl font-semibold text-center mb-6 text-white">
                Add New Program
              </h2>

              {message && (
                <div
                  className={`text-center mb-4 font-medium ${
                    message.includes("✅") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Program Title */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Title
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Program Title"
                    className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Short Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description about the program"
                    className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Detailed Content with Rich Editor */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Detailed Content
                  </label>
                  <div className="bg-gray-400 rounded-md border border-gray-600">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-gray-200 cursor-pointer focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-gray-200 cursor-pointer focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Preview */}
                {image && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg border border-gray-600 shadow-md"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  {loading ? "Uploading..." : "Add Program"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddPrograms;
