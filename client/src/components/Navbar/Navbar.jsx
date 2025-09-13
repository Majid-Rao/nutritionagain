import React, { useState, useEffect } from 'react'
import logo2 from '../../assets/logo2.webp'
import aot from '../../assets/aot.webp'
import { IoMdSearch,IoMdMenu  } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode,MdCurrencyExchange } from "react-icons/md";

import { motion } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    // Check if user has a saved preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const darkmodeToggle = () => {
    setDarkMode(!darkMode);
    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark');
    // Save preference
    localStorage.setItem('darkMode', !darkMode);
  }

  return (
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white  duration-200 relative z-40'>
     <div className='w-full h-8 bg-white  justify-center items-center flex dark:bg-gray-900 dark:text-white duration-200'>
      <marquee><h2 className='text-black font-semibold text-center sm:text-sm text-xs dark:text-white'>Empowering Your Journey to Parenthood – Expert Fertility Care, Every Step of the Way!</h2></marquee>
     </div>
      {/* upper nav */}
      <div className='bg-primary dark:bg-se transition-colors duration-200 py-2'>
        <div className='flex justify-between h-10  items-center md:px-20 drop-shadow-md'>
            <motion.div className='mx-10' 
           initial={{ opacity: 0 }} // Initial opacity is 0 (invisible)
      animate={{ opacity: 1 }} // Animate to opacity 1 (visible)
      transition={{ duration: 1 }} // Animation duration is 1 second
            >
                <a href="#home"><img src={aot} alt="Logo"  className='w-32 sm:w-36  hover:scale-105 transition-all'/></a>
            </motion.div>
          <div className={`xl:hidden lg:hidden md:hidden absolute flex flex-col items-center bg-white w-full 
          gap-6 top-12 right-0 transition-transform transform dark:bg-gray-700 ${isOpen ? "opacity-100, animate-slide-in-left" : "opacity-0" } `}>
            <Link to='/'><li className='list-none subpixel-antialiased text-md font-semibold hover:bg-[#f2d2cf] rounded-md  hover:scale-105 transition-transform transform'>Home</li></Link>
            <Link to='/about'><li className='list-none subpixel-antialiased text-md font-semibold hover:bg-[#f2d2cf] rounded-md  hover:scale-105 transition-transform transform'>About</li></Link>
            <Link to='/consult'><li className='list-none subpixel-antialiased text-md font-semibold hover:bg-[#f2d2cf] rounded-md  hover:scale-105 transition-transform transform'>Consult</li></Link>
            <Link to='/blogs'><li className='list-none subpixel-antialiased text-md font-semibold hover:bg-[#f2d2cf] rounded-md  hover:scale-105 transition-transform transform'>Blogs</li></Link>
            <Link to='/contact'><li className='list-none subpixel-antialiased text-md font-semibold hover:bg-[#f2d2cf] rounded-md  hover:scale-105 transition-transform transform'>Contact</li></Link>
            <Link to='/policy'><li className='list-none subpixel-antialiased text-md font-semibold hover:bg-[#f2d2cf] rounded-md  hover:scale-105 transition-transform transform'>Policy</li></Link>
          </div>
            {/* search bar and cart btn */}
            <div className='flex justify-between items-center gap-4 animate-slide-in-right transition-all duration-300'>
            <IoMdMenu className='xl:hidden lg:hidden md:hidden md:pl-35 text-4xl cursor-pointer' onClick={()=>setIsOpen(!isOpen)} />
              <div className='relative hidden sm:block group'>
                <input type="text" placeholder='search...' className='w-[200px] sm:w-[200px]
                group-hover:w-[250px] transition-all duration-300 cursor-pointer border border-grey-300
                rounded-full px-3 py-1 focus:outline-none focus:border-1 focus:border-primary dark:bg-gray-700 dark:text-white' />
                <IoMdSearch className='absolute right-4 top-1/2 transform -translate-y-1/2
                group-hover:text-primary text-gray-500' />
              </div>
              {/* order btn */}
              <button className='bg-gradient-to-r from-ternary to-green-300 dark:from-gray-700 dark:to-gray-600 text-white rounded-full px-4 py-1 hover:bg-gray-900 transition-all
              duration-200 flex items-center gap-3 group' onClick={() => navigate('/checkdata')}>
               <span className='font-bold group-hover:block hidden transition-all duration-200'>PayNow</span> 
               <MdCurrencyExchange className='text-xl text-black dark:text-white drop-shadow-sm cursor-pointer animate-bounce-logo' />
              </button>
              {/* Darkmode Toggle */}
              {darkMode ? (
                <MdOutlineLightMode className='text-2xl cursor-pointer  hover:text-white transition-all duration-200 mr-4 ' onClick={darkmodeToggle} />
              ) : (
                <MdOutlineDarkMode className='text-2xl cursor-pointer hover:text-white transition-all duration-200 mr-4 ' onClick={darkmodeToggle} />
              )}
            </div>
        </div>
      </div>
      {/* lower nav */}
      <div className='hidden md:flex justify-center items-center animate-fade-in bg-white dark:bg-gray-900 py-2'>
        <ul className='hidden md:flex justify-between items-center lg:gap-20 md:gap-12 xl:gap-32 text-gray-900 dark:text-gray-300
        text-md px-4 subpixel-antialiased font-semibold'>
          {/* Navigation Links */} 
        <Link to='/'>  <li className='xl:p-2 lg:p-4 md:p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md  hover:scale-100 transition-transform transform'>Home
          </li></Link>
         <Link to='/about'><li className='xl:p-2 lg:p-4 md:p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md  hover:scale-100 transition-transform transform'>About
          </li></Link>
         <Link to='/consult'><li className='xl:p-2 lg:p-4 md:p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md  hover:scale-100 transition-transform transform'>Consult</li>
         </Link>
         <Link to='/blogs'><li className='xl:p-2 lg:p-4 md:p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md  hover:scale-100 transition-transform transform'>Blogs</li>
         </Link>
         <Link to='/contact'><li className='xl:p-2 lg:p-4 md:p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md  hover:scale-100 transition-transform transform'>Contact</li>
         </Link>
         <Link to='/policy'><li className='xl:p-2 lg:p-4 md:p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md  hover:scale-100 transition-transform transform'>Policy</li>
         </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar