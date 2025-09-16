import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUsers, faRocket, faClipboardCheck, faPeopleCarry, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Achievements = () => {
  return (
    <section className="py-18 bg-gradient-to-r from-primary to-ternary pt-10 pb-10  text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 duration-200">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center ">
        <h2 className="sm:text-3xl md:text-4xl text-xl font-bold mb-8">
          Our Achievements
        </h2></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Achievement 1 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faTrophy} className="text-5xl text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Recognized Expert </h3>
            <p className="text-md">
              Featured in live TV presentations as a trusted fertility and nutrition expert.
            </p>
          </div>

          {/* Achievement 2 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faUsers} className="text-5xl text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Global Impact </h3>
            <p className="text-md">
             Successfully guided and supported more than 10,000 patients worldwide on their fertility journey.
            </p>
          </div>

          {/* Achievement 3 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faRocket} className="text-5xl text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Innovative Leadership </h3>
            <p className="text-md">
              Pioneer of dynamic, science-backed approaches in fertility treatments.
            </p>
          </div>

          {/* Achievement 4 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faClipboardCheck} className="text-5xl text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Proven Success </h3>
            <p className="text-md">
             Achieved the highest success rates in low AMH pregnancies, offering hope where chances seemed slim.
            </p>
          </div>

          {/* Achievement 5 */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              <FontAwesomeIcon icon={faPeopleCarry} className="text-5xl text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Male Fertility Solutions </h3>
            <p className="text-md">
             Successfully designed effective treatments for azoospermia and other male fertility challenges, helping couples achieve parenthood.
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
