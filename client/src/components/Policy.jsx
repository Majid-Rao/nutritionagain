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
    <h1 className="sm:text-5xl text-3xl font-semibold mb-4 animate-slide-in-up">Privacy Policy</h1>
    <p className="sm:text-lg text-md max-w-2xl mb-6 animate-slide-in-down">When you Reach Dr. Aisha Lakhwani, your trust means everything to us. This Privacy Policy is here to let you know, in simple words, how we treat your personal and health information when you use our website https://www.aishalakhwani.com/.
  </p>
  </section>
  <div className='p-8 dark:bg-gray-600 dark:text-white duration-200'>
    <h2 className='sm:text-2xl text-xl mb-4' >The Information We Collect To serve you better, we may ask for details like:</h2>
    <p className='text-md mb-4'>Your name, email, or phone number (for appointments, newsletters, or inquiries).
  Some health or nutrition information you share when signing up for a personalized plan.
  </p>
  <p className='text-md mb-4'>Basic website usage data (like device type or pages visited) to help us improve the site.

  </p>
    <h2 className='sm:text-2xl text-xl mb-4' >How We Use It?</h2>
    <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>Your information helps us:</li>
      <li>Book and manage your appointments.</li>
      <li>Personalize plans for your needs.</li>
      <li>Share helpful health content and updates (only if you choose to receive them).</li>
      <li>Keep our website running smoothly and easy to use.</li>
    </ol>
     <h2 className='sm:text-2xl text-xl mb-4' >Payment Policy</h2>
    <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li><b>No Refund Policy-</b> Please note that all program fees are non-refundable once payment has been made.</li>
      <li><b>Accepted Payment Method-</b> Payments can be made conveniently through bank transfer.</li>
      <li><b>Mandatory Consultation Form-</b> To begin your fertility journey with us, you must first complete the consultation form. This allows our team to review your case and guide you toward the right program.</li>

    </ol>
    <h2 className='sm:text-2xl text-xl mb-4' >How We Protect Your Privacy?</h2>
  <p className='text-md mb-4'>We treat your information with care and confidentiality. We never sell your data. Your details are only shared with trusted services like secure payment providers, or if we are legally required to do so.
  </p>
    <h2 className='sm:text-2xl text-xl mb-4' >Cookies</h2>
  <p className='text-md mb-4'>Like most websites, we use cookies (small files stored on your device) to understand what works best for our visitors. You can disable cookies in your browser anytime.
  </p>
    <h2 className='sm:text-2xl text-xl mb-4' >Your Choices</h2>
  <ol className='list-disc list-inside space-y-2 text-md mb-4'>
      <li>You are always in control. You can:</li>
      <li>Ask us to update or delete your information.</li>
      <li>Unsubscribe from emails with one click.</li>
      <li>Reach out if you’d like to know what information we hold about you.</li>
    </ol>
    <h2 className='sm:text-2xl text-xl mb-4' >Links to Other Websites</h2>
  <p className='text-md mb-4'>Sometimes we share helpful resources or links. Please note, we’re not responsible for the privacy practices of other sites.
  </p>
  <h2 className='sm:text-2xl text-xl mb-4' >Updates to This Policy</h2>
  <p className='text-md mb-4'>We may refresh this policy from time to time. Any important changes will always be posted here.
  </p>
  <h2 className='sm:text-2xl text-xl mb-4' >Talk to Us</h2>
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

  export default Policy
