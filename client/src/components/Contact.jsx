import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { FaPhoneVolume } from "react-icons/fa6";
import { MdLocationOn,MdOutlineMail} from "react-icons/md";
const features = [
  {
    icon: <MdLocationOn  className="text-primary text-4xl mb-3" size={45} />,
    title: "Address",
    desc: "All our produce is grown without harmful chemicals or pesticides.",
  },
  {
    icon: <MdOutlineMail  className="text-primary text-4xl mb-3" size={45} />,
    title: "Email",
    desc: "We deliver fresh produce at your doorstep within hours of harvesting.",
  },
  {
    icon: <FaPhoneVolume  className="text-primary text-4xl mb-3" size={45} />,
    title: "Phone",
    desc: "Empowering local farmers with fair trade and sustainable practices.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can use an API to send the form data to your server
    setFormSubmitted(true);
  };

  return (
    <>
    <Navbar />
      {/* Hero Section */}
<section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="text-5xl font-semibold mb-4 animate-slide-in-up">Contact Us</h1>
  <p className="text-lg max-w-2xl mb-6 animate-slide-in-down">We are a passionate team dedicated to delivering high-quality solutions for our customers. Our innovative approach and commitment to excellence make us stand out in the industry.</p>
  </section>
     <section className="bg-white py-14 px-5 lg:px-14 text-center dark:bg-gray-900 dark:text-white duration-200">
      <h2 className="text-3xl font-bold mb-10  dark:text-white duration-200 text-ternary">Our Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-xl animate-slide-in-right shadow-md hover:shadow-xl transition duration-300 dark:bg-gray-700 dark:text-white ">
            <div className="flex justify-center text-4xl text-ternary mb-3  animate-pulse">
              {feature.icon}
            </div>
            <h3 className="text-xl dark:text-white font-semibold mb-2 text-gray-700">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-white text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
    {/* <div className="min-h-screen p-6 bg-blue-50 pt-8 dark:bg-gray-900 text-white duration-200">
      <div className="container mx-auto">
        <section className="md:flex md:justify-between md:space-x-8 ">
          <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl animate-slide-in-left ">
            <h3 className="text-2xl font-semibold text-black mb-4">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-black">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  rows="5"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ternary text-white py-3 rounded-lg text-lg hover:bg-primary hover:text-black transition-colors duration-300"
              >
                Send Message
              </button>
            </form>

            {formSubmitted && (
              <div className="mt-4 text-green-600">Thank you for reaching out to us! We will get back to you soon.</div>
            )}
          </div>
        </section>
      </div>
    </div> */}
    <Footer/>
    </>
  );
};

export default Contact;
