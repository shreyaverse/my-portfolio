import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Skills from "./components/Skills";
import SocialLinks from "./components/SocialLinks";
import Subscribe from "./components/Subscribe";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import BlogHome from "./components/BlogHome";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { createContext } from "react";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route
            path="/skills"
            element={<PrivateRoute element={<Skills />} />}
          />
          <Route
            path="/blog"
            element={<PrivateRoute element={<BlogHome />} />}
          />
          <Route
            path="/bloghome"
            element={<PrivateRoute element={<BlogHome />} />}
          />
          <Route
            path="/create"
            element={<PrivateRoute element={<CreatePost />} />}
          />
          <Route
            path="/edit/:id"
            element={<PrivateRoute element={<EditPost />} />}
          />
          <Route
            path="/subscribe"
            element={<PrivateRoute element={<Subscribe />} />}
          />
          <Route
            path="/contact"
            element={<PrivateRoute element={<Contact />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <SocialLinks />
      </Router>
    </userContext.Provider>
  );
}

export default App;
