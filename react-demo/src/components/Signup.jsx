import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5001/signup', { username, email, password })
        .then(res => {
          navigate('/login');
        })
        .catch(err => console.log(err));
    };

  return (
    <div id="signup" className="flex justify-center items-center bg-gray-600 min-h-screen">
      <div className="bg-white p-6 rounded w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input 
              type="text" 
              placeholder="Enter your username"
              autoComplete="off"
              name="username"
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input 
              type="email" 
              placeholder="Enter your Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Register
          </button>
          <p className="mt-4">Already have an account?</p>
          <Link to="/login" className="block w-full bg-gray-200 text-gray-700 py-2 rounded text-center mt-2">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
