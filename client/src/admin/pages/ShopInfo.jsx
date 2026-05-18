import React, { useState } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";

// Placeholder components
import {AddCategory,ViewCategories,AddVariation,ViewVariations,ManageReviews,
  AddProducts,ViewProducts,ManageOrders
}from './index.js';


const accentBorder = {
  violet:  'border-violet-500',
  cyan:    'border-cyan-500',
  emerald: 'border-emerald-500',
  amber:   'border-amber-500',
  rose: 'border-rose-500'  ,

};
const accentText = {
  violet:  'text-violet-400',
  cyan:    'text-cyan-400',
  emerald: 'text-emerald-400',
  amber:   'text-amber-400',
  rose: 'text-rose-400' ,
};
const accentBg = {
  violet:  'bg-violet-500/10',
  cyan:    'bg-cyan-500/10',
  emerald: 'bg-emerald-500/10',
  amber:   'bg-amber-500/10',
  rose: 'bg-rose-500/10' ,
};

const ShopInfo = () => {
  const [activeKey, setActiveKey] = useState(null);
 const NAV = [
  {
    group: 'Categories',
    color: 'from-violet-500 to-purple-600',
    accent: 'violet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    items: [
      { label: 'Add Category',    key: 'add-category',    component: <AddCategory /> },
      { label: 'View Categories', key: 'view-categories', component: <ViewCategories /> },
    ],
  },
  {
    group: 'Variations',
    color: 'from-cyan-500 to-teal-600',
    accent: 'cyan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    items: [
      { label: 'Add Variation',   key: 'add-variation',   component: <AddVariation /> },
      { label: 'View Variations', key: 'view-variations', component: <ViewVariations /> },
    ],
  },
  {
    group: 'Products',
    color: 'from-emerald-500 to-green-600',
    accent: 'emerald',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    items: [
      { label: 'Add Product',   key: 'add-product',   component: <AddProducts /> },
      { label: 'View Products', key: 'view-products', component: <ViewProducts /> },
    ],
  },
  {
    group: 'Reviews',
    color: 'from-amber-500 to-orange-500',
    accent: 'amber',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    items: [
      { label: 'Manage Reviews', key: 'reviews', component: <ManageReviews /> },
    ],
  },
  {
  group: 'Orders',
  color: 'from-rose-500 to-pink-600',
  accent: 'rose',  // ← naya accent
  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
    </svg>
  ),
  items: [
    { label: 'Manage Orders', key: 'manage-orders', component: <ManageOrders /> },
  ],
},
];
  const activeItem  = NAV.flatMap(g => g.items).find(i => i.key === activeKey);
  const activeGroup = NAV.find(g => g.items.some(i => i.key === activeKey));

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      <Sidebar />

      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Products Information' />

        <main className='max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8'>

          {/* ── Nav Groups — horizontal groups, buttons stack vertically inside ── */}
          <div className='flex flex-wrap gap-x-12 gap-y-12 items-start'>
            {NAV.map((group) => (
              <div key={group.group} className='flex flex-col gap-2'>

                {/* group label */}
                <div className='flex items-center gap-2 mb-1'>
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${group.color} text-white`}>
                    {group.icon}
                  </div>
                  <span className='text-xs font-semibold uppercase tracking-widest text-gray-400 whitespace-nowrap'>
                    {group.group}
                  </span>
                </div>

                {/* buttons — vertical stack per group */}
                <div className='flex flex-col gap-2'>
                  {group.items.map((item) => {
                    const isActive = activeKey === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveKey(isActive ? null : item.key)}
                        className={`
                          relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                          border transition-all duration-200 whitespace-nowrap
                          ${isActive
                            ? `${accentBg[group.accent]} ${accentBorder[group.accent]} ${accentText[group.accent]} shadow-lg`
                            : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/60 hover:border-gray-500 hover:text-white'
                          }
                        `}
                      >
                        {isActive && (
                          <span className='w-1.5 h-1.5 rounded-full bg-current animate-pulse' />
                        )}
                        {item.label}
                        <svg
                          className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* ── Active Component Panel ── */}
          {activeItem && activeGroup && (
            <div
              key={activeKey}
              className={`rounded-2xl border bg-gray-800/50 backdrop-blur-sm overflow-hidden ${accentBorder[activeGroup.accent]}`}
              style={{ animation: 'fadeSlideIn 0.2s ease-out' }}
            >
              {/* panel header */}
              <div className={`flex items-center justify-between px-5 py-3.5 border-b border-gray-700/60 ${accentBg[activeGroup.accent]}`}>
                <div className='flex items-center gap-2.5'>
                  <div className={`p-1 rounded-md bg-gradient-to-br ${activeGroup.color} text-white`}>
                    {activeGroup.icon}
                  </div>
                  <span className={`font-semibold text-sm ${accentText[activeGroup.accent]}`}>
                    {activeItem.label}
                  </span>
                </div>
                <button
                  onClick={() => setActiveKey(null)}
                  className='text-gray-500 hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-gray-700/50'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* panel body */}
              <div className='p-5'>
                {activeItem.component}
              </div>
            </div>
          )}

        </main>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ShopInfo;