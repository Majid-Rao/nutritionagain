// AddVariation.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BASE = import.meta.env.VITE_BACKEND_API;

const AddVariation = () => {
  const [name, setName]     = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]       = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setMsg(null);
    try {
      await axios.post(`${BASE}/api/addVariation`, { name });
      setMsg({ type: 'success', text: 'Variation added successfully!' });
      setName('');
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <p className="text-gray-400 text-xs mb-5">
        Add New Variations
      </p>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium border ${
          msg.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
            : 'bg-red-500/10 border-red-500/40 text-red-400'
        }`}>
          {msg.type === 'success' ? '✓ ' : '✕ '}{msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Variation Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. 5mg, 50mg, 100ml, 1kg..."
            className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600
              focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-cyan-500 to-teal-600 text-white
            hover:from-cyan-400 hover:to-teal-500 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Variation
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddVariation;