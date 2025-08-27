import React from "react";
import CountUp from "react-countup";

const NumberCounter = () => {
  return (
    <div className="bg-ternary text-white py-12 dark:bg-gray-700 dark:text-white">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Expert Tutors */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={898} duration={3} />
          </p>
          <p>Expert tutors</p>
        </div>

        {/* Hours Content */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={20000} separator="," suffix="+" duration={3} />
          </p>
          <p>Hours content</p>
        </div>

        {/* Subjects and Courses */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={298} duration={3} />
          </p>
          <p>Subjects and courses</p>
        </div>

        {/* Active Students */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={72878} separator="," suffix="+" duration={3} />
          </p>
          <p>Active students</p>
        </div>
      </div>
    </div>
  );
};

export default NumberCounter;
