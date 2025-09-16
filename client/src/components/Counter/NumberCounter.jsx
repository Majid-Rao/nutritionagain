import React from "react";
import CountUp from "react-countup";

const NumberCounter = () => {
  return (
    <div className="bg-ternary text-white py-12 dark:bg-gray-700 dark:text-white">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Expert Tutors */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={1000} separator="," suffix="+" duration={3} />
          </p>
          <p>Successful pregnancies</p>
        </div>

        {/* Hours Content */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={4000} separator="," suffix="+" duration={3} />
          </p>
          <p>With low Amh</p>
        </div>

        {/* Subjects and Courses */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={1000} separator="," suffix="+" duration={3} />
          </p>
          <p>Male clients</p>
        </div>

        {/* Active Students */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={100} separator="," suffix="+" duration={3} />
          </p>
          <p>Active patients</p>
        </div>
      </div>
    </div>
  );
};

export default NumberCounter;
