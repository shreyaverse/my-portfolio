import React, { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppContext } from "./AppContext";
import { userContext } from "../App";

const NavBar = () => {
  const { theme, toggleTheme } = useAppContext();
  const [nav, setNav] = useState(false);
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const links = [
    { id: 1, link: "home", path: "/home" },
    { id: 2, link: "about", path: "/about" },
    { id: 3, link: "skills", path: "/skills" },
    { id: 4, link: "blog", path: "/blog" },
    { id: 5, link: "subscribe", path: "/subscribe" },
    { id: 6, link: "contact", path: "/contact" },
  ];

  const handleLogout = () => {
    fetch('http://localhost:5001/logout', {
      method: 'GET',
      credentials: 'include' 
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'Success') {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className={`flex justify-between items-center w-full px-4 text-grey bg-${theme === 'light' ? "black" : "white"} text-${theme === 'light' ? "white" : "black"} fixed mb-150px`}>
      <div>
        <h1 className="text-3xl font-signature ml-2">Shreya Konduskar</h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, path }) => (
          <li key={id} className="px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200">
            <RouterLink to={path}>
              {link}
            </RouterLink>
          </li>
        ))}
        {user && (
          <li className="px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200">
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>

      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link, path }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <RouterLink onClick={() => setNav(!nav)} to={path}>
                {link}
              </RouterLink>
            </li>
          ))}
          {user && (
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      )}

      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
};

export default NavBar;
