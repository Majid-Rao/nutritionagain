import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import one from '../assets/1.webp';

import aisha from '../assets/aisha.webp';
import { useNavigate } from 'react-router-dom';
import { BsFillPeopleFill } from "react-icons/bs";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
    <Navbar />
    <div className="bg-blue-50">
     {/* Hero Section */}
<section className="flex flex-col items-center py-16 bg-secondary text-black text-center relative animation-fade-in dark:bg-gray-700 dark:text-white duration-200">
  <h1 className="sm:text-5xl text-3xl font-semibold mb-4 animate-slide-in-up">About Us</h1>
  <h2 className="sm:text-2xl text-lg font-semibold mb-4 animate-slide-in-up">Fertility & Low AMH Expert</h2>
</section>

{/* Our Mission Section */}
<section className="py-16 bg-white animation-slide-in-left relative dark:bg-gray-900 dark:text-white duration-200">
  <div className="container sm:mx-10 px-2 flex flex-col md:flex-row justify-between items-center">
    <div className="w-full md:w-3/3 mb-8 md:mb-0">
      <h2 className="sm:text-4xl text-2xl font-semibold text-center sm:text-left mb-4 text-ternary">Who We Are</h2>
      <p className="text-md text-center sm:text-left sm:max-w-xl max-w-lg">
       Welcome! We are Dr. Aisha and Team — a passionate, purpose-driven group of professionals committed to  healthcare, research, coaching, consulting, etc. Led by Dr. Aisha, a respected expert known for her integrity, compassion, and innovative thinking, we blend expertise with empathy in everything we do.
      </p>
      <p className="text-md text-center sm:text-left sm:max-w-xl max-w-lg">
        What began as a passion for nutrition and health soon evolved into a life-changing mission. I initially worked as a clinical dietitian, helping individuals manage weight, reverse chronic conditions like diabetes, and adopt healthier lifestyles. My dedication to evidence-based practices led me to pursue further specialization in lifestyle medicine — the foundation of much of my approach today. As a mother of two wonderful children — one currently in college and the other finishing high school — I deeply understand the emotions, challenges, and hopes that come with the journey to parenthood.
        Today, I’m proud to run a thriving fertility and wellness clinic, supported by a dedicated team of 5 professionals who share my passion for transforming lives. I still remember the nervous excitement when I saw my first patient — the weight of their trust was humbling. And although I couldn’t promise perfection, I always promised commitment, honesty, and my very best. That promise still holds true today.
        Over the years, I’ve had the privilege of guiding countless couples through their fertility journeys — from despair to hope, and eventually to the miracle of new life. Each positive pregnancy test, each baby photo shared with me, is a reminder of why I do what I do.
        I’m grateful beyond words to every individual and couple who has believed in me, and in the power of my personalized fertility programs.
        I am here to remind you — hope is real, healing is possible, and your dream of parenthood is valid. Let’s walk this journey together.
      </p>
    </div>
    <div className="w-full md:w-2/3 sm:ml-32 flex justify-center md:justify-end mb-10">
      <img src={aisha} alt="Mission Image" className="w-full max-w-sm md:max-w-lg object-contain animate-slide-in-right" />
    </div>
  </div>
  {/* <div className='container mx-auto px-4  sm:pt-14 pt-16 text-center'>
    <button className="bg-ternary text-black py-2 font-bold px-6 rounded-lg hover:bg-ternary hover:text-white transition-colors duration-300"
        onClick={() => navigate('/consult')}>
          Contact Us
        </button>
  </div> */}
</section>
      {/* Our Team Section */}
      <section className="py-6 sm:py-16 bg-secondary dark:bg-gray-800 dark:text-white duration-200">
        <div className="container mx-auto px-4">
          <h2 className="sm:text-4xl text-3xl font-semibold text-center text-black mb-8 animate-slide-in-right">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <BsFillPeopleFill  className="mx-auto *:text-ternary mb-8" size={45}/>
              <h3 className="text-2xl font-semibold text-center mb-2">DR AISHA LAKHWANI</h3>
              <p className="text-center text-lg text-ternary">CEO & FOUNDER</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
             <BsFillPeopleFill  className="mx-auto *:text-ternary mb-8" size={45}/> 
              <h3 className="text-2xl font-semibold text-center mb-2">MR TALAL</h3>
              <p className="text-center text-lg text-ternary">Graphic DESIGNER & VIDEO EDITOR</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <BsFillPeopleFill  className="mx-auto *:text-ternary mb-8" size={45}/>
              <h3 className="text-2xl font-semibold text-center mb-2">MS AREEBA </h3>
              <p className="text-center text-lg text-ternary">MARKETING MANAGER</p>
            </div>
          </div>
          
        </div>
        <div className="container mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <BsFillPeopleFill  className="mx-auto *:text-ternary mb-8" size={45}/>
              <h3 className="text-2xl font-semibold text-center mb-2">MS HINA </h3>
              <p className="text-center text-lg text-ternary">SENIOR SALES REPRESENTATIVE</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <BsFillPeopleFill  className="mx-auto *:text-ternary mb-8" size={45}/>
              <h3 className="text-2xl font-semibold text-center mb-2">MS SAIMA</h3>
              <p className="text-center text-lg text-ternary">SALES REPRESENTATIVE</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-slide-in-up">
              <BsFillPeopleFill  className="mx-auto *:text-ternary mb-8" size={45}/>
              <h3 className="text-2xl font-semibold text-center mb-2">MS ANY</h3>
              <p className="text-center text-lg text-ternary">-</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Values Section */}
      <section className="py-6 sm:py-16 bg-white  dark:bg-gray-900 dark:text-white duration-200">
        <div className="container mx-auto px-4">
          <h2 className="sm:text-4xl text-2xl font-semibold text-center text-ternary mb-6 animate-slide-in-left">Our Team Core Values</h2>
          <ul className="space-y-4 sm:text-lg text-md max-w-3xl mx-auto">
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Compassion & Empathy 
            </li>
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Integrity & Trust
            </li>
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Excellence in Care
            </li>
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Innovation & Research
            </li>
             <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Patient-Centered Approach
            </li>
             <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Collaboration & Teamwork
            </li>
            <li className="flex items-center justify-center">
              <span className="text-xl mr-4 text-ternary">&#10003;</span> Hope & Positivity
            </li>
          </ul>
        </div>
      </section>
      <section className="py-6 sm:py-16 pb-8 sm:pb-20 bg-secondary animation-slide-in-left relative dark:bg-gray-900 dark:text-white duration-200">
  <div className="container mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
     <div className="w-full md:w-2/3 flex justify-center md:justify-start sm:mb-0 mb-10">
      <img src={one} alt="Mission Image" className="w-full max-w-md md:max-w-lg object-contain animate-slide-in-right" />
    </div>
    <div className="w-full md:w-2/3 mb-8 md:mb-0">
      <h2 className="sm:text-4xl text-xl font-semibold text-center mb-4 text-black dark:text-white">What Makes Us Different?</h2>
      <ol className='list-disc list-inside space-y-2 text-md mb-4 px-8 sm:px-20'>
      <li>We listen deeply before we act.</li>
      <li>We tailor every approach to meet real, human needs.</li>
      <li>We build relationships, not just services.</li>
      <li>We are not transactional. We’re transformational.</li>
    </ol>
    </div>
   
  </div>
</section>
      {/* Contact CTA Section */}
      <section className="py-16 bg-white  text-center dark:bg-gray-800 dark:text-white duration-200  ">
        <h2 className="sm:text-4xl text-3xl font-semibold mb-6 animate-slide-in-right text-ternary">Get In Touch</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">We’d love to hear from you. Whether you’re interested in our services, have questions, or just want to connect, reach out to us today!</p>
        <button className="bg-ternary text-black py-2 font-bold px-6 rounded-lg hover:bg-ternary hover:text-white transition-colors duration-300"
        onClick={() => navigate('/consult')}>
          Contact Us
        </button>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
