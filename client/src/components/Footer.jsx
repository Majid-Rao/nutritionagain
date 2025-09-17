import React from "react";
import { FaFacebookF, FaInstagram,FaLinkedinIn } from "react-icons/fa";
import {Link} from "react-router-dom";
const Footer = () => {
  return (
  <>
  <div className="bg-gray-800 text-white ">
  <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-2xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
        >
          <span className="text-[#f0a39c] sm:text-4xl text-2xl">Feel Free</span> to contact us
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your email..."
            className="text-gray-800
           sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-[#f0a39c] hover:bg-[#f0a39c] duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
          >
            Request Contact
          </button>
        </div>
      </div>
      </div>
   <footer className="bg-gray-900 text-white pt-12 pb-6 px-5 lg:px-14">
      {/* Top section */}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {/* logo section */}
        <div>
          <h3 className="text-2xl font-bold text-[#f0a39c] mb-3">
            Dr Aisha Lakhwani
          </h3>
          <p className="text-lg text-gray-300">
           Fertility & Low AMH Expert  </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-left sm:text-center text-[#f0a39c]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-left sm:text-center">
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#f0a39c]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/consult" className="hover:text-[#f0a39c]">
                Consult Now
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#f0a39c]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Policy */}
        <div className="mr-24">
          <h4 className="font-semibold mb-3 text-[#f0a39c] text-left sm:text-center">Policy</h4>
          <ul className="space-y-2 text-sm text-left sm:text-center">
            <li>
              <Link to="/terms" className="hover:text-[#f0a39c]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/policy" className="hover:text-[#f0a39c]">
                Privacy Policy
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h4 className="font-semibold mb-3 text-[#f0a39c]">Contact</h4>
          <p className="text-sm text-gray-300 mb-2">
          Email: Aishalakhwani10@gmail.com
          </p>
          <p className="text-sm text-gray-300 mb-2">
            Email: Aishalakhwani10@gmail.com
          </p>
          <p className="text-sm text-gray-300 mb-4">Phone: +16077690051</p>
          <div className="flex space-x-4">
            <Link to="https://www.facebook.com/share/176EMJgtPy/" className="text-[#f0a39c] hover:text-white">
              <FaFacebookF />
            </Link>
            <Link to="https://www.instagram.com/dr_aishalakhwani?igsh=MW5kY3kwZTc5N2g5MQ==" className="text-[#f0a39c] hover:text-white">
              <FaInstagram />
            </Link>
            <Link to="https://www.linkedin.com/in/draishalakhwani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-[#f0a39c] hover:text-white">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-400 border-t pt-4">
        @copyright 2025 || All rights reserved
      </div>
    </footer>
    </>
  );
};

export default Footer;
