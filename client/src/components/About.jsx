import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import dr from '../assets/dr.webp'; 

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="bg-blue-50">
     {/* Hero Section */}
<section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="text-5xl font-semibold mb-4 animate-slide-in-up">About Us</h1>
  <p className="text-lg max-w-2xl mb-6 animate-slide-in-down">We are a passionate team dedicated to delivering high-quality solutions for our customers. Our innovative approach and commitment to excellence make us stand out in the industry.</p>
</section>

{/* Our Mission Section */}
<section className="py-16 bg-white  animation-slide-in-left relative dark:bg-gray-900 dark:text-white duration-200">
  <div className="container mx-auto px-4 flex items-center justify-between">
    <div className="w-full md:w-2/3">
      <h2 className="text-4xl font-semibold text-center mb-4 text-ternary">Our Mission</h2>
      <p className="text-lg text-center max-w-3xl mx-auto">We aim to revolutionize the way businesses operate by offering cutting-edge technology and exceptional service. Our mission is to help companies grow and thrive in an ever-evolving digital world.</p>
    </div>
    <div className="w-full md:w-1/3 flex justify-end">
      <img src={dr} alt="Mission Image" className="w-full max-w-xs md:max-w-sm animate-slide-in-right" />
    </div>
  </div>
</section>


      {/* Our Team Section */}
      <section className="py-16 bg-secondary dark:bg-gray-800 dark:text-white duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center text-black mb-8 animate-slide-in-right">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <img src="" alt="Team Member" className="w-32 h-32 mx-auto mb-4 rounded-full" />
              <h3 className="text-2xl font-semibold text-center mb-2">John Doe</h3>
              <p className="text-center text-lg text-ternary">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <img src="" alt="Team Member" className="w-32 h-32 mx-auto mb-4 rounded-full" />
              <h3 className="text-2xl font-semibold text-center mb-2">Jane Smith</h3>
              <p className="text-center text-lg text-ternary">Lead Developer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <img src="" alt="Team Member" className="w-32 h-32 mx-auto mb-4 rounded-full" />
              <h3 className="text-2xl font-semibold text-center mb-2">Alex Johnson</h3>
              <p className="text-center text-lg text-ternary">UX/UI Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white  dark:bg-gray-900 dark:text-white duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center text-ternary mb-6 animate-slide-in-left">Our Core Values</h2>
          <ul className="space-y-4 text-lg max-w-3xl mx-auto">
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Innovation is at the heart of everything we do.
            </li>
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Customer satisfaction drives our actions.
            </li>
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> We foster a culture of collaboration and creativity.
            </li>
          </ul>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-secondary text-black text-center dark:bg-gray-800 dark:text-white duration-200  ">
        <h2 className="text-4xl font-semibold mb-6 animate-slide-in-right">Get In Touch</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">We’d love to hear from you. Whether you’re interested in our services, have questions, or just want to connect, reach out to us today!</p>
        <button className="bg-white text-ternary py-2 font-bold px-6 rounded-lg hover:bg-ternary hover:text-white transition-colors duration-300">
          Contact Us
        </button>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
