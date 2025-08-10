import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {Link} from "react-router-dom";
const Footer = () => {
  return (
  <>
  <div className="bg-gray-800 text-white ">
  <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
        >
          <span className="text-[#f0a39c]">Free</span> until you're ready
          launch
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your ph.no"
            className="text-gray-800
           sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-[#f0a39c] hover:bg-[#f0a39c] duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
          >
            Request Code
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
            Nutrionist
          </h3>
          <p className="text-sm text-gray-300">
            Fresh, healthy, and 100% organic products delivered to your
            doorstep. Supporting local farmers and sustainable living.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-[#f0a39c]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="font-semibold mb-3 text-[#f0a39c]">Policy</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#f0a39c]">
                Privacy Policy
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h4 className="font-semibold mb-3 text-[#f0a39c]">Contact</h4>
          <p className="text-sm text-gray-300 mb-2">
            123 Organic Street, London, UK
          </p>
          <p className="text-sm text-gray-300 mb-2">
            Email: support@nutrionist.com
          </p>
          <p className="text-sm text-gray-300 mb-4">Phone: +44 123 456 7890</p>
          <div className="flex space-x-4">
            <a href="/" className="text-[#f0a39c] hover:text-white">
              <FaFacebookF />
            </a>
            <a href="/" className="text-[#f0a39c] hover:text-white">
              <FaInstagram />
            </a>
            <a href="/" className="text-[#f0a39c] hover:text-white">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-400 border-t pt-4">
        @copyright || All rights reserved
      </div>
    </footer>
    </>
  );
};

export default Footer;
