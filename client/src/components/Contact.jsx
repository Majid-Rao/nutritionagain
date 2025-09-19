import React, { useState,useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { FaPhoneVolume,FaTiktok  } from "react-icons/fa6";
import { MdOutlineMail} from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { Link } from 'react-router-dom';
const features = [
  {
    icon: <FaPhoneVolume  className="text-ternary text-4xl mb-3" size={45} />,
    title: "Phone",
    desc: "+160 776 90051",
  },
  {
    icon: <MdOutlineMail  className="text-ternary text-4xl mb-3" size={45} />,
    title: "Email",
    desc: "aishalakhwani10@gmail.com",
  },
  {
    icon: <RiContactsFill  className="text-ternary text-4xl mb-3" size={45} />,
    title: "Other Platforms",
    desc: (
      <>
       <Link to="https://www.facebook.com/share/176EMJgtPy/">
         <TiSocialFacebookCircular className="text-ternary text-3xl mb-3  mt-[-2px] dark:text-white" size={32} />
       </Link>
       <Link to="https://www.instagram.com/dr_aishalakhwani?igsh=MW5kY3kwZTc5N2g5MQ==">
         <LuInstagram className="text-ternary text-3xl mb-2 ml-5  dark:text-white" size={26} />
       </Link>
       <Link to="https://vt.tiktok.com/ZSDBFugBS/">
         <FaTiktok className="text-ternary text-3xl mb-2 ml-5 dark:text-white" size={26} />
       </Link>
      </>
    ),
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (event) => {
    
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        console.log('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
    <Navbar />
      {/* Hero Section */}
<section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="text-3xl sm:text-5xl font-semibold mb-4 animate-slide-in-up">Contact Us</h1>
  <p className="text-md sm:text-lg max-w-2xl mb-6 animate-slide-in-down">We are a passionate team dedicated to delivering high-quality solutions for our customers. Our innovative approach and commitment to excellence make us stand out in the industry.</p>
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
            <p className="text-gray-800 dark:text-white text-md flex justify-center font-semibold">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
   <div className="min-h-screen p-6 bg-blue-50 pt-8 dark:bg-gray-900 text-black duration-200">
        <div className="container mx-auto">
          <section className="md:flex md:justify-between md:space-x-8">
            <div className="md:w-full p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-black mb-4">Get In Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-black mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Your name"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-black mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Your email"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-black mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Your message"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ternary text-white py-2 rounded hover:bg-primary"
                >
                  Send Message
                </button>
              </form>

              {formSubmitted && (
                <div className="mt-4 text-green-600">
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    <Footer/>
    </>
  );
};

export default Contact;
