import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUsers, faRocket, faClipboardCheck, faPeopleCarry, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Achievements = () => {
  return (
    <section className="py-18 bg-gradient-to-r from-primary to-[#f0a39c] pt-10 pb-10  text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 duration-200">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center ">
        <hr className="w-14 border-t-2  border-white mt-3 sm:mt-4" />
        <h2 className="sm:text-3xl md:text-4xl text-xl font-bold mb-8">
          Our Achievements
        </h2></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Achievement 1 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faTrophy} className="text-5xl text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Award Winning</h3>
            <p className="text-md">
              Recognized as one of the top companies in our industry. Over
              50+ awards for excellence and innovation.
            </p>
          </div>

          {/* Achievement 2 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faUsers} className="text-5xl text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Global Presence</h3>
            <p className="text-md">
              We have expanded our operations to over 25 countries worldwide,
              serving more than 1 million customers.
            </p>
          </div>

          {/* Achievement 3 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faRocket} className="text-5xl text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Innovation Leader</h3>
            <p className="text-md">
              Over 100 patents in various fields of technology. We strive to
              create innovative solutions that change the industry.
            </p>
          </div>

          {/* Achievement 4 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faClipboardCheck} className="text-5xl text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Quality Assurance</h3>
            <p className="text-md">
              We maintain the highest standards of quality, with 99% customer
              satisfaction rate and industry-leading certifications.
            </p>
          </div>

          {/* Achievement 5 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faPeopleCarry} className="text-5xl text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Social Impact</h3>
            <p className="text-md">
              Through charity and volunteer work, we've donated over $10 million
              to various global causes and initiatives.
            </p>
          </div>

          {/* Achievement 6 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faChartLine} className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Revenue Growth</h3>
            <p className="text-md">
              Our company has grown 500% in the past 5 years, becoming a major
              player in the industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
