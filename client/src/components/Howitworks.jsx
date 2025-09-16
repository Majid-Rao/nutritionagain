import React from "react";
import report from "../assets/report.webp"
import { useNavigate } from "react-router-dom";
const steps = [
  {
    number: "01",
    title: "Fill Out the Consultation Form ",
    desc: "Start by completing our simple online consultation form with your details.",
  },
  {
    number: "02",
    title: "Wait 24–48 Hours ",
    desc: "Our team carefully reviews each case and will get back to you within 1–2 working days.",
  },
  {
    number: "03",
    title: "Personalized Follow-Up ",
    desc: "Once we contact you, we’ll gather more information to understand your fertility journey.",
  },
  {
    number: "04",
    title: "Case Investigation ",
    desc: "Our experts will analyze your medical history to recommend the right program for you.",
  },
   {
    number: "05",
    title: "Payment Details ",
    desc: "Secure payment instructions will be shared once your program is finalized.",
  },
  {
    number: "06",
    title: "Confirm Enrollment  ",
    desc: "Pay your program charges easily through our official website to confirm your spot.",
  },
];

const Howitworks = () => {
  
  return (
    <>
    <section className="bg-gray-100 py-16 px-5 lg:px-20 dark:bg-gray-900 dark:text-white  ">
      <div className="flex flex-col lg:flex-row items-center gap-10 sm:pb-20 sm:pt-10 pb-5 ">
        {/* img section  */}
        <div className="lg:w-1/2">
          <img
            src={report}
            alt="Organic process"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* content section  */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center  dark:text-white">
            How to Join Our Program
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
     {/* <div className="flex justify-center sm:pt-6 sm:pb-4 pt-0 pb-0 dark:bg-gray-800 dark:text-white duration-200">
        <button className='bg-gradient-to-r from-ternary to-ternary text-black font-medium py-2 px-4 rounded-full
        hover:scale-105 duration-200 animate-pulse' onClick={() => navigate('/consult')}>
        Consult Now
        </button> 
        </div> */}
</>
  );
};

export default Howitworks;
