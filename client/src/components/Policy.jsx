import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'

const Policy = () => {
  return (
    <>
    <Navbar />
 <div className="bg-blue-50">
     {/* Hero Section */}
<section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="text-5xl font-semibold mb-4 animate-slide-in-up">Privacy Policy</h1>
  <p className="text-lg max-w-2xl mb-6 animate-slide-in-down">We are a passionate team dedicated to delivering high-quality solutions for our customers. Our innovative approach and commitment to excellence make us stand out in the industry.</p>
</section>
<div className='p-8 dark:bg-gray-600 dark:text-white duration-200'>
  <h2>lorem ipsum dolor sit amet</h2>
</div>
</div>
      <Footer/>
    </>
  )
}

export default Policy
