import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const ProgramCard = ({ program }) => {
  const [imageState, setImageState] = useState({
    loading: true,
    error: false,
    src: null,
    retryCount: 0
  });

  const getImagePath = (imageName) => {
    if (!imageName) return '/placeholder.jpg';
    
    try {
      const backend = import.meta.env.VITE_BACKEND_API?.replace(/\/$/, '');
      if (!backend) return '/placeholder.jpg';

      // Clean path by removing duplicates and leading slashes
      const cleanPath = imageName
        .replace(/\/uploads\/programs\/+/g, 'uploads/programs/')
        .replace(/^\/+/, '')
        .replace(/uploads\/programs\/uploads\/programs\//, 'uploads/programs/');

      // Extract filename only
      const filename = cleanPath.split('uploads/programs/').pop();
      
      // Construct full URL
      return `${backend}/uploads/programs/${filename}`;
    } catch (error) {
      console.error('Image path error:', error);
      return '/placeholder.jpg';
    }
  };

  useEffect(() => {
    let mounted = true;
    let retryTimeout;
    const maxRetries = 3;
    const retryDelay = 1000;

    const loadImage = async () => {
      if (!mounted || imageState.retryCount >= maxRetries) {
        if (imageState.retryCount >= maxRetries) {
          setImageState(prev => ({ ...prev, error: true, loading: false }));
        }
        return;
      }

      try {
        const src = getImagePath(program.image);
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        if (mounted) {
          setImageState({
            loading: false,
            error: false,
            src,
            retryCount: 0
          });
        }
      } catch (error) {
        if (mounted && imageState.retryCount < maxRetries - 1) {
          retryTimeout = setTimeout(() => {
            setImageState(prev => ({
              ...prev,
              retryCount: prev.retryCount + 1
            }));
          }, retryDelay);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [program.image, imageState.retryCount]);

   return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition duration-300 ease-in-out flex flex-col h-full">
      <div className="relative w-full h-56">
        {imageState.loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        {imageState.error ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image not available</span>
          </div>
        ) : (
          <img
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
            src={imageState.src || '/placeholder.jpg'}
            alt={program.heading}
          />
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{program.heading}</h3>
        <p className="text-gray-600 text-sm flex-1">{program.description}</p>
        <div className="mt-4">
          <Link 
            to={`/program/${program._id}`} 
            className="inline-block bg-primary px-4 py-2 rounded-md text-black text-sm font-semibold hover:bg-ternary transition duration-300 ease-in-out w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// ...rest of OurPrograms component remains the same...

const OurPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getprograms`);
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Our Programs</h1>

          {loading ? (
            <div className="text-center">Loading programs...</div>
          ) : (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <motion.div key={p._id} whileHover={{ scale: 1.02 }}>
                  <ProgramCard program={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurPrograms;
