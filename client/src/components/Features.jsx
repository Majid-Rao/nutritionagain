import React from "react";
import {
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbBabyCarriage } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const features = [
  {
    icon: <FaLeaf className="text-ternary text-4xl mb-3" size={45} />,
    title: "Natural & Holistic Treatment",
    desc: "We focus on safe, non-invasive, and natural approaches that work with your body, not against it.",
  },
  {
    icon: <MdGroups className="text-ternary text-4xl mb-3" size={45} />,
    title: "Highest Success Rates",
    desc: "Our personalized fertility programs are designed to maximize your chances of success.",
  },
  {
    icon: <TbBabyCarriage className="text-ternary text-4xl mb-3" size={45} />,
    title: "Trusted & Science-Backed Methods",
    desc: "Every recommendation is rooted in proven, research-based practices for reproductive health.",
  },
  {
    icon: <FaCheckCircle className="text-ternary text-4xl mb-3" size={45} />,
    title: "Simple & Realistic Plans",
    desc: "Easy-to-follow lifestyle, nutrition, and treatment strategies tailored for long-term results.",
  },
];

const Features = () => {
  const navigate = useNavigate();
  return (
    <>
    <section className="bg-white py-14 px-5 lg:px-14 text-center dark:bg-gray-900 dark:text-white duration-200">
      <div className="flex justify-center ">
     
      <h2 className="sm:text-3xl md:text-4xl text-xl font-bold mb-10 text-gray-800 dark:text-white duration-200">Why Choose Us</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-xl animate-slide-in-right shadow-md hover:shadow-xl transition duration-300 dark:bg-gray-700 dark:text-white "
          >
            <div className="flex justify-center text-4xl text-primary mb-3 animate-pulse">
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
     <div className="flex justify-center sm:pt-6 sm:pb-4 pt-0 pb-0 dark:bg-gray-800 dark:text-white duration-200">
        <button className='bg-gradient-to-r from-ternary to-ternary text-black font-medium py-2 px-4 rounded-full
        hover:scale-105 duration-200 animate-pulse' onClick={() => navigate('/consult')}>
        Consult Now
        </button> 
        </div>
     
    </>
  );
};

export default Features;
