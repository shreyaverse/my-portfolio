import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="w-full h-screen md:py-24 bg-gradient-to-b from-gray-300 via-gray to-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl ">
          I have a strong foundation in C, C++, HTML, CSS, and Oracle.
          Currently, I'm focused on learning React to expand my skills and create more dynamic web applications.
        </p>

        <br />

        <p className="text-xl">
          My goal is to continuously learn and grow as a developer,
          and to use my skills to make a positive impact on the world. I am
          excited to collaborate with others and to contribute
          to meaningful projects that can improve people's lives.
        </p>
      </div>
    </div>
  );
};
export default About;
