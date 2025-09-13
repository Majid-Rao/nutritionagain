import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
const CheckData = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(`/payment/${userId}`);
  }

  const isValidId = (id) => {
    // Check for simplified ID format (user-XXXXX)
    const isSimpleId = /^user-[a-f0-9]{5}$/i.test(id);
    // Check for MongoDB ObjectId format (24 hex characters)
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
    return isSimpleId || isMongoId;
  };
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
     if (!userId.trim()) {
      setError("Please enter an ID");
      setLoading(false);
      return;
    }
     const cleanId = userId.trim().toLowerCase()
     // Validate ID format
   if (!isValidId(cleanId)) {
      setError("Please enter a valid ID (either original ID or user-XXXXX format)");
      toast.error("Invalid ID format");
      setLoading(false);
      return;
    }

     try {
      let response;
      
      // Try to fetch data based on ID format
      if (cleanId.startsWith('user-')) {
        // Try simplified ID first
        response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/getcustomer/simpleId/${cleanId}`);
      } else {
        // Try original MongoDB ID
        response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/getcustomer/${cleanId}`);
      }

      const customerData = response.data.customer || response.data;
      
      if (!customerData) {
        throw new Error('No customer data found');
      }

      setUserData(customerData);
      toast.success("Data fetched successfully!");
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No customer found with this ID");
      toast.error("Customer not found");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="sm:text-4xl text-2xl font-semibold mb-4 animate-slide-in-up">Pay Your Amount</h1>
  <h2 className=" sm:text-2xl text-lg font-semibold mb-4 animate-slide-in-up">Some Instructions</h2>
   <ol className='list-disc  sm:text-left list-inside space-y-2 text-md mb-4'>
      <li>Type your id in the search box.</li>
      <li>You can see your info with amount after searching.</li>
      <li>Then click to checkout button then you will redirect to paynow page.</li>
      <li>At this page simply type your required payment details.</li>
      
    </ol></section>
      <div className="container mx-auto px-4 py-6">
        <div className="w-full max-w-sm mx-auto">
           <input
    type="text"
    inputMode="text"
    placeholder="Enter User ID"
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
    onTouchStart={(e) => e.target.focus()}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="none"
    spellCheck="false"
    className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
  />
          <button
    onClick={handleSearch}
    disabled={loading}
    className={`w-full mt-4 p-3 ${loading ? 'bg-gray-400' : 'bg-ternary'} text-black rounded-lg`}
  >
    {loading ? 'Searching...' : 'Search'}
  </button>
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {userData && (
          <div className="mt-6 overflow-x-auto bg-white shadow-lg rounded-lg p-4">

            <table className="min-w-full table-auto text-center">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 ">Field</th>
                  <th className="px-4 py-2 ">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-semibold">Full Name</td>
                  <td className="px-4 py-2">{userData?.fullName || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Email</td>
                  <td className="px-4 py-2">{userData?.email || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Gender</td>
                  <td className="px-4 py-2">{userData?.gender || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Age</td>
                  <td className="px-4 py-2">{userData?.age || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Location</td>
                  <td className="px-4 py-2">{userData?.location || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Contact Number</td>
                  <td className="px-4 py-2">{userData?.contactNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Status</td>
                  <td className="px-4 py-2">{userData?.status || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Price</td>
                  <td className="px-4 py-2">Rs: {userData?.price || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
              <div className="mt-4 text-center">
                <button className="px-6 py-2 bg-ternary text-black rounded-lg hover:bg-primary" onClick={handlePayment}>
                  Checkout Now
                </button>
              </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckData;