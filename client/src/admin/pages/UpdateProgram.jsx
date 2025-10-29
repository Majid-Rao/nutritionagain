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
          setCurrentImageUrl(
            p.image.startsWith("/uploads")
              ? `${backend}${p.image}`
              : `${backend}/uploads/${p.image}`
          );
        }
        if (p.video) {
          setCurrentVideoUrl(
            p.video.startsWith("/uploads")
              ? `${backend}${p.video}`
              : `${backend}/uploads/${p.video}`
          );
        }
      } catch (err) {
        console.error("Fetch program error:", err);
      }
    };
    fetchProgram();
  }, [id]);

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
          <Header title="Update Package" />
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
                <div className="bg-gray-700 rounded-md border border-gray-600 text-black">
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
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-700 text-white"
                />
                {currentImageUrl && !imageFile && (
                  <img
                    src={currentImageUrl}
                    alt="current"
                    className="w-48 h-36 object-cover rounded mt-3 border border-gray-600"
                  />
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
                    className="w-full mt-2 rounded"
                  />
                )}
                {videoFile && (
                  <video
                    controls
                    src={URL.createObjectURL(videoFile)}
                    className="w-full mt-2 rounded"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
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
