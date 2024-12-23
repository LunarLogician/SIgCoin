import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import RegisterModal from "./RegisterModal";

function HomePage() {
  let [show, setshow] = useState(false);
  const handlere = () => {
    setshow(true);
  };
  const handleclo = () => {
    setshow(false);
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-8xl md:text-6xlmy-[10x] font-bold mb-4  mt-16 leading-tight">
            Earn Money Easily
          </h1>
          <p className="text-5xl md:text-5xl mb-2">By Watching Ads</p>
          <p className="text-sm md:text-2xl mt-9 mb-6">Less than 30 seconds</p>
          
          <button
            onClick={handlere}
            className="mt-6 bg-black hover:bg-blue-700 px-6 py-3 rounded-3xl transition duration-200"
          >
            Get Started
          </button>

          {show && <RegisterModal closeModalLo={handleclo} />}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 text-white bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200">
              <img
                className="h-40 w-full object-cover rounded-lg mb-4"
                src="3.png"
                alt="Mining"
              />
              <h3 className="text-xl font-bold mb-2">Passive Income</h3>
              <p className="text-sm">
                Generate easy passive income by watching ads and completing simple tasks.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200">
              <img
                className="h-40 w-full object-cover rounded-lg mb-4"
                src="2.jpeg"
                alt="Cryptocurrency"
              />
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-sm">
                Secure and transparent transactions ensuring your earnings are protected.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200">
              <img
                className="h-40 w-full object-cover rounded-lg mb-4"
                src="1.jpeg"
                alt="Decentralized Future"
              />
              <h3 className="text-xl font-bold mb-2">Decentralized Future</h3>
              <p className="text-sm">
                Empower yourself with financial freedom and support a decentralized economy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Mining Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">What is Earning Money?</h2>
            <p className="text-sm md:text-base mb-4">
              Earning money is as easy as watching ads and completing quick tasks. With just a few minutes of your time, you can start generating income effortlessly.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200">
              Explore Now
            </button>
          </div>
          <div className="text-center">
            <img
              className="h-60 w-full object-contain rounded-lg shadow-lg"
              src="https://source.unsplash.com/featured/?money"
              alt="Earning Money"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} CryptoHub. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default HomePage;
