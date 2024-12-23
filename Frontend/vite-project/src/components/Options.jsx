import React from 'react';

function Options() {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Cryptocurrency Mining with Ease</h1>
          <p className="text-lg md:text-xl mb-8">
            Manage your mining progress, track your rewards, and explore mining opportunities with just a few clicks.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Control Your Mining Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Start Mining */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200">
              <h3 className="text-xl font-bold mb-4 text-center">Start Mining</h3>
              <p className="text-sm mb-4 text-center">
                Begin mining and connect your system to our blockchain network seamlessly.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200">
                Start Now
              </button>
            </div>

            {/* Card 2: Stop Mining */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200">
              <h3 className="text-xl font-bold mb-4 text-center">Stop Mining</h3>
              <p className="text-sm mb-4 text-center">
                Pause mining activity anytime with a simHomePageple click and save energy.
              </p>
              <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-200">
                Stop Now
              </button>
            </div>

            {/* Card 3: Check Status */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200">
              <h3 className="text-xl font-bold mb-4 text-center">Check Status</h3>
              <p className="text-sm mb-4 text-center">
                Monitor your mining operations and hardware performance status anytime.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-200">
                Check Status
              </button>
            </div>

            {/* Card 4: See Progress */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200">
              <h3 className="text-xl font-bold mb-4 text-center">See Progress</h3>
              <p className="text-sm mb-4 text-center">
                Visualize your mining performance and rewards with real-time insights.
              </p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200">
                See Progress
              </button>
            </div>

            {/* Card 5: Claim Rewards */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200">
              <h3 className="text-xl font-bold mb-4 text-center">Claim Rewards</h3>
              <p className="text-sm mb-4 text-center">
                Redeem your mining rewards and convert them into real-world assets easily.
              </p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg transition duration-200">
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">What is Cryptocurrency Mining?</h2>
            <p className="text-sm md:text-base mb-4">
              Cryptocurrency mining involves solving complex mathematical puzzles to validate transactions and secure networks.
              It's a gateway to blockchain technology and decentralized finance systems.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition duration-200">
              Learn More
            </button>
          </div>
          <div className="text-center">
            <img
              className="h-60 w-auto rounded-lg shadow-lg"
              src="https://source.unsplash.com/featured/?blockchain,cryptocurrency"
              alt="Cryptocurrency Mining"
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

export default Options;
