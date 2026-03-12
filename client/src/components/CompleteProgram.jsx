import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const CompleteProgram = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
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

    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }

    const cleanPath = imageName
      .replace(/^\/+/, '')
      .replace(/^uploads\/programs\//, '');

    // DON'T convert spaces - keep as-is and encode for URL
    const fullPath = `${backend}/uploads/programs/${encodeURIComponent(cleanPath)}`;
    
    console.log('🔍 Image URL:', fullPath);
    
    return fullPath;
  } catch (error) {
    console.error('Image path error:', error);
    return '/placeholder.jpg';
  }
};
  const loadImageWithRetry = async (imgSrc, maxRetries = 3) => {
    let retryCount = 0;

    const tryLoadImage = () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(imgSrc);
        img.onerror = (error) => {
          if (retryCount < maxRetries - 1) {
            retryCount++;
            console.log(`Retry ${retryCount} for image:`, imgSrc);
            // Exponential backoff for retries
            setTimeout(() => tryLoadImage().then(resolve).catch(reject), 1000 * retryCount);
          } else {
            reject(error);
          }
        };
        img.src = imgSrc; // Removed cache-busting to allow proper caching
      });
    };

    try {
      const loadedSrc = await tryLoadImage();
      return { success: true, src: loadedSrc };
    } catch (error) {
      console.error('Image load failed after retries:', error);
      return { success: false, src: '/placeholder.jpg' };
    }
  };

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/getprogram/${id}`);
        const data = await response.json();
        setProgram(data);

        if (data?.image) {
          setImageState(prev => ({ ...prev, loading: true }));
          const imgSrc = getImagePath(data.image);
          console.log('Loading image from:', imgSrc); // Debug log
          const result = await loadImageWithRetry(imgSrc);
          
          setImageState({
            loading: false,
            error: !result.success,
            src: result.src,
            retryCount: 0
          });
        } else {
          setImageState({
            loading: false,
            error: false,
            src: '/placeholder.jpg',
            retryCount: 0
          });
        }
      } catch (error) {
        console.error('Error fetching program:', error);
        setImageState({
          loading: false,
          error: true,
          src: '/placeholder.jpg',
          retryCount: 0
        });
      }
    };

    fetchProgram();
  }, [id]);

  if (!program) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-[150px] md:h-[400px] sm:h-[250px]">
              {imageState.loading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
              )}
              {imageState.error ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-400">Image not available</span>
                </div>
              ) : (
                <img
                  className="w-full h-full rounded-md object-cover"
                  src={imageState.src || '/placeholder.jpg'}
                  alt={program.heading}
                />
              )}
            </div>
            <h1 className="text-3xl font-semibold mt-6">{program.heading}</h1>
            <p className="text-gray-700 mt-4">{program.description}</p>
            <div className="prose max-w-none mt-6">
              <div dangerouslySetInnerHTML={{ __html: program.content }} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Related</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="border-b pb-2">Quick Tips</li>
                <li className="border-b pb-2">Program FAQs</li>
                <li className="border-b pb-2">Contact Counselor</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CompleteProgram;