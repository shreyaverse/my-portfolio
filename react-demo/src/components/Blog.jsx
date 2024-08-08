import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import BlogHome from "./BlogHome"; 
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";

const Blog = () => {
  return (
    <div id="blog" className="bg-gradient-to-b from-gray-300 via-gray to-white py-12 md:py-24">
        <h1 className="text-3xl font-bold mt-2 text-left text-black">Blog Posts</h1>
        <div className="flex space-x-6">
          <Link to="/bloghome" className="text-2xl font-bold text-black">Home</Link>
          <Link to="/create" className="text-2xl font-bold text-black">Create</Link>
        </div>
        <Routes>
          <Route path="/bloghome" element={<BlogHome />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
    </div>
  );
};

export default Blog;
