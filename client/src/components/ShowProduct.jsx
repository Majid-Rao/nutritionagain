import React, { useEffect, useState } from 'react';
import { useParams, Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { useCart } from '../contexts/CartContext.jsx';
const BASE = import.meta.env.VITE_BACKEND_API;
// ── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 'sm', interactive = false, onChange }) => {
  const [hover, setHover] = useState(0);

  const s =
    size === 'lg'
      ? 'w-6 h-6'
      : size === 'md'
      ? 'w-5 h-5'
      : 'w-4 h-4';

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${s} transition-colors duration-200 ${
            interactive ? 'cursor-pointer hover:scale-110' : ''
          } ${
            star <= (hover || rating)
              ? 'text-amber-400'
              : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
};

// ── Image Gallery ─────────────────────────────────────────────────────────────
const ImageGallery = ({ images }) => {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (!images?.length) {
    return (
      <div
        className="w-full rounded-3xl flex items-center justify-center"
        style={{ background: '#fff5f5', aspectRatio: '1/1' }}
      >
        <svg
          className="w-24 h-24"
          style={{ color: '#f2d2cf' }}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Main Image */}
      <div
        className="relative w-full overflow-hidden rounded-3xl group"
        style={{ background: '#fff5f5', aspectRatio: '1/1' }}
      >
        <img
          src={images[active]}
          alt="product"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105 cursor-zoom-in"
          onClick={() => setZoom(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />

        {/* Zoom badge */}
        <div
          className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
          style={{
            background: 'rgba(255,255,255,0.85)',
            color: '#c9706b',
          }}
        >
          🔍 Zoom
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive(
                  (prev) => (prev - 1 + images.length) % images.length
                );
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-xl font-bold text-[#c9706b] hover:scale-110 transition"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-xl font-bold text-[#c9706b] hover:scale-110 transition"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                active === i
                  ? 'scale-105 shadow-md border-[#c9706b]'
                  : 'opacity-70 border-[#f2d2cf]'
              }`}
              style={{ width: 78, height: 78 }}
            >
              <img
                src={img}
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {zoom && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <img
            src={images[active]}
            alt="zoom"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />

          {/* Close */}
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl flex items-center justify-center"
            onClick={() => setZoom(false)}
          >
            ×
          </button>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(
                    (prev) => (prev - 1 + images.length) % images.length
                  );
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white text-3xl flex items-center justify-center"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white text-3xl flex items-center justify-center"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ── Review Card ───────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => {
  return (
    <div
      className="bg-white border rounded-3xl p-5 hover:shadow-lg transition-all duration-300"
      style={{ borderColor: '#f2d2cf' }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{
            background: 'linear-gradient(135deg, #c9706b, #e8b4b0)',
          }}
        >
          {review.customerName?.charAt(0)?.toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-gray-800 text-sm">
              {review.customerName}
            </h4>

            <span className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString('en-PK', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <StarRating rating={review.rating} />
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

// ── Add Review Form ───────────────────────────────────────────────────────────
const AddReviewForm = ({ productId, onSubmitted }) => {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    rating: 0,
    comment: '',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const inputClass =
    'w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#f2d2cf]';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating) {
      setMsg({
        type: 'error',
        text: 'Please select rating',
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${BASE}/api/addReview`, {
        ...form,
        product: productId,
      });

      setMsg({
        type: 'success',
        text: 'Review submitted successfully',
      });

      setForm({
        customerName: '',
        customerEmail: '',
        rating: 0,
        comment: '',
      });

      onSubmitted?.();
    } catch (err) {
      setMsg({
        type: 'error',
        text:
          err.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {msg && (
        <div
          className={`p-4 rounded-2xl text-sm font-medium border ${
            msg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-red-50 border-red-200 text-red-600'
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Name *
          </label>

          <input
            type="text"
            required
            value={form.customerName}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                customerName: e.target.value,
              }))
            }
            placeholder="Your name"
            className={inputClass}
            style={{ borderColor: '#f2d2cf' }}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Email *
          </label>

          <input
            type="email"
            required
            value={form.customerEmail}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                customerEmail: e.target.value,
              }))
            }
            placeholder="your@email.com"
            className={inputClass}
            style={{ borderColor: '#f2d2cf' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Rating *
        </label>

        <div className="flex items-center gap-3">
          <StarRating
            rating={form.rating}
            size="lg"
            interactive
            onChange={(r) =>
              setForm((prev) => ({
                ...prev,
                rating: r,
              }))
            }
          />

          <span className="text-sm text-gray-400">
            {form.rating
              ? ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][
                  form.rating
                ]
              : 'Select rating'}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Review *
        </label>

        <textarea
          required
          rows={5}
          value={form.comment}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              comment: e.target.value,
            }))
          }
          placeholder="Share your experience..."
          className={`${inputClass} resize-none`}
          style={{ borderColor: '#f2d2cf' }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-2xl text-white font-bold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
        style={{
          background:
            'linear-gradient(to right, #c9706b, #e8b4b0)',
        }}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const ShowProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selVar, setSelVar] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');
  const [toast, setToast] = useState(false);

const showToast = () => {
  setToast(true);
  setTimeout(() => setToast(false), 3000);
};
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE}/api/getSingleProduct/${id}`
      );

      const p = res.data.product;

      setProduct(p);

      if (p.variations?.length > 0) {
        setSelVar(p.variations[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `${BASE}/api/getApprovedReviews/${id}`
      );

      setReviews(res.data.reviews || []);
    } catch {
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    window.scrollTo(0, 0);
  }, [id]);

  const price = selVar
    ? selVar.price
    : product?.basePrice || 0;

  const avgRating = reviews.length
    ? (
        reviews.reduce((acc, item) => acc + item.rating, 0) /
        reviews.length
      ).toFixed(1)
    : null;

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: '#fff5f5' }}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-4 animate-spin"
              style={{
                borderColor: '#f2d2cf',
                borderTopColor: '#c9706b',
              }}
            />

            <p className="text-sm text-[#c9706b]">
              Loading product...
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Product not found</p>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div
        className="border-b py-4 px-4"
        style={{
          background: '#fff5f5',
          borderColor: '#f2d2cf',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-400">

          <Link to="/" className="hover:text-[#c9706b] transition">
            Home
          </Link>

          <span>/</span>

          <Link
            to="/products"
            className="hover:text-[#c9706b] transition"
          >
            Products
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#c9706b] truncate">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main */}
      <section
        className="py-10 px-4"
        style={{
          background:
            'linear-gradient(to bottom, #fff5f5, #ffffff)',
        }}
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT */}
            <div className="lg:sticky lg:top-6">
              <ImageGallery images={product.images} />
            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">

                {product.category?.name && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold border"
                    style={{
                      borderColor: '#f2d2cf',
                      background: '#fff',
                      color: '#c9706b',
                    }}
                  >
                    {product.category.name}
                  </span>
                )}

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black text-white">
                  ✓ In Stock
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">

                {avgRating ? (
                  <>
                    <StarRating
                      rating={Math.round(avgRating)}
                      size="md"
                    />

                    <span className="font-bold text-gray-700">
                      {avgRating}
                    </span>

                    <span className="text-gray-400 text-sm">
                      ({reviews.length} reviews)
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm">
                    No reviews yet
                  </span>
                )}
              </div>

              {/* Short Detail */}
              {product.shortDetail && (
                <div
                  className="border-l-4 pl-4 text-gray-600 leading-relaxed"
                  style={{ borderColor: '#c9706b' }}
                >
                  {product.shortDetail}
                </div>
              )}

              <div
                className="h-px"
                style={{ background: '#f2d2cf' }}
              />

              {/* Variants */}
              {product.variations?.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Select Variant
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {product.variations.map((v, i) => {
                      const active =
                        selVar?.variation?.name ===
                        v?.variation?.name;

                      return (
                        <button
                          key={i}
                          onClick={() => setSelVar(v)}
                          className="px-5 py-2.5 rounded-2xl border font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                          style={
                            active
                              ? {
                                  background: '#c9706b',
                                  borderColor: '#c9706b',
                                  color: '#fff',
                                  boxShadow:
                                    '0 8px 20px rgba(201,112,107,0.25)',
                                }
                              : {
                                  background: '#fff',
                                  borderColor: '#f2d2cf',
                                  color: '#374151',
                                }
                          }
                        >
                          {v.variation?.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price */}
              <div>
                <p className="text-4xl font-black text-[#c9706b]">
                  Rs. {price.toLocaleString()}
                </p>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Quantity
                </p>

                <div className="flex items-center gap-4 flex-wrap">

                  <div
                    className="flex items-center rounded-2xl border overflow-hidden"
                    style={{ borderColor: '#f2d2cf' }}
                  >
                    <button
                      onClick={() =>
                        setQty((prev) => Math.max(1, prev - 1))
                      }
                      className="w-11 h-11 text-lg font-bold text-gray-700 hover:bg-[#fff5f5] transition"
                    >
                      −
                    </button>

                    <div className="w-14 text-center font-bold text-gray-800">
                      {qty}
                    </div>

                    <button
                      onClick={() =>
                        setQty((prev) => prev + 1)
                      }
                      className="w-11 h-11 text-lg font-bold text-gray-700 hover:bg-[#fff5f5] transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    Total:{' '}
                    <span className="font-bold text-[#c9706b]">
                      Rs. {(price * qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <button
  onClick={() => {
    addToCart({
      _id: product._id,
      name: product.name,
      image: product.images?.[0],
      price,
      qty,
      variant: selVar?.variation?.name || null,
      category: product.category?.name || '',
    });
    showToast(); // ✅ toast trigger
  }}
  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
  style={{
    background: 'linear-gradient(to right, #c9706b, #e8b4b0)',
    boxShadow: '0 4px 20px rgba(201,112,107,0.3)',
  }}
>
  🛒 Add to Cart
</button>

              <button
  onClick={() => {
    // Cart mein add karo
    addToCart({
      _id: product._id,
      name: product.name,
      image: product.images?.[0],
      price,
      qty,
      variant: selVar?.variation?.name || null,
      category: product.category?.name || '',
    });
    // Direct checkout pe bhejo
    navigate('/ecom-order');
  }}
  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5 border-2"
  style={{ borderColor: '#c9706b', color: '#c9706b', background: '#fff' }}
>
  ⚡ Buy Now
</button>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3">

                {[
                  {
                    icon: '🔒',
                    text: 'Secure Order',
                  },
                  {
                    icon: '✅',
                    text: 'Authentic',
                  },
                  {
                    icon: '💬',
                    text: 'Support',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border text-center"
                    style={{
                      borderColor: '#f2d2cf',
                      background: '#fff5f5',
                    }}
                  >
                    <div className="text-2xl mb-1">
                      {item.icon}
                    </div>

                    <div className="text-xs font-medium text-gray-600">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4 bg-white">

        <div className="max-w-7xl mx-auto">

          {/* Tab Buttons */}
          <div
            className="inline-flex p-1 rounded-2xl border mb-10"
            style={{
              borderColor: '#f2d2cf',
              background: '#fff5f5',
            }}
          >
            {[
              {
                key: 'details',
                label: '📋 Product Details',
              },
              {
                key: 'reviews',
                label: `⭐ Reviews (${reviews.length})`,
              },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={
                  tab === t.key
                    ? {
                        background: '#c9706b',
                        color: '#fff',
                      }
                    : {
                        color: '#6b7280',
                      }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Details */}
          {tab === 'details' && (
            <div className="max-w-4xl animate-[fadeUp_.3s_ease-out]">

              {product.longDetail ? (
                <div
                  className="p-6 rounded-3xl border whitespace-pre-line leading-loose text-gray-700"
                  style={{
                    borderColor: '#f2d2cf',
                    background: '#fff5f5',
                  }}
                >
                  {product.longDetail}
                </div>
              ) : (
                <p className="text-gray-400">
                  No detailed description available.
                </p>
              )}
            </div>
          )}

          {/* Reviews */}
          {tab === 'reviews' && (
            <div className="space-y-10 animate-[fadeUp_.3s_ease-out]">

              {/* Summary */}
              {reviews.length > 0 && (
                <div
                  className="p-6 rounded-3xl border flex flex-col md:flex-row gap-8 items-center"
                  style={{
                    borderColor: '#f2d2cf',
                    background: '#fff5f5',
                  }}
                >
                  <div className="text-center">
                    <div className="text-5xl font-black text-[#c9706b]">
                      {avgRating}
                    </div>

                    <StarRating
                      rating={Math.round(avgRating)}
                      size="md"
                    />

                    <p className="text-xs text-gray-400 mt-1">
                      {reviews.length} reviews
                    </p>
                  </div>

                  <div className="flex-1 w-full space-y-2">

                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter(
                        (r) => r.rating === star
                      ).length;

                      const pct = reviews.length
                        ? (count / reviews.length) * 100
                        : 0;

                      return (
                        <div
                          key={star}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 text-sm text-gray-600">
                            {star}
                          </div>

                          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${pct}%`,
                                background: '#c9706b',
                              }}
                            />
                          </div>

                          <div className="w-5 text-xs text-gray-500 text-right">
                            {count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {reviews.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">💬</div>

                  <h3 className="font-bold text-gray-700">
                    No reviews yet
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Be the first to review this product
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {reviews.map((r, i) => (
                    <ReviewCard key={i} review={r} />
                  ))}
                </div>
              )}

              {/* Form */}
              <div
                className="border rounded-3xl p-6 md:p-8"
                style={{ borderColor: '#f2d2cf' }}
              >
                <div className="flex items-center gap-3 mb-6">

                  <div
                    className="w-1 h-10 rounded-full"
                    style={{ background: '#c9706b' }}
                  />

                  <div>
                    <h3 className="text-xl font-black text-gray-800">
                      Write a Review
                    </h3>

                    <p className="text-sm text-gray-400">
                      Share your experience
                    </p>
                  </div>
                </div>

                <AddReviewForm
                  productId={id}
                  onSubmitted={fetchReviews}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 px-4 text-center text-white"
        style={{
          background:
            'linear-gradient(135deg, #1a1a1a, #2d2020)',
        }}
      >
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Need Help Choosing The Right Product?
          </h2>

          <p
            className="text-sm md:text-base mb-7"
            style={{
              color: 'rgba(242,210,207,0.75)',
            }}
          >
            Our expert team is here to guide you personally.
          </p>

          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:-translate-y-0.5 transition-all"
            style={{
              background:
                'linear-gradient(to right, #f2d2cf, #e8b4b0)',
              color: '#7a3533',
            }}
          >
            💬 Book Free Consultation
          </a>
        </div>
      </section>
{/* ── Cart Toast Notification ── */}
{toast && (
  <div
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl"
    style={{
      background: 'linear-gradient(135deg, #1a1a1a, #2d2020)',
      animation: 'slideInRight 0.3s ease-out',
    }}
  >
    {/* Product image */}
    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border-2" style={{ borderColor: '#c9706b' }}>
      {product.images?.[0] ? (
        <img src={product.images[0]} alt="" className="w-full h-full object-cover"/>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-lg" style={{ background: '#fff5f5' }}>📦</div>
      )}
    </div>

    {/* Text */}
    <div>
      <p className="text-white font-bold text-sm">Added to Cart! 🛒</p>
      <p className="text-xs mt-0.5" style={{ color: 'rgba(242,210,207,0.7)' }}>
        {product.name} {selVar?.variation?.name ? `(${selVar.variation.name})` : ''} × {qty}
      </p>
    </div>

    {/* View Cart */}
    <button
      onClick={() => navigate('/cart')}
      className="ml-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 flex-shrink-0"
      style={{ background: '#c9706b', color: '#fff' }}
    >
      View Cart
    </button>

    {/* Close */}
    <button
      onClick={() => setToast(false)}
      className="text-gray-500 hover:text-gray-200 transition-colors flex-shrink-0"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
)}
      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Footer />
    </>
  );
};

export default ShowProduct;