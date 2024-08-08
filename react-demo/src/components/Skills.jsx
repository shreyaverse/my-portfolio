import React from 'react';
import { FaCode as CodeIcon, FaHashtag as HashIcon, FaDatabase as DatabaseIcon, FaCodepen as CodepenIcon } from 'react-icons/fa';

const Skills = () => {
  return (
    <div id="skills" className="bg-gradient-to-b from-black via-black to-gray-800 py-12 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">My Skills</h2>
        <p className="flex justify-center text-gray-400 text-2xl">
          Here are some of the key skills I've developed so far in my software development journey.
        </p>
        <br></br>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <CodeIcon className="w-12 h-12 text-gray-900 mb-4" />
            <h3 className="text-xl font-bold mb-2">C/C++</h3>
            <p className="text-gray-600">Proficient in writing efficient and robust code in C and C++.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <HashIcon className="w-12 h-12 text-gray-900 mb-4" />
            <h3 className="text-xl font-bold mb-2">HTML/CSS</h3>
            <p className="text-gray-600">Skilled in creating responsive and visually appealing web pages using HTML and CSS.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <DatabaseIcon className="w-12 h-12 text-gray-900 mb-4" />
            <h3 className="text-xl font-bold mb-2">Oracle</h3>
            <p className="text-gray-600">Experienced in designing and managing databases using Oracle.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <CodepenIcon className="w-12 h-12 text-gray-900 mb-4" />
            <h3 className="text-xl font-bold mb-2">React</h3>
            <p className="text-gray-600">Currently learning React to expand my web development skills.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
