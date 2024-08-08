import React from 'react';
import MyImage1 from "../MyImage1.jpg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div id="home" className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-4xl font-bold text-white">Welcome to Shreya's Portfolio</h2>
          <p className="text-gray-500 py-4 max-w-md">
            A beginner in software development, passionate about learning and creating innovative solutions.
          </p>
          <div>
            <Link
              to="/skills"
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md 
              bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer">
              Skills
              <span className="group-hover:rotate-90 duration:300">
                <MdOutlineKeyboardArrowRight size={23} className="ml-1"/>
              </span>
            </Link>
          </div>
        </div>
        <div>
          <img src={MyImage1} alt="" className="rounded-2xl mx-10 h-[300px] w-[300px]" />
        </div>
      </div>
    </div>
  );
};

export default Home;
