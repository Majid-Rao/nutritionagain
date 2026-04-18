import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const PayNow = () => {
  const { userId } = useParams();
  const [price, setPrice] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(true); 
  const [payLoading, setPayLoading] = useState(false);
  const [originalId, setOriginalId] = useState('');
  const navigate = useNavigate();

  // 🔷 Fetch user data
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

        if (userId.startsWith('user-')) {
          response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/getcustomer/simpleId/${userId}`);
        } else {
          response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/getcustomer/${userId}`);
        }

        const data = response.data.customer || response.data.data || response.data;

        if (!data || Object.keys(data).length === 0) {
          throw new Error('Customer data not found');
        }

        setUserData(data);
        setPrice(data?.price || data?.amount || 'N/A');
        setOriginalId(data._id);

      } catch (error) {
        console.error(error);
        toast.error(`Failed: ${error.message}`);
        setUserData(null);
        setPrice('N/A');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [userId]);

  // 🔷 Initialize Square Card
  useEffect(() => {
    let isMounted = true;

    const initSquare = async () => {
      if (!window.Square || window.card) return;

      try {
        const payments = window.Square.payments(
          import.meta.env.VITE_SQUARE_APP_ID,
          import.meta.env.VITE_SQUARE_LOCATION_ID
        );

        const card = await payments.card();

        const container = document.getElementById('card-container');
        if (container) container.innerHTML = "";

        await card.attach('#card-container');

        if (isMounted) {
          window.card = card;
          setCardLoading(false); // ✅ hide loader
        }

      } catch (error) {
        console.error(error);
        setCardLoading(false);
      }
    };

    if (!loading && userData) {
      initSquare();
    }

    return () => {
      isMounted = false;
    };
  }, [loading, userData]);

  // 🔷 Handle Payment
  const handlePayment = async () => {
    if (!window.card) {
      toast.error("Card not ready");
      return;
    }

    try {
       setPayLoading(true); // ✅ start loading
      const result = await window.card.tokenize();

      if (result.status !== 'OK') {
        toast.error("Card tokenization failed");
        setPayLoading(false);
        return;
      }

      const token = result.token;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/payment/pay`,
        {
          token,
          amount: price,
        }
      );

      if (response.data.success) {
        toast.success("Payment successful 🎉");
        navigate(`/success/${originalId}`); 
      } else {
        toast.error("Payment failed");
        setPayLoading(false);
      }

    } catch (error) {
      console.error(error);
      toast.error("Payment error");
      setPayLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-primary to-ternary py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">

          <h1 className="text-2xl font-bold text-center mb-8">Payment Page</h1>

          {loading ? (
            <div className="text-center text-xl text-gray-500">Loading data...</div>
          ) : userData ? (
            <div>

              {/* User Info */}
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <p><strong>Name:</strong> {userData.fullName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Amount:</strong> USD {price}</p>
              </div>

              {/* Card Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Card Details</label>

                {cardLoading && (
                  <div className="flex justify-center py-6">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                )}

                <div
                  id="card-container"
                  className={`mt-2 p-3 border rounded-md ${cardLoading ? 'hidden' : ''}`}
                ></div>
              </div>

              {/* Price */}
              <input
                value={`USD: ${price}`}
                readOnly
                className="w-full p-2 border rounded mb-4 bg-gray-100"
              />

              {/* Button */}
              <button
              onClick={handlePayment}
              disabled={cardLoading || price === 'N/A' || payLoading}
            className="w-full bg-ternary py-2 rounded font-bold hover:bg-primary disabled:opacity-50 flex items-center justify-center">
               {payLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                    </div>
                 ) : (
                    "Pay Now"
                  )}
                </button>
            </div>
          ) : (
            <div className="text-center text-red-500">Failed to load data</div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default PayNow;