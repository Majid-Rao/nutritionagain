// AddProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE = import.meta.env.VITE_BACKEND_API;

const AddProduct = () => {
  const [categories,  setCategories]  = useState([]);
  const [variations,  setVariations]  = useState([]);
  const [images,      setImages]      = useState([]);
  const [previews,    setPreviews]    = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [msg,         setMsg]         = useState(null);

  const [form, setForm] = useState({
    name:        '',
    shortDetail: '',
    longDetail:  '',
    basePrice:   '',
    category:    '',
  });

  // variation rows — { variationId, price, }
  const [varRows, setVarRows] = useState([]);

  // ── fetch categories & variations ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, varRes] = await Promise.all([
          axios.get(`${BASE}/api/getAllCategories`),
          axios.get(`${BASE}/api/getAllVariations`),
        ]);
        setCategories(catRes.data.categories || []);
        setVariations(varRes.data.variations || []);
      } catch { /* silent */ }
    };
    fetchData();
  }, []);

  // ── form field change ──
  const handleField = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── image select ──
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  // ── variation rows ──
  const addVarRow = () => {
    setVarRows(prev => [...prev, { variationId: '', price: '', }]);
  };

  const removeVarRow = (i) => {
    setVarRows(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateVarRow = (i, field, value) => {
    setVarRows(prev => prev.map((row, idx) =>
      idx === i ? { ...row, [field]: value } : row
    ));
  };

  // ── submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const formData = new FormData();
      formData.append('name',        form.name);
      formData.append('shortDetail', form.shortDetail);
      formData.append('longDetail',  form.longDetail);
      formData.append('basePrice',   form.basePrice || 0);
      formData.append('category',    form.category);

      // variations as JSON string
      const variationsPayload = varRows
        .filter(r => r.variationId)
        .map(r => ({ variation: r.variationId, price: Number(r.price)}));
      formData.append('variations', JSON.stringify(variationsPayload));

      images.forEach(img => formData.append('images', img));

      await axios.post(`${BASE}/api/addProduct`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMsg({ type: 'success', text: 'Product added successfully!' });
      setForm({ name: '', shortDetail: '', longDetail: '', basePrice: '', category: '' });
      setVarRows([]);
      setImages([]);
      setPreviews([]);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  // ── already selected variation IDs ──
  const selectedVarIds = varRows.map(r => r.variationId);

  return (
    <div className="w-full max-w-2xl">
      <p className="text-gray-400 text-xs mb-5">
        Add New Products
      </p>

      {msg && (
        <div className={`mb-5 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border ${
          msg.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
            : 'bg-red-500/10 border-red-500/40 text-red-400'
        }`}>
          {msg.type === 'success'
            ? <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
            : <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          }
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Basic Info ── */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-4">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Basic Info</p>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text" name="name" value={form.name}
              onChange={handleField} required
              placeholder="e.g. Omega 3 Fish Oil"
              className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"
            />
          </div>

          {/* Short Detail */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Short Detail
            </label>
            <input
              type="text" name="shortDetail" value={form.shortDetail}
              onChange={handleField}
              placeholder="Brief description..."
              className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"
            />
          </div>

          {/* Long Detail */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Long Detail
            </label>
            <textarea
              name="longDetail" value={form.longDetail}
              onChange={handleField} rows={3}
              placeholder="Detailed product description..."
              className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all resize-none"
            />
          </div>

          {/* Category + Base Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category" value={form.category}
                onChange={handleField} required
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100
                  focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"
              >
                <option value="" disabled className='hover:bg-gray-900'>Select category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Base Price <span className="text-gray-600 font-normal normal-case">(no variation)</span>
              </label>
              <input
                type="number" name="basePrice" value={form.basePrice}
                onChange={handleField} min="0"
                placeholder="0"
                className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                  focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"
              />
            </div>
          </div>
        </div>

        {/* ── Images ── */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Product Images</p>

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-700
            rounded-xl py-6 px-4 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
            <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
            </svg>
            <span className="text-xs text-gray-500">Click to upload images <span className="text-emerald-400">(max 5)</span></span>
            <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
          </label>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {previews.map((src, i) => (
                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button" onClick={() => removeImage(i)}
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Variations ── */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Variations & Pricing</p>
            <button
              type="button" onClick={addVarRow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                hover:bg-emerald-500/20 transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Variation
            </button>
          </div>

          {varRows.length === 0 ? (
            <p className="text-center text-gray-600 text-xs py-4">
              If you want create variation please click on Add variation
            </p>
          ) : (
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 px-1">
                <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wider">Variation</p>
                <p className="col-span-3 text-xs text-gray-600 uppercase tracking-wider">Price</p>
                <p className="col-span-1" />
              </div>

              {varRows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  {/* Variation Select */}
                  <select
                    value={row.variationId}
                    onChange={e => updateVarRow(i, 'variationId', e.target.value)}
                    className="col-span-5 bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-100
                      focus:outline-none focus:border-emerald-500 transition-all"
                  >
                    <option value="">Select</option>
                    {variations.map(v => (
                      <option
                        key={v._id} value={v._id}
                        disabled={selectedVarIds.includes(v._id) && row.variationId !== v._id}
                      >
                        {v.name}
                      </option>
                    ))}
                  </select>

                  {/* Price */}
                  <input
                    type="number" min="0" value={row.price}
                    onChange={e => updateVarRow(i, 'price', e.target.value)}
                    placeholder="0"
                    className="col-span-3 bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-100 placeholder-gray-600
                      focus:outline-none focus:border-emerald-500 transition-all"
                  />

                 

                  {/* Remove */}
                  <button
                    type="button" onClick={() => removeVarRow(i)}
                    className="col-span-1 flex items-center justify-center w-7 h-7 rounded-lg
                      bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-emerald-500 to-green-600 text-white
            hover:from-emerald-400 hover:to-green-500 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Adding Product...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;