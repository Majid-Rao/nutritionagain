import React from 'react'
import Productsfile from './Productsfile'
import Features from './Features'
import Hero from './Slider/Hero'
import NumberCounter from './Counter/NumberCounter'
import Navbar from './Navbar/Navbar'
import Middlesection from './Middlesection'
import Howitworks from './Howitworks'
import Achievements from './Achievements'
import SlidesHome from './SlidesHome'
import Testimonial from './TestimonialSlider'
import Footer from './Footer'
import ClinicSlider from './ClinicSlider'
import VideoReelSection from './VideoReelSection'
const Home = () => {
  return (
   <>
   <Navbar/>
   <Hero/>
   {/* <Productsfile/> */}
   <Features/>
   <Middlesection/>
   <VideoReelSection/>
   <ClinicSlider/>
   <Howitworks/>
   <Achievements/>
    <SlidesHome/>
   <NumberCounter/>
   <Testimonial/>
   <Footer/>
   </>
  )
}

export default Home
