import React from "react";
import img from "../assets/process.jpg";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    number: "01",
    title: "Place Your Order",
    desc: "Browse our organic range and place your order in a few easy clicks.",
  },
  {
    number: "02",
    title: "Harvest from Farm",
    desc: "We pick the freshest items straight from local organic farms.",
  },
  {
    number: "03",
    title: "Eco-Packaging",
    desc: "We use sustainable, hygienic packaging to ensure freshness.",
  },
  {
    number: "04",
    title: "Quick Delivery",
    desc: "Your order reaches your doorstep within hours, farm-fresh.",
  },
];

const Howitworks = () => {
  const navigate = useNavigate();
  return (
    <>
    <section className="bg-gray-100 py-16 px-5 lg:px-20 dark:bg-gray-900 dark:text-white  ">
      <div className="flex flex-col lg:flex-row items-center gap-10 sm:pb-20 sm:pt-10 pb-5 ">
        {/* img section  */}
        <div className="lg:w-1/2">
          <img
            src={img}
            alt="Organic process"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* content section  */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 sm:text-left text-center dark:text-white">
            How It Works
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="text-ternary text-3xl font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-white">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default Howitworks;
