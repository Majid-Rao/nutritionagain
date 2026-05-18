import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

import Footer from './Footer';
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  return (
    <>
    <Navbar />
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Your Cart</h1>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
            <p className="text-gray-500 mb-4">Cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-3 rounded-xl bg-black text-white font-semibold"
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                  />

                  <div className="flex-1">
                    <h2 className="font-bold text-gray-900">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Variant: {item.variant || 'Default'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: Rs. {item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQty(item._id, item.variant, item.qty - 1)
                        }
                        className="w-9 h-9 rounded-lg border text-lg font-bold"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item._id, item.variant, item.qty + 1)
                        }
                        className="w-9 h-9 rounded-lg border text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromCart(item._id, item.variant)}
                      className="text-sm text-red-500 font-semibold"
                    >
                      Remove
                    </button>

                    <p className="font-bold text-gray-900">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm h-fit">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Items</span>
                <span>{cartItems.reduce((sum, i) => sum + i.qty, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Total</span>
                <span className="font-bold text-gray-900">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => navigate('/ecom-order')}
                className="w-full py-3 rounded-xl bg-black text-white font-semibold"
              >
                Proceed to PayNow
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;