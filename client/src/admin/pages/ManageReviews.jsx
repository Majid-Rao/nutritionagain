// ManageReviews.jsx
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const BASE = import.meta.env.VITE_BACKEND_API;

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status = 'pending' }) => {
  const safeStatus = ['approved', 'pending', 'rejected'].includes(status)
    ? status
    : 'pending';

  const styles = {
    approved: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    pending: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    rejected: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  const dots = {
    approved: 'bg-emerald-400',
    pending: 'bg-amber-400',
    rejected: 'bg-red-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${styles[safeStatus]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[safeStatus]}`} />
      {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
    </span>
  );
};

// ── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating = 0 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-3 h-3 ${s <= rating ? 'text-amber-400' : 'text-gray-700'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ))}
  </div>
);

// ── Detail Modal ──────────────────────────────────────────────────────────────
const DetailModal = ({ review, onClose, onStatusChanged }) => {
  const [currentStatus, setCurrentStatus] = useState(review?.status || 'pending');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setCurrentStatus(review?.status || 'pending');
    setSuccessMsg('');
  }, [review]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!review) return null;

  const updateStatus = async (status) => {
    setLoading(true);
    setSuccessMsg('');
    try {
      await axios.patch(`${BASE}/api/updateReviewStatus/${review._id}`, { status });
      setCurrentStatus(status);
      setSuccessMsg(`Status "${status}" updated!`);
      onStatusChanged?.();
    } catch (error) {
      console.error('Status update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const customerInitial = (review.customerName || 'U').charAt(0).toUpperCase();
  const productName =
    review.product?.name ||
    review.productName ||
    review.product_title ||
    'Product info nahi mili';

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[36rem] max-h-[90vh] overflow-hidden bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col"
        style={{ animation: 'fadeSlideIn 0.18s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 bg-amber-500/5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
              Review Detail
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-200 hover:bg-gray-700 p-1.5 rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {/* Success Message */}
          {successMsg && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {successMsg}
            </div>
          )}

          {/* Customer Card */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/60 border border-gray-700/50">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              {customerInitial}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {review.customerName || 'Unknown Customer'}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">
                    {review.customerEmail || 'No email'}
                  </p>
                </div>
                <StatusBadge status={currentStatus} />
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <StarRating rating={review.rating || 0} />
                <span className="text-gray-500 text-xs">{review.rating || 0}/5</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="rounded-xl bg-gray-900/40 border border-gray-700/40 px-4 py-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              Product
            </p>
            <p className="text-gray-200 text-sm font-medium break-words">
              {productName}
            </p>
          </div>

          {/* Comment */}
          <div className="rounded-xl bg-gray-900/40 border border-gray-700/40 px-4 py-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
              Comment
            </p>
            <p className="text-gray-300 text-sm leading-relaxed break-words whitespace-pre-wrap">
              {review.comment || 'No comment provided'}
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
              />
            </svg>
            Submitted:{' '}
            {review.createdAt
              ? new Date(review.createdAt).toLocaleDateString('en-PK', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : 'N/A'}
          </div>

          {/* Status Update */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 px-4 py-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
              Update Status
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateStatus('approved')}
                disabled={loading || currentStatus === 'approved'}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 border
                  ${
                    currentStatus === 'approved'
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 cursor-not-allowed'
                      : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-400'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {currentStatus === 'approved' ? 'Approved ✓' : 'Approve'}
              </button>

              <button
                onClick={() => updateStatus('pending')}
                disabled={loading || currentStatus === 'pending'}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 border
                  ${
                    currentStatus === 'pending'
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 cursor-not-allowed'
                      : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-400'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentStatus === 'pending' ? 'Pending ✓' : 'Pending'}
              </button>

              <button
                onClick={() => updateStatus('rejected')}
                disabled={loading || currentStatus === 'rejected'}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 border
                  ${
                    currentStatus === 'rejected'
                      ? 'bg-red-500/15 border-red-500/50 text-red-400 cursor-not-allowed'
                      : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {currentStatus === 'rejected' ? 'Rejected ✓' : 'Reject'}
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Updating...
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-700 bg-gray-900/30 shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-700/40 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Delete Modal ──────────────────────────────────────────────────────────────
const DeleteModal = ({ review, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!review) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${BASE}/api/deleteReview/${review._id}`);
      onDeleted?.();
      onClose();
    } catch (error) {
      console.error('Delete failed:', error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-gray-800 border border-red-500/40 rounded-2xl shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Delete Review?</h3>
          </div>
        </div>

        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">"{review.customerName || 'Unknown'}" Review</span> Are you sure you want to delete this?.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-400 hover:to-rose-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Main ManageReviews ────────────────────────────────────────────────────────
const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [detailTarget, setDetailTarget] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [toast, setToast] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/getAllReviews`);
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error('Fetch reviews failed:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter);

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  };

  const filterTabs = [
    { key: 'all', label: 'All', active: 'text-amber-400 border-amber-500 bg-amber-500/10' },
    { key: 'pending', label: 'Pending', active: 'text-amber-400 border-amber-500 bg-amber-500/10' },
    { key: 'approved', label: 'Approved', active: 'text-emerald-400 border-emerald-500 bg-emerald-500/10' },
    { key: 'rejected', label: 'Rejected', active: 'text-red-400 border-red-500 bg-red-500/10' },
  ];

  return (
    <div className="w-full">
      {toast && (
        <div
          className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 shadow-xl"
          style={{ animation: 'fadeSlideIn 0.2s ease-out' }}
        >
          ✓ {toast}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150
                ${
                  filter === tab.key
                    ? tab.active
                    : 'text-gray-400 border-gray-600 bg-gray-800/60 hover:border-gray-500 hover:text-gray-200'
                }`}
            >
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${
                  filter === tab.key ? 'bg-white/10' : 'bg-gray-700 text-gray-400'
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={fetchReviews}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-200 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg className="w-6 h-6 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-600 text-sm">Koi review nahi mila</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/60 bg-gray-900/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Comment</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((review, i) => (
                <tr
                  key={review._id}
                  className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-gray-600 text-xs">{i + 1}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {(review.customerName || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-200 font-medium text-xs truncate">
                          {review.customerName || 'Unknown'}
                        </p>
                        <p className="text-gray-600 text-xs truncate hidden sm:block">
                          {review.customerEmail || 'No email'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <StarRating rating={review.rating || 0} />
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-gray-400 text-xs truncate max-w-[180px]">
                      {review.comment || 'No comment'}
                    </p>
                  </td>

                  <td className="px-4 py-3 hidden sm:table-cell">
                    <StatusBadge status={review.status} />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setDetailTarget(review)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-150"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        View
                      </button>

                      <button
                        onClick={() => setDelTarget(review)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-150"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
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
      {detailTarget && (
        <DetailModal
          review={detailTarget}
          onClose={() => setDetailTarget(null)}
          onStatusChanged={() => {
            fetchReviews();
            showToast('Review status updated!');
          }}
        />
      )}

      {delTarget && (
        <DeleteModal
          review={delTarget}
          onClose={() => setDelTarget(null)}
          onDeleted={() => {
            fetchReviews();
            showToast('Review deleted!');
          }}
        />
      )}
    </div>
  );
};

export default ManageReviews;