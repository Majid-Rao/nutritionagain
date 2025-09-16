import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'

const Terms = () => {
  return (
    <>
      <Navbar />
  <div className="bg-blue-50">
      {/* Hero Section */}
  <section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
    <h1 className="sm:text-5xl text-3xl font-semibold mb-4 animate-slide-in-up">Terms & Conditions</h1>
    <p className="sm:text-lg text-md max-w-2xl mb-6 animate-slide-in-down">Welcome to our fertility care programs. By enrolling with us, you agree to the following terms and conditions.
  </p>
  </section>
  <div className='p-8 dark:bg-gray-600 dark:text-white duration-200'>
    <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >1.Enrollment & Consultation</h2>
    <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>Every client must complete the official consultation form before joining any program.</li>
      <li>Our team will review your case within 24–48 hours and contact you with the next steps.</li>
      <li>Enrollment will only be confirmed once payment has been successfully received.</li>
    </ol>
     <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >2.Payment Policy</h2>
    <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>All payments must be made in advance through <b>bank transfer</b> or other approved methods listed on our website.</li>
      <li>Program fees are fixed and non-negotiable.</li>
      <li>Enrollment is considered active only after payment confirmation.</li>

    </ol>
    <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >3.Refund Policy</h2>
  <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>No refunds will be provided once payment is made, regardless of circumstances.</li>
      <li>Clients are advised to carefully review all program details before making payment.</li>
    </ol>
     <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >4.Program Commitment</h2>
  <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>Results may vary from person to person depending on individual health conditions, medical history, and compliance with the program.</li>
      <li>Our treatments are science-backed and holistic, but we do not guarantee identical outcomes for every case.</li>
    </ol>
    <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >5.Confidentiality</h2>
  <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>All client data, including medical history and personal details, will remain strictly confidential and used only for treatment purposes.</li>
      <li>We respect your privacy and never share personal information without your consent.</li>
    </ol>
     <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >6.Disclaimer</h2>
  <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>Our programs are designed to support fertility and reproductive health using natural, research-based approaches.</li>
    </ol>
  <h2 className='sm:text-2xl text-xl mb-4 font-semibold' >Talk to Us</h2>
  <p className='text-md mb-4'>If you ever have questions about your privacy or how we handle your data, please contact us:
  </p>
  <p className='text-xl mb-4 font-semibold'> Dr. Aisha Lakhwani
  </p>
  <p className='text-md mb-4 font-semibold'>Email: aishalakhwani10@gmail.com
  </p>
  <p className='text-md mb-4 font-semibold'>Phone: +16077690051
  </p>
  <p className='text-md mb-4'>Thank you for trusting Dr. Aisha Lakhwani with your health journey. Your privacy is our priority.
  </p>
  </div>
  </div>
        <Footer/>
      </>
  )
}

export default Terms
