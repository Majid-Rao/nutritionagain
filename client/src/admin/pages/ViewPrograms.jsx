import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import toast from "react-hot-toast";

const ProgramImage = ({ program }) => {
  const [imageState, setImageState] = useState({
    loading: true,
    error: false,
    src: null
  });

  // CRITICAL FIX: Simple direct path construction
  const getImagePath = (imageName) => {
    if (!imageName) return '/placeholder.jpg';
    
    const backend = import.meta.env.VITE_BACKEND_API?.replace(/\/$/, '');
    if (!backend) return '/placeholder.jpg';

    try {
      // Extract just filename
      const filename = imageName.split('/').pop();
      
      // IMPORTANT: Direct path, NO /api/image/
      const fullPath = `${backend}/uploads/programs/${filename}`;
      
      console.log('🔗 Image URL:', fullPath);
      return fullPath;

    } catch (error) {
      return '/placeholder.jpg';
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        const src = getImagePath(program.image);

        const img = new Image();
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Timeout')), 10000);

          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };

          img.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Load failed'));
          };

          img.src = src;
        });

        if (mounted) {
          setImageState({
            loading: false,
            error: false,
            src
          });
        }
      } catch (error) {
        if (mounted) {
          setImageState({
            loading: false,
            error: true,
            src: '/placeholder.jpg'
          });
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [program.image, program._id]);

  if (imageState.error) {
    return (
      <div className="w-full h-44 bg-gray-700 flex flex-col items-center justify-center">
        <span className="text-gray-400 text-sm">❌ Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-44 bg-gray-600">
      {imageState.loading && (
        <div className="absolute inset-0 bg-gray-600 animate-pulse" />
      )}
      <img
        src={imageState.src || '/placeholder.jpg'}
        alt={program.heading}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageState.loading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

const ViewPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const backend = useMemo(() => {
    const url = import.meta.env.VITE_BACKEND_API;
    if (!url) {
      console.error('❌ Backend URL not configured');
      return '';
    }
    return url.replace(/\/$/, '');
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/api/getprograms`);
      if (response.data) {
        setPrograms(response.data);
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      console.error("Error fetching programs:", err);
      toast.error("Failed to load programs");
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backend) {
      fetchPrograms();
    }
    const onAdded = () => {
      if (backend) fetchPrograms();
    };
    window.addEventListener("programAdded", onAdded);
    return () => window.removeEventListener("programAdded", onAdded);
  }, [backend]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this program?");
    if (!ok) return;
    
    try {
      await axios.delete(`${backend}/api/deleteprogram/${id}`);
      setMessage("🗑️ Program deleted successfully");
      setPrograms((p) => p.filter((x) => x._id !== id));
      toast.success("Program deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Failed to delete program");
      toast.error("Failed to delete program");
    } finally {
      setTimeout(() => setMessage(""), 2500);
    }
  };

  const filtered = programs.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (p.heading || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
  });

  if (!backend) {
    return (
      <div className='flex h-screen bg-gray-900 text-gray-100 items-center justify-center'>
        <p className='text-red-400'>Backend URL not configured</p>
      </div>
    );
  }

  return (
    <>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
          <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
        <Sidebar />
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='View Programs' />
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
                        className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <div className="w-full h-44 overflow-hidden bg-gray-600">
                          <ProgramImage program={p} />
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-white">{p.heading}</h3>
                          <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                            {p.description}
                          </p>

                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => navigate(`/updateprogram/${p._id}`)}
                              className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(p._id)}
                              className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>

                            <button
                              onClick={() => navigate(`/program/${p._id}`)}
                              className="ml-auto px-3 py-2 bg-primary hover:bg-ternary rounded text-black text-sm font-medium transition-colors"
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