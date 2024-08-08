import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/login', { email, password })
      .then(res => {
        if (res.data.Status === 'Success') {
          localStorage.setItem('token', res.data.token);
          setUser(res.data);
          navigate('/home');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div id="login" className="flex justify-center items-center bg-gray-600 min-h-screen">
      <div className="bg-white p-6 rounded w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
          <p className="mt-4">Already have an account?</p>
          <Link to="/" className="block w-full bg-gray-200 text-gray-700 py-2 rounded text-center mt-2">
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
