import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";

function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/getposts")
      .then((response) => {
        console.log("Posts data:", response.data);
        setPosts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts");
      });
  }, []);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:5001/deletepost/${postId}`)
      .then((response) => {
        if (response.data === "Success") {
          setPosts(posts.filter((post) => post._id !== postId));
        }
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
        alert("Error deleting post. Check the console for details.");
      });
  };

  return (
    <div
      id="blog"
      className="bg-gradient-to-b from-gray-300 via-gray-100 to-white py-12 md:py-24"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-black">Blog Posts</h1>
        <div className="mb-6 space-x-6">
          <Link
            to="/bloghome"
            className="text-2xl font-bold text-black hover:text-blue-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="text-2xl font-bold text-black hover:text-blue-500 transition duration-300"
          >
            Create
          </Link>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`http://localhost:5001/Public/Images/${post.file}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-1">by {post.author}</p>
                <p className="text-gray-500 mb-2 text-sm">
                  {new Date(post.date).toLocaleDateString("en-GB")}
                </p>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <Link
                    to={`/edit/${post._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogHome;
