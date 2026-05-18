// ViewProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';

const BASE = import.meta.env.VITE_BACKEND_API;

// ── Edit Modal ────────────────────────────────────────────────────────────────
const EditModal = ({ product, categories, variations, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name:        product.name        || '',
    shortDetail: product.shortDetail || '',
    longDetail:  product.longDetail  || '',
    basePrice:   product.basePrice   || '',
    category:    product.category?._id || product.category || '',
  });
  const [varRows,  setVarRows]  = useState(
    product.variations?.map(v => ({
      variationId: v.variation?._id || v.variation || '',
      price:       v.price  || '',
    })) || []
  );
  const [images,   setImages]   = useState([]);
  const [previews, setPreviews] = useState(product.images || []);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');

  const handleField = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleImages = e => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const addVarRow    = () => setVarRows(p => [...p, { variationId: '', price: '', }]);
  const removeVarRow = i  => setVarRows(p => p.filter((_, idx) => idx !== i));
  const updateVarRow = (i, field, val) =>
    setVarRows(p => p.map((r, idx) => idx === i ? { ...r, [field]: val } : r));

  const selectedVarIds = varRows.map(r => r.variationId);

  const handleSave = async () => {
    setLoading(true);
    setErr('');
    try {
      const formData = new FormData();
      formData.append('name',        form.name);
      formData.append('shortDetail', form.shortDetail);
      formData.append('longDetail',  form.longDetail);
      formData.append('basePrice',   form.basePrice || 0);
      formData.append('category',    form.category);
      const variationsPayload = varRows
        .filter(r => r.variationId)
        .map(r => ({ variation: r.variationId, price: Number(r.price),  }));
      formData.append('variations', JSON.stringify(variationsPayload));
      images.forEach(img => formData.append('images', img));

      await axios.patch(`${BASE}/api/editProduct/${product._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUpdated();
      onClose();
    } catch (e) {
      setErr(e.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      <div className="relative w-full max-w-xl bg-gray-800 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 bg-emerald-500/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Edit Product</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-200 hover:bg-gray-700 p-1.5 rounded-lg transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto max-h-[75vh] p-5 space-y-4">

          {err && (
            <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{err}</div>
          )}

          {/* Basic Info */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Basic Info</p>

            <input type="text" name="name" value={form.name} onChange={handleField}
              placeholder="Product Name"
              className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"/>

            <input type="text" name="shortDetail" value={form.shortDetail} onChange={handleField}
              placeholder="Short Detail"
              className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all"/>

            <textarea name="longDetail" value={form.longDetail} onChange={handleField}
              placeholder="Long Detail" rows={3}
              className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all resize-none"/>

            <div className="grid grid-cols-2 gap-3">
              <select name="category" value={form.category} onChange={handleField}
                className="bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100
                  focus:outline-none focus:border-emerald-500 transition-all">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>

              <input type="number" name="basePrice" value={form.basePrice} onChange={handleField}
                placeholder="Base Price" min="0"
                className="bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                  focus:outline-none focus:border-emerald-500 transition-all"/>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Images</p>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-700
              cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
              </svg>
              New images select karo (purani replace ho jaayengi)
              <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden"/>
            </label>
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-gray-700">
                    <img src={src} alt="" className="w-full h-full object-cover"/>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variations */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Variations</p>
              <button type="button" onClick={addVarRow}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium
                  bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Add
              </button>
            </div>

            {varRows.length === 0 ? (
              <p className="text-center text-gray-600 text-xs py-3">Koi variation nahi</p>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 px-1">
                  <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wider">Variation</p>
                  <p className="col-span-3 text-xs text-gray-600 uppercase tracking-wider">Price</p>
                  <p className="col-span-1"/>
                </div>
                {varRows.map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <select value={row.variationId} onChange={e => updateVarRow(i, 'variationId', e.target.value)}
                      className="col-span-5 bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-100
                        focus:outline-none focus:border-emerald-500 transition-all">
                      <option value="">Select</option>
                      {variations.map(v => (
                        <option key={v._id} value={v._id}
                          disabled={selectedVarIds.includes(v._id) && row.variationId !== v._id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                    <input type="number" min="0" value={row.price} placeholder="0"
                      onChange={e => updateVarRow(i, 'price', e.target.value)}
                      className="col-span-3 bg-gray-900/60 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-100 placeholder-gray-600
                        focus:outline-none focus:border-emerald-500 transition-all"/>
                    <button type="button" onClick={() => removeVarRow(i)}
                      className="col-span-1 flex items-center justify-center w-7 h-7 rounded-lg
                        bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-700 bg-gray-900/30 flex gap-3">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700
              text-gray-400 hover:text-white hover:border-gray-500 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-emerald-500 to-green-600 text-white
              hover:from-emerald-400 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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

// ── Delete Modal ──────────────────────────────────────────────────────────────
const DeleteModal = ({ product, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${BASE}/api/deleteProduct/${product._id}`);
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
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Delete Product?</h3>
            <p className="text-xs text-gray-500 mt-0.5">Yeh action undo nahi ho sakta</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">"{product.name}"</span> permanently delete ho jaayega.
        </p>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700
              text-gray-400 hover:text-white hover:border-gray-500 transition-all">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-400 hover:to-rose-500
              transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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

// ── Main ViewProducts ─────────────────────────────────────────────────────────
const ViewProducts = () => {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [variations,  setVariations]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [editTarget,  setEditTarget]  = useState(null);
  const [delTarget,   setDelTarget]   = useState(null);
  const [toast,       setToast]       = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, vRes] = await Promise.all([
        axios.get(`${BASE}/api/getAllProducts`),
        axios.get(`${BASE}/api/getAllCategories`),
        axios.get(`${BASE}/api/getAllVariations`),
      ]);
      setProducts(pRes.data.products   || []);
      setCategories(cRes.data.categories || []);
      setVariations(vRes.data.variations || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="w-full">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-sm font-medium
          bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 shadow-xl">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-xs">
          Total: <span className="text-emerald-400 font-semibold">{products.length}</span> products
        </p>
        <button onClick={fetchAll}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-200 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg className="w-6 h-6 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-600 text-sm">Koi product nahi mila</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/60 bg-gray-900/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Variations</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Price</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-150">
                  <td className="px-4 py-3 text-gray-600 text-xs">{i + 1}</td>

                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover border border-gray-700 flex-shrink-0"/>
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909"/>
                          </svg>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-gray-200 font-medium text-xs truncate max-w-[130px]">{p.name}</p>
                        <p className="text-gray-600 text-xs truncate max-w-[130px]">{p.shortDetail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2 py-1 rounded-lg text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400">
                      {p.category?.name || '—'}
                    </span>
                  </td>

                  {/* Variations */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {p.variations?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {p.variations.slice(0, 3).map((v, vi) => (
                          <span key={vi} className="px-2 py-0.5 rounded-md text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            {v.variation?.name} — Rs.{v.price}
                          </span>
                        ))}
                        {p.variations.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md text-xs bg-gray-700 text-gray-400">
                            +{p.variations.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-emerald-400 font-semibold text-xs">
                      {p.variations?.length > 0
                        ? `Rs.${Math.min(...p.variations.map(v => v.price))}+`
                        : `Rs.${p.basePrice || 0}`
                      }
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditTarget(p)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                          bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                          hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
                        </svg>
                        Edit
                      </button>
                      <button onClick={() => setDelTarget(p)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                          bg-red-500/10 border border-red-500/30 text-red-400
                          hover:bg-red-500/20 hover:border-red-500/50 transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
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
      {editTarget && (
        <EditModal
          product={editTarget}
          categories={categories}
          variations={variations}
          onClose={() => setEditTarget(null)}
          onUpdated={() => { fetchAll(); showToast('Product updated!'); }}
        />
      )}
      {delTarget && (
        <DeleteModal
          product={delTarget}
          onClose={() => setDelTarget(null)}
          onDeleted={() => { fetchAll(); showToast('Product deleted!'); }}
        />
      )}
    </div>
  );
};

export default ViewProducts;