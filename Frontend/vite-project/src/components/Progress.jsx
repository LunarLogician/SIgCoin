import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHourglassHalf } from "react-icons/fa";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import NavDash from "./layout/NavDash";

function Progress() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [initialCoins, setInitialCoins] = useState(0);

  const miningRatePerSecond = 0.1 / 3600; // 0.1 coins per hour converted to per second.

  useEffect(() => {
    const fetchSession = async () => {
      const Token = localStorage.getItem("Token");
      try {
        const response = await axios.get("http://localhost:5000/api/mining/progress", {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        if (response?.data?.startTime) {
          const startTimestamp = new Date(response.data.startTime).getTime(); // Convert startTime to timestamp
          setStartTime(startTimestamp);
          setInitialCoins(response.data.totalCoinsMined);
          console.log("Start Time:", response.data.startTime);
          console.log("Total Coins:", response.data.totalCoinsMined);
        } else {
          console.error("No session found.");
        }
      } catch (error) {
        console.error("Failed to fetch session data:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    let interval;

    if (startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        setElapsedTime(Math.floor((now - startTime) / 1000)); // Calculate elapsed time in seconds
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime]);

  const calculateProgressPercentage = () => {
    const totalExpectedTime = 60 * 60; // 1 hour
    const percentage = Math.min((elapsedTime / totalExpectedTime) * 100, 100);
    return percentage.toFixed(2);
  };

  const calculateTotalCoins = () => {
    return (initialCoins + elapsedTime * miningRatePerSecond).toFixed(2);
  };

  return (
    <>
      <NavDash />
      <div className="container bg-black text-yellow-300 p-6 shadow-lg items-center min-h-screen border-golden 
  sm:p-4 sm:text-sm md:p-6 md:text-base lg:p-8 lg:text-lg">

        <h1 className="text-3xl font-bold mb-4 text-yellow-400 text-center">Mining Progress</h1>
        {startTime ? (
          <div>
            <div className="progress-container text-center mb-6">
              <div className="progress-bar bg-gray-700 rounded-lg overflow-hidden h-6 w-3/4 mx-auto">
                <div
                  className="progress bg-yellow-400 h-full"
                  style={{
                    width: `${calculateProgressPercentage()}%`,
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              </div>
              <p className="mt-2 text-sm">
                <FaHourglassHalf className="inline-block text-lg" /> Total Time Elapsed: {elapsedTime} seconds
              </p>
              <p className="mt-2 text-sm">Total Coins Mined: {calculateTotalCoins()}</p>
            </div>
          </div>
        ) : (
          <p className="text-center">Fetching session details...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Progress;
