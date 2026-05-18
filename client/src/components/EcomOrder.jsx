// EcomOrder.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const BASE = import.meta.env.VITE_BACKEND_API;

const EcomOrder = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName:    '',
    customerEmail:   '',
    customerPhone:   '',
    customerAddress: '',
    customerCity:    '',
    customerNote:    '',
    paymentMethod:   'cod',
  });

  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState(null);

  const handleField = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-700
    focus:outline-none transition-all bg-white`;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!cartItems.length) {
      setMsg({ type: 'error', text: 'Cart is empty!' });
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      const products = cartItems.map(item => ({
        product:     item._id,
        productName: item.name,
        variation:   item.variant || '',
        price:       item.price,
        quantity:    item.qty,
      }));

      await axios.post(`${BASE}/api/addOrder`, { ...form, products });

      setMsg({ type: 'success', text: 'Order placed successfully! We will contact you soon.' });
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  // ── If cart is empty redirect ──
  if (!cartItems.length && !msg) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#fff5f5' }}>
          <div className="text-center p-8">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-gray-500 font-medium mb-4">Your cart is empty</p>
            <button onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-2xl text-white font-bold transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(to right, #c9706b, #e8b4b0)' }}>
              Browse Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="px-4 py-3 border-b" style={{ background: '#fff5f5', borderColor: '#f2d2cf' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <a href="/" className="hover:text-gray-600 transition-colors">Home</a>
          <span>/</span>
          <a href="/cart" className="hover:text-gray-600 transition-colors">Cart</a>
          <span>/</span>
          <span className="font-medium" style={{ color: '#c9706b' }}>Checkout</span>
        </div>
      </div>

      <section className="py-10 px-4 min-h-screen" style={{ background: 'linear-gradient(to bottom, #fff5f5, #ffffff)' }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
            <p className="text-gray-500 text-sm mt-1">Fill in your details and place your order</p>
          </div>

          {/* Success Message */}
          {msg?.type === 'success' && (
            <div className="mb-6 p-5 rounded-2xl border text-center"
              style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-bold text-emerald-700 text-lg">{msg.text}</p>
              <p className="text-emerald-600 text-sm mt-1">Redirecting to home...</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT — Form ── */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Error msg */}
                {msg?.type === 'error' && (
                  <div className="px-4 py-3 rounded-xl border text-sm font-medium"
                    style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#dc2626' }}>
                    {msg.text}
                  </div>
                )}

                {/* ── Personal Info ── */}
                <div className="rounded-2xl border p-5 space-y-4" style={{ borderColor: '#f2d2cf', background: '#fff' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-6 rounded-full" style={{ background: '#c9706b' }} />
                    <h2 className="font-black text-gray-800">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input type="text" name="customerName" required value={form.customerName}
                        onChange={handleField} placeholder=""
                        className={inputClass} style={{ borderColor: '#f2d2cf' }}
                        onFocus={e => e.target.style.borderColor = '#c9706b'}
                        onBlur={e  => e.target.style.borderColor = '#f2d2cf'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Email *
                      </label>
                      <input type="email" name="customerEmail" required value={form.customerEmail}
                        onChange={handleField} placeholder=""
                        className={inputClass} style={{ borderColor: '#f2d2cf' }}
                        onFocus={e => e.target.style.borderColor = '#c9706b'}
                        onBlur={e  => e.target.style.borderColor = '#f2d2cf'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input type="tel" name="customerPhone" required value={form.customerPhone}
                      onChange={handleField} placeholder=""
                      className={inputClass} style={{ borderColor: '#f2d2cf' }}
                      onFocus={e => e.target.style.borderColor = '#c9706b'}
                      onBlur={e  => e.target.style.borderColor = '#f2d2cf'}
                    />
                  </div>
                </div>

                {/* ── Delivery Info ── */}
                <div className="rounded-2xl border p-5 space-y-4" style={{ borderColor: '#f2d2cf', background: '#fff' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-6 rounded-full" style={{ background: '#c9706b' }} />
                    <h2 className="font-black text-gray-800">Delivery Information</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Full Address *
                      </label>
                      <input type="text" name="customerAddress" required value={form.customerAddress}
                        onChange={handleField} placeholder=""
                        className={inputClass} style={{ borderColor: '#f2d2cf' }}
                        onFocus={e => e.target.style.borderColor = '#c9706b'}
                        onBlur={e  => e.target.style.borderColor = '#f2d2cf'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        City
                      </label>
                      <input type="text" name="customerCity" value={form.customerCity}
                        onChange={handleField} placeholder=""
                        className={inputClass} style={{ borderColor: '#f2d2cf' }}
                        onFocus={e => e.target.style.borderColor = '#c9706b'}
                        onBlur={e  => e.target.style.borderColor = '#f2d2cf'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Order Note
                      </label>
                      <input type="text" name="customerNote" value={form.customerNote}
                        onChange={handleField} placeholder="Any special instructions..."
                        className={inputClass} style={{ borderColor: '#f2d2cf' }}
                        onFocus={e => e.target.style.borderColor = '#c9706b'}
                        onBlur={e  => e.target.style.borderColor = '#f2d2cf'}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Payment Method ── */}
                <div className="rounded-2xl border p-5 space-y-3" style={{ borderColor: '#f2d2cf', background: '#fff' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-6 rounded-full" style={{ background: '#c9706b' }} />
                    <h2 className="font-black text-gray-800">Payment Method</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'cod',           label: 'Cash on Delivery', icon: '💵' },
                      { value: 'bank_transfer', label: 'Bank Transfer',    icon: '🏦' },
                      { value: 'online',        label: 'Online Payment',   icon: '💳' },
                    ].map(opt => (
                      <button key={opt.value} type="button"
                        onClick={() => setForm(p => ({ ...p, paymentMethod: opt.value }))}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-semibold"
                        style={form.paymentMethod === opt.value
                          ? { borderColor: '#c9706b', background: '#fff5f5', color: '#c9706b' }
                          : { borderColor: '#f2d2cf', background: '#fff', color: '#6b7280' }
                        }>
                        <span className="text-2xl">{opt.icon}</span>
                        {opt.label}
                        {form.paymentMethod === opt.value && (
                          <span className="text-xs font-bold" style={{ color: '#c9706b' }}>✓ Selected</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Submit Button ── */}
                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-2xl text-white font-black text-base transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  style={{ background: 'linear-gradient(to right, #c9706b, #e8b4b0)', boxShadow: '0 4px 20px rgba(201,112,107,0.35)' }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Placing Order...
                    </span>
                  ) : '🛒 Place Order'}
                </button>

              </form>
            </div>

            {/* ── RIGHT — Order Summary ── */}
            <div className="lg:sticky lg:top-6 space-y-4">

              {/* Products */}
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#f2d2cf' }}>
                <div className="px-5 py-4 border-b" style={{ background: '#fff5f5', borderColor: '#f2d2cf' }}>
                  <h3 className="font-black text-gray-800">Order Summary</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</p>
                </div>

                <div className="divide-y bg-white" style={{ '--tw-divide-opacity': 1 }}>
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-3 p-4" style={{ borderColor: '#f2d2cf' }}>
                      {/* Image */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border"
                        style={{ borderColor: '#f2d2cf' }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl"
                            style={{ background: '#fff5f5' }}>📦</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-gray-400 mt-0.5">{item.variant}</p>
                        )}
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-gray-400">Qty: {item.qty}</span>
                          <span className="text-sm font-bold" style={{ color: '#c9706b' }}>
                            Rs. {(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="rounded-2xl border p-5 space-y-3 bg-white" style={{ borderColor: '#f2d2cf' }}>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-emerald-500 font-semibold">Free</span>
                </div>
                <div className="h-px" style={{ background: '#f2d2cf' }} />
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-800">Total</span>
                  <span className="text-2xl font-black" style={{ color: '#c9706b' }}>
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '🔒', text: 'Secure' },
                  { icon: '✅', text: 'Authentic' },
                  { icon: '🚚', text: 'Fast Delivery' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-xl border text-center"
                    style={{ borderColor: '#f2d2cf', background: '#fff5f5' }}>
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-xs font-medium text-gray-500">{b.text}</span>
                  </div>
                ))}
              </div>

            </div>
            {/* ── END RIGHT ── */}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EcomOrder;