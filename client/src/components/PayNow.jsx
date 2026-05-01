import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Stripe initialize karo
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ✅ Card Form — Alag component banana zaroor hai useStripe ke liye
const CheckoutForm = ({ price, originalId, userData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [payLoading, setPayLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    try {
      setPayLoading(true);

      // ✅ Sirf ye ek call chahiye
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/payment/create-payment-intent`,
        {
          amount: price,
          currency: 'usd'
        }
      );

      const clientSecret = data.clientSecret;

      // Card se payment confirm karo
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userData?.fullName || 'Customer',
            email: userData?.email || '',
          }
        }
      });

      if (result.error) {
        toast.error(result.error.message);
        setPayLoading(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful 🎉');
        navigate(`/success/${originalId}`);
      }

    } catch (error) {
      console.error(error);
      toast.error('Payment failed');
      setPayLoading(false);
    }
  };

  // Card Element ka style
  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#9e2146' },
    }
  };

  return (
    <div>
      {/* User Info */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p><strong>Name:</strong> {userData?.fullName}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Amount:</strong> USD {price}</p>
      </div>

      {/* Stripe Card Element — Square wali jagah */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <div className="p-3 border rounded-md bg-white">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {/* Amount */}
      <input
        value={`USD: ${price}`}
        readOnly
        className="w-full p-2 border rounded mb-4 bg-gray-100"
      />

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={!stripe || payLoading || price === 'N/A'}
        className="w-full bg-ternary py-2 rounded font-bold hover:bg-primary disabled:opacity-50 flex items-center justify-center"
      >
        {payLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          'Pay Now'
        )}
      </button>
    </div>
  );
};

// ✅ Main Component
const PayNow = () => {
  const { userId } = useParams();
  const [price, setPrice] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalId, setOriginalId] = useState('');

  useEffect(() => {
    if (!userId) {
      toast.error('User ID is missing!');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-primary to-ternary py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8">Payment Page</h1>

          {loading ? (
            <div className="text-center text-xl text-gray-500">Loading data...</div>
          ) : userData ? (
            // ✅ Elements wrapper zaroor chahiye — CheckoutForm ke upar
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={price}
                originalId={originalId}
                userData={userData}
              />
            </Elements>
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