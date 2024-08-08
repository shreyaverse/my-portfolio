import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .post("http://localhost:5001/create", formData, { withCredentials: true })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/bloghome");
        }
      })
      .catch((err) => {
        console.error("Error posting data:", err);
        alert("Error posting data. Check the console for details.");
      });
  };

  return (
    <div className="post_container py-6 flex justify-center">
      <div className="post_form bg-white p-8 border border-gray-300 rounded-md max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold">Create Post</h2>
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Author"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setDate(e.target.value)}
          />
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            className="file w-full p-2 border border-gray-300 rounded-md"
            placeholder="Select file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;