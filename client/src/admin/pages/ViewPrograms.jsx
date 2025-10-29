import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import toast from "react-hot-toast";
const ViewPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const backend = import.meta.env.VITE_BACKEND_API.replace(/\/$/, "");

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backend}/api/getprograms`);
      setPrograms(res.data || []);
    } catch (err) {
      console.error("Error fetching programs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
    const onAdded = () => fetchPrograms();
    window.addEventListener("programAdded", onAdded);
    return () => window.removeEventListener("programAdded", onAdded);
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this program?");
    if (!ok) return;
    try {
      await axios.delete(`${backend}/api/deleteprogram/${id}`);
      setMessage("🗑️ Program deleted successfully");
      setPrograms((p) => p.filter((x) => x._id !== id));
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Failed to delete program");
      setTimeout(() => setMessage(""), 2500);
    }
  };

  const filtered = programs.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (p.heading || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
  });

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
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold">View Programs</h2>
                <div className="flex items-center gap-3">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search title or description..."
                    className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none"
                  />
                  <button
                    onClick={() => fetchPrograms()}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {message && (
                <p className="text-sm text-center mb-4 text-green-400">{message}</p>
              )}

              {loading ? (
                <p className="text-center text-gray-300">Loading programs...</p>
              ) : filtered.length === 0 ? (
                <p className="text-center text-gray-400">No programs found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((p) => (
                    <div
                      key={p._id}
                      className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 shadow-sm"
                    >
                      <div className="w-full h-44 overflow-hidden">
                        <img
                          src={`${backend}${p.image ? p.image.startsWith("/uploads") ? p.image : `/uploads/${p.image}` : ""}`}
                          alt={p.heading}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-white">{p.heading}</h3>
                        <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                          {p.description}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/updateprogram/${p._id}`)}
                            className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black text-sm font-medium"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(p._id)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => navigate(`/program/${p._id}`)}
                            className="ml-auto px-3 py-2 bg-primary hover:opacity-90 rounded text-black text-sm font-medium hover:bg-ternary"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      </div>
    </>
  );
};

export default ViewPrograms;
