import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const UpdateProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_API.replace(/\/$/, "");

  const [form, setForm] = useState({
    heading: "",
    description: "",
    content: "",
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Helper function to get proper image URL
  const getImagePath = (imageName) => {
    if (!imageName) return null;
    
    try {
      // If it's already a complete URL, return it as-is
      if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
        return imageName;
      }

      // Remove any leading slashes or "uploads/programs/" prefix
      const cleanPath = imageName
        .replace(/^\/+/, '')
        .replace(/^uploads\/programs\//, '');

      // Use the /api/image/ endpoint
      return `${backend}/api/image/${cleanPath}`;
    } catch (error) {
      console.error('Image path error:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`${backend}/api/getprogram/${id}`);
        const p = res.data;
        setForm({
          heading: p.heading || "",
          description: p.description || "",
          content: p.content || "",
        });
        
        if (p.image) {
          const imageUrl = getImagePath(p.image);
          console.log('Current image URL:', imageUrl);
          setCurrentImageUrl(imageUrl);
        }
        
        if (p.video) {
          const videoUrl = getImagePath(p.video); // Videos use same endpoint
          setCurrentVideoUrl(videoUrl);
        }
      } catch (err) {
        console.error("Fetch program error:", err);
      }
    };
    fetchProgram();
  }, [id, backend]);

  // Image loading handler
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.error('Failed to load image:', currentImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("heading", form.heading);
      formData.append("description", form.description);
      formData.append("content", form.content);
      if (imageFile) formData.append("image", imageFile);
      if (videoFile) formData.append("video", videoFile);

      await axios.put(`${backend}/api/updateprogram/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Program updated successfully!");
      window.dispatchEvent(new Event("programAdded"));
      setTimeout(() => {
        setMessage("");
        navigate("/viewprograms");
      }, 1200);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update program");
      setTimeout(() => setMessage(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  // Quill configuration
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
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Update Program" />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Program</h2>

            {message && (
              <p
                className={`text-sm mb-4 ${
                  message.includes("✅")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  value={form.heading}
                  onChange={(e) =>
                    setForm({ ...form, heading: e.target.value })
                  }
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-700 text-white outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Short description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-700 text-white outline-none"
                />
              </div>

              {/* Content - ReactQuill */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Detailed Content
                </label>
                <div className="bg-gray-500 rounded-md border border-gray-600">
                  <ReactQuill
                    theme="snow"
                    value={form.content}
                    onChange={(val) => setForm({ ...form, content: val })}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Replace Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                    setImageLoading(true);
                    setImageError(false);
                  }}
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-700 text-white"
                />
                {currentImageUrl && !imageFile && (
                  <div className="relative w-48 h-36 mt-3">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gray-700 animate-pulse rounded" />
                    )}
                    {imageError ? (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded border border-gray-600">
                        <span className="text-gray-400 text-sm">Image not available</span>
                      </div>
                    ) : (
                      <img
                        src={currentImageUrl}
                        alt="current"
                        className="w-full h-full object-cover rounded border border-gray-600"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    )}
                  </div>
                )}
                {imageFile && (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="new"
                    className="w-48 h-36 object-cover rounded mt-3 border border-gray-600"
                  />
                )}
              </div>

              {/* Video upload */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Replace Video (optional)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-700 text-white"
                />
                {currentVideoUrl && !videoFile && (
                  <video
                    controls
                    src={currentVideoUrl}
                    className="w-full max-h-64 mt-2 rounded border border-gray-600"
                  />
                )}
                {videoFile && (
                  <video
                    controls
                    src={URL.createObjectURL(videoFile)}
                    className="w-full max-h-64 mt-2 rounded border border-gray-600"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Program"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/viewprograms")}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
                >
                  Cancel
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

export default UpdateProgram;