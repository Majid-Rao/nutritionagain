import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


const BASE = import.meta.env.VITE_BACKEND_API;

// ── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating = 4 }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} className={`w-3 h-3 ${s <= rating ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
      </svg>
    ))}
  </div>
);

// ── Floating Particle ─────────────────────────────────────────────────────────
const Particle = ({ style }) => (
  <div className="absolute rounded-full opacity-20 animate-pulse" style={style} />
);

// ── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [imgIdx,      setImgIdx]      = useState(0);
  const [selectedVar, setSelectedVar] = useState(
    product.variations?.length > 0 ? product.variations[0] : null
  );

  const price             = selectedVar ? selectedVar.price : product.basePrice || 0;
  const hasMultipleImages = product.images?.length > 1;

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col"
      style={{ animationDelay: `${index * 80}ms`, animation: 'fadeUp 0.6s ease-out both' }}
      onMouseLeave={() => setImgIdx(0)}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50" style={{ height: '220px' }}>
        {product.images?.length > 0 ? (
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16" style={{ color: '#f2d2cf' }} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
            </svg>
          </div>
        )}

        {/* Image dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === imgIdx ? 'w-3 bg-white' : 'w-1.5 bg-white/60'}`}/>
            ))}
          </div>
        )}

        {/* Category badge */}
        {product.category?.name && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm shadow-sm"
              style={{ color: '#c9706b' }}>
              {product.category.name}
            </span>
          </div>
        )}

        {/* Variants badge */}
        {product.variations?.length > 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
              style={{ background: '#c9706b' }}>
              {product.variations.length} variants
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">

        {/* Name + Rating */}
        <div>
          <h3 className="font-bold text-gray-800 text-base leading-tight line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={4} />
            <span className="text-xs text-gray-400">(4.0)</span>
          </div>
        </div>

        {/* Short detail */}
        {product.shortDetail && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{product.shortDetail}</p>
        )}

        {/* Variation selector */}
        {product.variations?.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1.5">Select Variant:</p>
            <div className="flex flex-wrap gap-1.5">
              {product.variations.map((v, i) => (
                <button key={i}
                  onClick={() => setSelectedVar(v)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150
                    ${selectedVar === v
                      ? 'text-white border-transparent shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600'
                    }`}
                  style={selectedVar === v ? { background: '#c9706b' } : {}}
                >
                  {v.variation?.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <p className="text-xs text-gray-400">Price</p>
          <p className="text-xl font-bold" style={{ color: '#c9706b' }}>
            Rs. {price.toLocaleString()}
          </p>
        </div>

        {/* Want to Buy Button */}
        <div
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate(`/product/${product._id}`)}
          className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold
            text-white shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          style={{ background: 'linear-gradient(to right, #c9706b, #e8b4b0)' }}
        >
            <a>
          Want to Buy
        </a>
        </div>
      </div>
    </div>
  );
};

// ── Marquee Strip ─────────────────────────────────────────────────────────────
const MarqueeStrip = ({ items }) => (
  <div className="overflow-hidden py-3" style={{ background: '#1a1a1a' }}>
    <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
      {[...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-sm font-medium flex items-center gap-2" style={{ color: '#f2d2cf' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#f2d2cf' }} />
          {item}
        </span>
      ))}
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const OurProducts = () => {
  const [products,   setProducts]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [activecat,  setActiveCat]  = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res   = await axios.get(`${BASE}/api/getAllProducts`);
        const prods = res.data.products || [];
        setProducts(prods);

        const cats = [];
        const seen = new Set();
        prods.forEach(p => {
          if (p.category?._id && !seen.has(p.category._id)) {
            seen.add(p.category._id);
            cats.push(p.category);
          }
        });
        setCategories(cats);
      } catch { setProducts([]); }
      finally  { setLoading(false); }
    };
    fetchData();
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = activecat === 'all' || p.category?._id === activecat;
    return matchSearch && matchCat;
  });

  const marqueeItems = [
    '100% Authentic Products',
    'Free Consultation',
    'Expert Recommended',
    'Safe & Effective',
    'Trusted by Thousands',
    'Premium Quality',
  ];

  const particles = Array.from({ length: 12 }, (_, i) => ({
    width:             `${Math.random() * 60 + 20}px`,
    height:            `${Math.random() * 60 + 20}px`,
    top:               `${Math.random() * 100}%`,
    left:              `${Math.random() * 100}%`,
    background:        i % 2 === 0 ? '#f2d2cf' : '#ffffff',
    animationDuration: `${Math.random() * 4 + 3}s`,
    animationDelay:    `${Math.random() * 2}s`,
  }));

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-white py-24 px-4"
        style={{ background: 'linear-gradient(135deg, #f5bcb7ff 0%, #2d2020 50%, #f2d2cf 100%)' }}>

        {/* Particles */}
        {particles.map((p, i) => <Particle key={i} style={p} />)}

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ background: 'rgba(242,210,207,0.12)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'rgba(242,210,207,0.08)', animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6 backdrop-blur-sm"
            style={{ background: 'rgba(242,210,207,0.12)', borderColor: 'rgba(242,210,207,0.25)', color: '#f2d2cf' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f2d2cf' }} />
            Dr. Aisha Lakhwani — Trusted Health Products
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight text-white">
            Our Premium
            <span className="block bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, #f2d2cf, #e8b4b0)' }}>
              Health Products
            </span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(242,210,207,0.7)' }}>
            Carefully curated, expert-recommended health supplements and wellness products.
            Each product is selected to support your journey towards better health.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
            {[
              { label: 'Products',      value: products.length || '10+' },
              { label: 'Happy Clients', value: '5000+'                  },
              { label: 'Expert Picks',  value: '100%'                   },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black" style={{ color: '#f2d2cf' }}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1440 20 1080 60 720 40C360 20 0 50 0 50L0 60Z" fill="#fff5f5"/>
          </svg>
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeStrip items={marqueeItems} />

      {/* ── Products Section ── */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(to bottom, #fff5f5, #ffffff)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Section heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-800 mb-2">All Products</h2>
            <div className="w-16 h-1 rounded-full mx-auto" style={{ background: '#c9706b' }} />
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-gray-700
                  focus:outline-none transition-all shadow-sm"
                style={{ borderColor: '#f2d2cf' }}
                onFocus={e  => e.target.style.borderColor = '#c9706b'}
                onBlur={e   => e.target.style.borderColor = '#f2d2cf'}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCat('all')}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={activecat === 'all'
                  ? { background: '#c9706b', borderColor: '#c9706b', color: '#fff' }
                  : { background: '#fff', borderColor: '#f2d2cf', color: '#6b7280' }
                }
              >
                All
              </button>
              {categories.map(cat => (
                <button key={cat._id}
                  onClick={() => setActiveCat(cat._id)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                  style={activecat === cat._id
                    ? { background: '#c9706b', borderColor: '#c9706b', color: '#fff' }
                    : { background: '#fff', borderColor: '#f2d2cf', color: '#6b7280' }
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-6">
            Showing <span className="font-semibold" style={{ color: '#c9706b' }}>{filtered.length}</span> products
          </p>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-rose-50" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-rose-50 rounded-lg w-3/4" />
                    <div className="h-3 bg-rose-50 rounded-lg w-1/2" />
                    <div className="h-8 bg-rose-50 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4" style={{ color: '#f2d2cf' }}
                fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5"/>
              </svg>
              <p className="text-lg font-medium">Koi product nahi mila</p>
              <p className="text-sm mt-1">Search ya filter change karo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Us Section ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-800 mb-2">Why Choose Us?</h2>
          <div className="w-16 h-1 rounded-full mx-auto mb-4" style={{ background: '#c9706b' }} />
          <p className="text-gray-500 text-sm mb-12 max-w-xl mx-auto">
            Dr. Aisha Lakhwani's products are handpicked with years of medical expertise
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌿', title: 'Natural Ingredients', desc: 'Pure, tested, and safe formulations'        },
              { icon: '👩‍⚕️', title: 'Expert Approved',    desc: 'Recommended by certified professionals'    },
              { icon: '🚀', title: 'Fast Results',         desc: 'Visible improvements in weeks'             },
              { icon: '💬', title: '24/7 Support',         desc: 'Always here to guide you'                  },
            ].map((item, i) => (
              <div key={i}
                className="p-6 rounded-2xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: '#f2d2cf', background: 'linear-gradient(135deg, #fff5f5, #ffffff)' }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2020 100%)' }}>
        <h2 className="text-3xl font-black mb-3 text-white">Ready to Start Your Health Journey?</h2>
        <p className="mb-8 max-w-xl mx-auto text-sm" style={{ color: 'rgba(242,210,207,0.7)' }}>
          Contact Dr. Aisha Lakhwani for a free consultation and personalized product recommendations.
        </p>
        <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(to right, #f2d2cf, #e8b4b0)', color: '#7a3533' }}
        >
          Book Free Consultation
        </a>
      </section>

      {/* ── Animations ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <Footer />
    </>
  );
};

export default OurProducts;