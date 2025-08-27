import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PkgCard = ({ pkg }) => {
  return (
    <div className=" bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition duration-300 ease-in-out ">
      <img
        className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={`${import.meta.env.VITE_BACKEND_API}uploads/${pkg.image}`}
        alt={pkg.name}
      />
      <div className="p-6 space-y-4">
        <h3 className="sm:text-2xl text-xl font-semibold text-ternary group-hover:text-primary transition duration-300">{pkg.name}</h3>
        <p className="text-gray-800 text-base">Desc: {pkg.description}</p>
        <p className="text-gray-800 text-base">Price: {pkg.price}</p>
        <div className="flex items-center justify-between">
          <Link
            to={`/packageshow/${pkg._id}`}
            className="inline-block bg-ternary text-black text-sm font-semibold py-2 px-4 rounded-lg hover:bg-primary transition duration-300 ease-in-out"
          >
            See Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

const Packagepage = () => {
  const [packages, setPackages] = useState([]); // ✅ Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getpackages`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // ✅ Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setPackages(data);
        } else if (data && Array.isArray(data.packages)) {
          // If API returns {packages: [...]}
          setPackages(data.packages);
        } else {
          console.warn('API returned non-array data:', data);
          setPackages([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError(error.message);
        setPackages([]); // ✅ Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className='bg-secondary dark:bg-gray-700 dark:text-white duration-200'>
        <section className=" text-black text-center py-20 relative  ">
          <h1 className="text-2xl sm:text-5xl font-semibold mb-4 animate-slide-in-up">Our Packages</h1>
          <p className="text-lg max-w-3xl mx-auto mb-8  animate-slide-in-down">
            Stay updated with the latest insights and articles from our expert team. We bring you fresh content to keep you informed and inspired.
          </p>
        </section>
      </div>
      
      <div className='dark:bg-gray-700 dark:text-white duration-200'>
        <div className='bg-ternary w-40 sm:w-56 px-3 mt-8 rounded-r-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out animate-slide-in-right'>
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-8 ">Latest Packages</h2>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          {/* ✅ Handle loading state */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-lg">Loading packages...</p>
            </div>
          )}
          
          {/* ✅ Handle error state */}
          {error && (
            <div className="text-center py-8 text-red-600">
              <p className="text-lg">Error loading packages: {error}</p>
            </div>
          )}
          
          {/* ✅ Handle empty state */}
          {!loading && !error && packages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg">No packages available at the moment.</p>
            </div>
          )}
          
          {/* ✅ Safe rendering of packages */}
          {!loading && !error && packages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PkgCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Packagepage;