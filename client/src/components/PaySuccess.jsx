import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const PaySuccess = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/getcustomer/${userId}`
        );

        const data = response.data.customer || response.data.data || response.data;

        setUserData(data);
        setPrice(data?.price || data?.amount);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">

          {/* Success Icon */}
          <div className="text-green-600 text-5xl mb-4">✔</div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
          <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>

          {/* Receipt Box */}
          <div className="bg-gray-100 rounded-lg p-4 text-left mb-6">
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Name:</strong> {userData?.fullName || 'N/A'}</p>
            <p><strong>Email:</strong> {userData?.email || 'N/A'}</p>


            <p><strong>Amount Paid:</strong> USD {price}</p>
          </div>

          {/* Doctor Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium">
              Thank you for your payment! 💚
            </p>
            <p className="text-sm text-gray-600 mt-2">
              — Dr. Aisha Lakhwani
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaySuccess;