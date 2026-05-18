// ManageOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';

const BASE = import.meta.env.VITE_BACKEND_API;

// ── Status Badge ──────────────────────────────────────────────────────────────
const OrderStatusBadge = ({ status }) => {
  const styles = {
    pending:    'bg-amber-500/10   border-amber-500/30   text-amber-400',
    confirmed:  'bg-blue-500/10    border-blue-500/30    text-blue-400',
    processing: 'bg-violet-500/10  border-violet-500/30  text-violet-400',
    shipped:    'bg-cyan-500/10    border-cyan-500/30    text-cyan-400',
    delivered:  'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    cancelled:  'bg-red-500/10     border-red-500/30     text-red-400',
  };
  const dots = {
    pending:    'bg-amber-400',
    confirmed:  'bg-blue-400',
    processing: 'bg-violet-400',
    shipped:    'bg-cyan-400',
    delivered:  'bg-emerald-400',
    cancelled:  'bg-red-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${styles[status] || styles.pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.pending}`} />
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const styles = {
    unpaid:   'bg-red-500/10    border-red-500/30    text-red-400',
    paid:     'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    refunded: 'bg-gray-500/10   border-gray-500/30   text-gray-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${styles[status] || styles.unpaid}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

// ── Edit Modal ────────────────────────────────────────────────────────────────
const EditModal = ({ order, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    orderStatus:   order.orderStatus   || 'pending',
    paymentStatus: order.paymentStatus || 'unpaid',
    paymentMethod: order.paymentMethod || 'cod',
    customerName:    order.customerName    || '',
    customerEmail:   order.customerEmail   || '',
    customerPhone:   order.customerPhone   || '',
    customerAddress: order.customerAddress || '',
    customerCity:    order.customerCity    || '',
    customerNote:    order.customerNote    || '',
  });
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');

  const handleSave = async () => {
    setLoading(true);
    setErr('');
    try {
      await axios.patch(`${BASE}/api/editOrder/${order._id}`, form);
      onUpdated();
      onClose();
    } catch (e) {
      setErr(e.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-all";
  const selectClass = "w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-violet-500 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5";

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      <div className="relative w-full max-w-xl bg-gray-800 border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 bg-violet-500/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <h3 className="text-sm font-bold text-violet-400 uppercase tracking-widest">Edit Order</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-200 hover:bg-gray-700 p-1.5 rounded-lg transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[75vh] p-5 space-y-4">

          {err && (
            <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{err}</div>
          )}

          {/* Status Section */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Order Status</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <div>
                <label className={labelClass}>Order Status</label>
                <select value={form.orderStatus} onChange={e => setForm(p => ({ ...p, orderStatus: e.target.value }))} className={selectClass}>
                  {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Payment Status</label>
                <select value={form.paymentStatus} onChange={e => setForm(p => ({ ...p, paymentStatus: e.target.value }))} className={selectClass}>
                  {['unpaid','paid','refunded'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Payment Method</label>
                <select value={form.paymentMethod} onChange={e => setForm(p => ({ ...p, paymentMethod: e.target.value }))} className={selectClass}>
                  {['cod','bank_transfer','online'].map(s => (
                    <option key={s} value={s}>{s === 'cod' ? 'Cash on Delivery' : s === 'bank_transfer' ? 'Bank Transfer' : 'Online'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Customer Info</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Name</label>
                <input value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))} className={inputClass} placeholder="Customer name"/>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input value={form.customerEmail} onChange={e => setForm(p => ({ ...p, customerEmail: e.target.value }))} className={inputClass} placeholder="Email"/>
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input value={form.customerPhone} onChange={e => setForm(p => ({ ...p, customerPhone: e.target.value }))} className={inputClass} placeholder="Phone"/>
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input value={form.customerCity} onChange={e => setForm(p => ({ ...p, customerCity: e.target.value }))} className={inputClass} placeholder="City"/>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Address</label>
                <input value={form.customerAddress} onChange={e => setForm(p => ({ ...p, customerAddress: e.target.value }))} className={inputClass} placeholder="Full address"/>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Note</label>
                <input value={form.customerNote} onChange={e => setForm(p => ({ ...p, customerNote: e.target.value }))} className={inputClass} placeholder="Order note"/>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-700 bg-gray-900/30 flex gap-3">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
const DetailModal = ({ order, onClose }) => {
const handlePrint = () => {
  const productsRows = order.products?.map(p => `
    <tr>
      <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; font-size:13px;">${p.productName || '—'}</td>
      <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:center; font-size:13px;">${p.variation || '—'}</td>
      <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:center; font-size:13px;">×${p.quantity}</td>
      <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:right; font-size:13px;">Rs. ${p.price?.toLocaleString()}</td>
      <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:right; font-size:13px; font-weight:700; color:#c9706b;">Rs. ${p.subtotal?.toLocaleString()}</td>
    </tr>
  `).join('');

  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Invoice — ${order._id?.slice(-8).toUpperCase()}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #1a1a1a; padding: 40px; }
        @media print {
          body { padding: 20px; }
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>

      <!-- Header -->
      <div style="border-bottom: 3px solid #c9706b; padding-bottom: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 900; color: #1a1a1a; letter-spacing: -0.5px;">
              Dr. Aisha Lakhwani
            </h1>
            <p style="color: #c9706b; font-size: 13px; font-weight: 600; margin-top: 3px;">
              Products & Fertility Expert
            </p>
            <p style="color: #888; font-size: 12px; margin-top: 6px;">
              aishalakhwani10@gmail.com
            </p>
          </div>
          <div style="text-align: right;">
            <div style="display: inline-block; background: #fff5f5; border: 1px solid #f2d2cf; border-radius: 12px; padding: 12px 20px;">
              <p style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Invoice</p>
              <p style="font-size: 18px; font-weight: 900; color: #c9706b;">#${order._id?.slice(-8).toUpperCase()}</p>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 8px;">
              Date: ${new Date(order.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <!-- Customer + Order Info Side by Side -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;">

        <!-- Customer -->
        <div style="background: #fff5f5; border: 1px solid #f2d2cf; border-radius: 12px; padding: 16px;">
          <p style="font-size: 11px; font-weight: 700; color: #c9706b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Bill To</p>
          <p style="font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 6px;">${order.customerName}</p>
          <p style="font-size: 13px; color: #555; margin-bottom: 3px;">📧 ${order.customerEmail}</p>
          <p style="font-size: 13px; color: #555; margin-bottom: 3px;">📞 ${order.customerPhone}</p>
          <p style="font-size: 13px; color: #555; margin-bottom: 3px;">📍 ${order.customerAddress}${order.customerCity ? ', ' + order.customerCity : ''}</p>
          ${order.customerNote ? `<p style="font-size: 12px; color: #888; margin-top: 6px; font-style: italic;">Note: ${order.customerNote}</p>` : ''}
        </div>

        <!-- Order Info -->
        <div style="background: #f9f9f9; border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px;">
          <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Order Info</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="font-size: 12px; color: #888; padding: 4px 0;">Order Status</td>
              <td style="font-size: 12px; font-weight: 700; color: #1a1a1a; text-align: right; text-transform: capitalize;">${order.orderStatus}</td>
            </tr>
            <tr>
              <td style="font-size: 12px; color: #888; padding: 4px 0;">Payment Status</td>
              <td style="font-size: 12px; font-weight: 700; color: ${order.paymentStatus === 'paid' ? '#16a34a' : '#dc2626'}; text-align: right; text-transform: capitalize;">${order.paymentStatus}</td>
            </tr>
            <tr>
              <td style="font-size: 12px; color: #888; padding: 4px 0;">Payment Method</td>
              <td style="font-size: 12px; font-weight: 700; color: #1a1a1a; text-align: right; text-transform: capitalize;">${order.paymentMethod?.replace('_', ' ')}</td>
            </tr>
            <tr>
              <td style="font-size: 12px; color: #888; padding: 4px 0;">Order Date</td>
              <td style="font-size: 12px; font-weight: 700; color: #1a1a1a; text-align: right;">${new Date(order.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Products Table -->
      <div style="margin-bottom: 24px;">
        <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Ordered Items</p>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #f2d2cf; border-radius: 12px; overflow: hidden;">
          <thead>
            <tr style="background: #fff5f5;">
              <th style="padding: 12px; text-align: left; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Product</th>
              <th style="padding: 12px; text-align: center; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Variant</th>
              <th style="padding: 12px; text-align: center; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
              <th style="padding: 12px; text-align: right; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Unit Price</th>
              <th style="padding: 12px; text-align: right; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${productsRows}
          </tbody>
        </table>
      </div>

      <!-- Total -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 32px;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2020); border-radius: 16px; padding: 20px 28px; min-width: 240px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 13px; color: rgba(255,255,255,0.6);">Items Total</span>
            <span style="font-size: 13px; color: #fff;">Rs. ${order.totalAmount?.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 13px; color: rgba(255,255,255,0.6);">Delivery</span>
            <span style="font-size: 13px; color: #6ee7b7;">Free</span>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.15); padding-top: 12px; display: flex; justify-content: space-between;">
            <span style="font-size: 15px; font-weight: 700; color: #f2d2cf;">Grand Total</span>
            <span style="font-size: 22px; font-weight: 900; color: #f2d2cf;">Rs. ${order.totalAmount?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #f2d2cf; padding-top: 20px; text-align: center;">
        <p style="font-size: 13px; font-weight: 700; color: #c9706b; margin-bottom: 4px;">Dr. Aisha Lakhwani — Products & Fertility Expert</p>
        <p style="font-size: 12px; color: #888;">Thank you for your order! We will process it shortly.</p>
        <p style="font-size: 11px; color: #bbb; margin-top: 6px;">aishalakhwani10@gmail.com</p>
      </div>

      <!-- Print Button (visible on screen, hidden on print) -->
      <div class="no-print" style="text-align: center; margin-top: 32px;">
        <button onclick="window.print()" style="padding: 12px 32px; background: linear-gradient(to right, #c9706b, #e8b4b0); color: white; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer;">
          🖨️ Print Invoice
        </button>
      </div>

    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
};
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      <div className="relative w-full max-w-lg bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 bg-gray-900/40">
          <div>
            <p className="text-sm font-bold text-gray-200">Order Details</p>
            <p className="text-xs text-gray-500 mt-0.5">#{order._id?.slice(-8).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-200 hover:bg-gray-700 p-1.5 rounded-lg transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[75vh] p-5 space-y-4">

          {/* Customer */}
          <div className="rounded-xl bg-gray-900/40 border border-gray-700/40 p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Customer</p>
            {[
              { label: 'Name',    value: order.customerName    },
              { label: 'Email',   value: order.customerEmail   },
              { label: 'Phone',   value: order.customerPhone   },
              { label: 'Address', value: order.customerAddress },
              { label: 'City',    value: order.customerCity    },
              { label: 'Note',    value: order.customerNote    },
            ].filter(f => f.value).map((f, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-gray-500 w-16 flex-shrink-0">{f.label}:</span>
                <span className="text-gray-200">{f.value}</span>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="rounded-xl bg-gray-900/40 border border-gray-700/40 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Products</p>
            <div className="space-y-2">
              {order.products?.map((p, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-gray-700/40 last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {p.product?.images?.[0] && (
                      <img src={p.product.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-gray-700"/>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm text-gray-200 font-medium truncate">{p.productName}</p>
                      {p.variation && <p className="text-xs text-gray-500">{p.variation}</p>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">×{p.quantity}</p>
                    <p className="text-sm font-bold text-emerald-400">Rs. {p.subtotal?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total + Status */}
          <div className="rounded-xl bg-gray-900/40 border border-gray-700/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Amount</span>
              <span className="text-lg font-black text-emerald-400">Rs. {order.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Order Status</span>
              <OrderStatusBadge status={order.orderStatus} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Payment</span>
              <PaymentBadge status={order.paymentStatus} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Method</span>
              <span className="text-sm text-gray-200 capitalize">{order.paymentMethod?.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Date</span>
              <span className="text-sm text-gray-200">
                {new Date(order.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

        </div>

        <div className="px-5 py-3 border-t border-gray-700 bg-gray-900/30 flex gap-3">
  <button onClick={onClose}
    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
    Close
  </button>

  {/* ✅ Print Button */}
  <button onClick={handlePrint}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600 transition-all border border-gray-600">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/>
    </svg>
    Print Invoice
  </button>
</div>
      </div>
    </div>,
    document.body
  );
};

// ── Delete Modal ──────────────────────────────────────────────────────────────
const DeleteModal = ({ order, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${BASE}/api/deleteOrder/${order._id}`);
      onDeleted();
      onClose();
    } catch { onClose(); }
    finally { setLoading(false); }
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div className="relative w-full max-w-sm bg-gray-800 border border-red-500/40 rounded-2xl shadow-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Delete Order?</h3>
            <p className="text-xs text-gray-500 mt-0.5">This action can't be undo</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">#{order._id?.slice(-8).toUpperCase()}</span> — <span className="text-gray-300">{order.customerName}</span> Are you sure you want to delete this?.
        </p>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-400 hover:to-rose-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : 'Delete'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Main ManageOrders ─────────────────────────────────────────────────────────
const ManageOrders = () => {
  const [orders,       setOrders]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [filter,       setFilter]       = useState('all');
  const [editTarget,   setEditTarget]   = useState(null);
  const [delTarget,    setDelTarget]    = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);
  const [toast,        setToast]        = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/getAllOrders`);
      setOrders(res.data.orders || []);
    } catch { setOrders([]); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const counts = {
    all:        orders.length,
    pending:    orders.filter(o => o.orderStatus === 'pending').length,
    confirmed:  orders.filter(o => o.orderStatus === 'confirmed').length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    shipped:    orders.filter(o => o.orderStatus === 'shipped').length,
    delivered:  orders.filter(o => o.orderStatus === 'delivered').length,
    cancelled:  orders.filter(o => o.orderStatus === 'cancelled').length,
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.orderStatus === filter);

  const filterTabs = [
    { key: 'all',        label: 'All',        active: 'text-gray-200    border-gray-500    bg-gray-700/50'    },
    { key: 'pending',    label: 'Pending',    active: 'text-amber-400   border-amber-500   bg-amber-500/10'   },
    { key: 'confirmed',  label: 'Confirmed',  active: 'text-blue-400    border-blue-500    bg-blue-500/10'    },
    { key: 'processing', label: 'Processing', active: 'text-violet-400  border-violet-500  bg-violet-500/10'  },
    { key: 'shipped',    label: 'Shipped',    active: 'text-cyan-400    border-cyan-500    bg-cyan-500/10'    },
    { key: 'delivered',  label: 'Delivered',  active: 'text-emerald-400 border-emerald-500 bg-emerald-500/10' },
    { key: 'cancelled',  label: 'Cancelled',  active: 'text-red-400     border-red-500     bg-red-500/10'     },
  ];

  return (
    <div className="w-full">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 shadow-xl">
          ✓ {toast}
        </div>
      )}

      {/* Filter + Refresh */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {filterTabs.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150
                ${filter === tab.key ? tab.active : 'text-gray-400 border-gray-600 bg-gray-800/60 hover:border-gray-500 hover:text-gray-200'}`}>
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${filter === tab.key ? 'bg-white/10' : 'bg-gray-700 text-gray-400'}`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>
        <button onClick={fetchOrders}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-200 transition-colors flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg className="w-6 h-6 animate-spin text-violet-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-600 text-sm">Koi order nahi mila</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/60 bg-gray-900/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Products</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Payment</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr key={order._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-150">

                  {/* # */}
                  <td className="px-4 py-3">
                    <p className="text-gray-600 text-xs">#{order._id?.slice(-6).toUpperCase()}</p>
                    <p className="text-gray-600 text-xs mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                        {order.customerName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-200 font-medium text-xs truncate">{order.customerName}</p>
                        <p className="text-gray-600 text-xs truncate hidden sm:block">{order.customerPhone}</p>
                      </div>
                    </div>
                  </td>

                  {/* Products */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="space-y-0.5">
                      {order.products?.slice(0, 2).map((p, pi) => (
                        <p key={pi} className="text-gray-400 text-xs truncate max-w-[160px]">
                          {p.productName} {p.variation ? `(${p.variation})` : ''} ×{p.quantity}
                        </p>
                      ))}
                      {order.products?.length > 2 && (
                        <p className="text-gray-600 text-xs">+{order.products.length - 2} more</p>
                      )}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-emerald-400 font-bold text-xs">
                      Rs. {order.totalAmount?.toLocaleString()}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <OrderStatusBadge status={order.orderStatus} />
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <PaymentBadge status={order.paymentStatus} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View */}
                      <button onClick={() => setDetailTarget(order)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-700/50 border border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        View
                      </button>
                      {/* Edit */}
                      <button onClick={() => setEditTarget(order)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-violet-500/10 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
                        </svg>
                        Edit
                      </button>
                      {/* Delete */}
                      <button onClick={() => setDelTarget(order)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {detailTarget && <DetailModal order={detailTarget} onClose={() => setDetailTarget(null)} />}
      {editTarget   && <EditModal   order={editTarget}   onClose={() => setEditTarget(null)}   onUpdated={() => { fetchOrders(); showToast('Order updated!'); }} />}
      {delTarget    && <DeleteModal order={delTarget}    onClose={() => setDelTarget(null)}     onDeleted={() => { fetchOrders(); showToast('Order deleted!'); }} />}

    </div>
  );
};

export default ManageOrders;