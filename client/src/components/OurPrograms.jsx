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
      const isProduction = import.meta.env.PROD;
      
      if (!backend) return '/placeholder.jpg';

      // Clean the filename
      const cleanFilename = imageName
        .split('uploads/programs/')
        .pop()
        .replace(/^\/+/, '');

      // Construct URL based on environment
      if (isProduction) {
        // For production - use the API URL
        return `${backend}/api/uploads/programs/${cleanFilename}`;
      } else {
        // For development
        return `${backend}/uploads/programs/${cleanFilename}`;
      }
    } catch (error) {
      console.error('Image path error:', error);
      return '/placeholder.jpg';
    }
  };

  useEffect(() => {
    let mounted = true;
    let retryTimeout;
    const maxRetries = 3;
    const retryDelay = 1500; // Increased delay

    const loadImage = async () => {
      if (!mounted || imageState.retryCount >= maxRetries) {
        if (imageState.retryCount >= maxRetries) {
          console.error(`Max retries reached for image: ${program.heading}`);
          setImageState(prev => ({ ...prev, error: true, loading: false }));
        }
        return;
      }

      try {
        const src = getImagePath(program.image);
        console.log(`Attempting to load image (try ${imageState.retryCount + 1}):`, src);

        const img = new Image();
        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Image load timeout'));
          }, 5000); // 5 second timeout

          img.onload = () => {
            clearTimeout(timeoutId);
            resolve();
          };
          
          img.onerror = () => {
            clearTimeout(timeoutId);
            reject(new Error('Image load failed'));
          };

          img.src = `${src}?t=${Date.now()}`; // Cache buster
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
        console.log(`Retry ${imageState.retryCount + 1} failed for: ${program.heading}`);
        
        if (mounted && imageState.retryCount < maxRetries - 1) {
          retryTimeout = setTimeout(() => {
            setImageState(prev => ({
              ...prev,
              retryCount: prev.retryCount + 1
            }));
          }, retryDelay * (imageState.retryCount + 1)); // Progressive delay
        } else {
          setImageState(prev => ({ ...prev, error: true, loading: false }));
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
