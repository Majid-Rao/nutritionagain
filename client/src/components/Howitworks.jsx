import React from "react";
import img from "../assets/process.jpg";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    number: "01",
    title: "Open Communication",
    desc: "We value clarity and honesty. We encourage questions, feedback, and collaboration. Reach out to us via email, WhatsApp, or in-person during working hours.",
  },
  {
    number: "02",
    title: "Respect Each Other’s Time",
    desc: "We show up prepared and punctual. We appreciate scheduled meetings and timely responses. Emergencies are always given priority — we understand life happens.",
  },
  {
    number: "03",
    title: "Shared Responsibility",
    desc: "We believe in accountability from both sides. We’re here to support you — and we appreciate when you’re actively engaged, too.",
  },
  {
    number: "04",
    title: "Celebrate Progress",
    desc: "We acknowledge wins — big or small. Your growth is our mission, and your success is our joy.",
  },
   {
    number: "05",
    title: "Boundaries & Balance",
    desc: "We honor mental health and personal space — for you and for us. We honor mental health and personal space — for you and for us.",
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center  dark:text-white">
            How to Work With Us
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
