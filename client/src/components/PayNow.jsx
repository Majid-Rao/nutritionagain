import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const PayNow = () => {
  const { userId } = useParams(); // To get userId from URL
  const [price, setPrice] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalId, setOriginalId] = useState(''); // State to store original MongoDB ObjectId
  const navigate = useNavigate();

  // Fetch user data using the provided userId
  useEffect(() => {
    if (!userId) {
      toast.error('User ID is missing!');
      setLoading(false);
      return;
    }

    const fetchPrice = async () => {
      try {
        setLoading(true);
        let response;
        
        // Same logic as CheckData component - check ID format and call appropriate API
        if (userId.startsWith('user-')) {
          // If it's simplified ID format, use simpleId endpoint
          response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/getcustomer/simpleId/${userId}`);
        } else {
          // If it's MongoDB ObjectId format, use regular endpoint
          response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/getcustomer/${userId}`);
        }

        // Handle different response structures
        let customerData;
        if (response.data.customer) {
          customerData = response.data.customer;
        } else if (response.data.data) {
          customerData = response.data.data;
        } else {
          customerData = response.data;
        }

        if (!customerData || Object.keys(customerData).length === 0) {
          throw new Error('Customer data not found or empty');
        }

        setUserData(customerData);
        setPrice(customerData?.price || customerData?.amount || 'N/A');

        // Save the original MongoDB ObjectId after fetching the data
        setOriginalId(customerData._id); // Store original MongoDB ObjectId
        
        toast.success("Customer data loaded successfully!");
        
      } catch (error) {
        console.error('Detailed error:', error);
        console.error('Error response:', error.response);
        toast.error(`Failed to fetch customer data: ${error.message}`);
        setUserData(null);
        setPrice('N/A');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [userId]);

  // Handle payment submission
  const handlePayment = () => {
    if (!userData || !price || price === 'N/A') {
      toast.error('Invalid payment data');
      return;
    }
    alert(`Payment of Rs: ${price} processed for ${userData.fullName || 'Customer'}`);
    // Add your actual payment logic here
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-primary to-ternary py-12 px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-r dark:from-gray-600 dark:to-gray-800">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Payment Page</h1>

          {/* If price is fetched and loading is false */}
          {loading ? (
            <div className="text-center text-xl text-gray-500">Loading data...</div>
          ) : userData ? (
            <div>
              {/* Customer Info Display */}
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg text-center sm:text-left font-semibold mb-2">Customer Information</h3>
                <p><strong>Name:</strong> {userData.fullName || 'N/A'}</p>
                <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
                <p><strong>Amount to Pay:</strong> Rs: {price}</p>
              </div>

              {/* Card Details Form */}
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your card number"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter cardholder name"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="number"
                    id="cvv"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter CVV"
                  />
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  value={`Rs: ${price}`}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
                />
              </div>

              {/* Pay Now Button */}
              <div className="mt-6 text-center relative">
                {/* Tooltip for showing original MongoDB ObjectId on hover */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-ternary text-black font-bold py-2 px-4 rounded-md hover:bg-primary"
                  disabled={!userData || price === 'N/A'}
                  title={`Original User ID: ${originalId}`} // Shows original ObjectId on hover
                >
                  Pay Now
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">Failed to load customer data</div>
              <button 
                onClick={() => navigate('/checkdata')} 
                className="bg-ternary text-white px-4 py-2 rounded-md hover:bg-primary"
              >
                Go Back to Search
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PayNow;
