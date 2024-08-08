import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Subscribed successfully!');
      } else {
        alert('Subscription failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div id="subscribe" className="bg-gradient-to-b from-black via-black to-gray-800 py-12 md:py-24 w-full h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-xl justify-center w-full h-full space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Stay Updated</h2>
        <p className="text-gray-400 text-center">
          Subscribe to my newsletter to stay updated with my latest projects and learning experiences.
        </p>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-5 hover:scale-105 duration-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
