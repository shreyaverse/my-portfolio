import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/getpost/${id}`)
      .then((response) => {
        const post = response.data;
        setTitle(post.title);
        setAuthor(post.author);
        setDate(new Date(post.date).toISOString().split("T")[0]);
        setDescription(post.description);
        setExistingFile(post.file);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        alert("Error fetching post. Check the console for details.");
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    axios
      .put(`http://localhost:5001/updatepost/${id}`, formData)
      .then(() => {
        alert("Post updated successfully");
        navigate("/postlist");
      })
      .catch((err) => {
        console.error("Error updating post:", err);
        alert("Error updating post");
      });
  };

  return (
    <div className="py-6 flex justify-center">
      <div className="bg-white p-8 border border-gray-300 rounded-md max-w-md w-full shadow-lg">
        <form onSubmit={handleUpdate} className="space-y-6">
          <h2 className="text-2xl font-semibold">Edit Post</h2>
          <input
            type="text"
            value={title}
            placeholder="Enter Title"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={author}
            placeholder="Enter Author"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="date"
            value={date}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDate(e.target.value)}
          />
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full border border-gray-300 rounded-md"
          />
          {existingFile && (
            <div className="w-full border border-gray-300 rounded-md p-2 mb-4">
              <p className="mb-2 text-gray-700">Existing File:</p>
              <img
                src={`http://localhost:5001/Public/Images/${existingFile}`}
                alt="Current post"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
