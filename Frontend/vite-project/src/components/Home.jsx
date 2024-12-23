// src/pages/Home.js
import React from "react";

function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to CryptoHub</h1>
        <p className="text-lg mb-6">Your one-stop solution for cryptocurrency tracking & mining insights.</p>
        <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Home;
