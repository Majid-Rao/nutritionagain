import React from 'react'
import women from '../../assets/aisha.webp'
import diet from '../../assets/diet.png'
import Slider from 'react-slick'


function Hero() {
const ImageList = [
  {
    id: 1,
    img: women,
    title:"Your Natural Path to Parenthood Starts Here",
    description:
    <>
    With expert guidance, customized meal plans, and holistic fertility support.<br />
    Dr. Aisha Lakhwani helps you conceive naturally.
    </>
  },
   {
    id: 2,
    img: diet,
    title:"Boost Your Fertility Naturally",
    description:
    <>
   Discover the key strategies for a holistic approach to conception.<br />Personalized nutrition plans
  <br />Stress management techniques
  <br />Supportive life style changes
  </>,
  },
   {
    id: 3,
    img: women,
    title:"Compassionate Care for Your Fertility Concerns",
    description:
    <>  
    Professional support to guide your <br /> fertility journey with empathy and expertise.
  </>,
}
]
const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: "ease-in-out",
  pauseOnHover: false,
  pauseOnFocus: true,
};
  return (
    <div className='relative overflow-hidden min-h-[650px] sm:min-h-[500px] flex items-center justify-center 
    bg-gray-200 dark:bg-gray-900 dark:text-white duration-200 sm:pt-10'>
        {/* background pattern */}
      <div className='h-[600px] w-[600px] bg-primary/100 absolute -top-1/2 right-0 rounded-3xl rotate-45
      -z-9'></div>
      
      {/* hero section */}
      <div className='container mx-auto h-full'> 
        <Slider {...settings}>
        {ImageList.map((data) => (
        <div key={data.id}>
            <div className='grid grid-cols-1 sm:grid-cols-2 h-full sm:mb-40 '>
            {/* text content section */}
            <div className='flex flex-col justify-center gap-4 pt-8 sm:pt-0 text-center
            sm:text-left order-2 sm:order-1 relative z-10 animate-slide-in-right'>
                <h1 className='text-3xl sm:text-4xl lg:text-6xl font-semibold'>{data.title}</h1>
                <p className='text-sm'>{data.description}</p>
                <div>
                    <button className='bg-gradient-to-r from-[#f0a39c] to-[#f0a39c] text-white py-2 px-4 rounded-full
                    hover:scale-105 duration-200 animate-pulse'>
                        Start Your Journey
                    </button> 
                </div>
            </div>
            {/* image section */}
            <div className='order-1 sm:order-2 relative'>
                <div className='relative z-10 h-full flex items-center justify-center animate-slide-in-down'>
                    <img 
                        src={data.img}  
                        alt={`Slide ${data.id}`}
                        className='w-[300px] h-[300px] sm:h-[450px] sm:w-[400px] 
                        sm:scale-105 object-contain mx-auto sm:pb-[70px]' 
                    />  
                </div>
            </div>
            </div>
        </div>
        ))}
        </Slider>
      </div>
    </div>
  )
}

export default Hero