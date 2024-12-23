import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStopCircle, FaCoins, FaHourglassHalf } from "react-icons/fa";
import Footer from "./layout/Footer";
import NavDash from "./layout/NavDash";

function Stop() {
  const [stopData, setStopData] = useState({
    totalCoins: 0,
    elapsedTime: 0,
  });
  const [error, setError] = useState("");

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchStopData = async () => {
      try {
        const Token = localStorage.getItem("Token");

        if (!Token) {
          setError("You need to log in first.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/mining/status",
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        if (response?.data) {
          setStopData({
            totalCoins: response.data.totalCoins || 0,
            elapsedTime: response.data.elapsedTime || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching initial stop data:", error.message);
        setError("Unable to fetch initial data.");
      }
    };

    fetchStopData();
  }, []);

  // Handle stop mining logic
  const handleStopMining = async () => {
    try {
      const Token = localStorage.getItem("Token");

      if (!Token) {
        alert("You need to log in first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/mining/stop",
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response?.data?.message) {
        setError(response.data.message);
      } else {
        setStopData({
          totalCoins: response.data.totalCoins || 0,
          elapsedTime: response.data.elapsedTime || 0,
        });
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error stopping mining session:", error.message);
      setError("An error occurred while stopping mining.");
    }
  };

  return (
    <>
      <NavDash />

      <motion.div
        className="bg-black text-yellow-300 p-6 shadow-lg items-center min-h-screen border-golden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-yellow-400"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Stop Mining Session
        </motion.h1>

        {error && (
          <motion.div
            className="alert-error bg-red-600 p-2 rounded mb-4 text-yellow-100 text-center"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {error}
          </motion.div>
        )}

        <div className="flex justify-center gap-4 mb-6">
          <motion.button
            className="btn bg-yellow-400 hover:bg-yellow-500 p-3 rounded-lg shadow-lg text-black"
            onClick={handleStopMining}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <FaStopCircle className="text-lg" /> Stop Mining
          </motion.button>
        </div>

        {/* Data is shown by default here */}
        <div className="stop-data-container text-yellow-400 text-center mb-6">
          <motion.div
            className="card bg-black border-yellow-300 border p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold mb-2">Current Mining Data</h2>
            <p>
              <FaCoins className="inline-block text-lg" />
              <strong>Total Coins Earned:</strong> {stopData.totalCoins}
            </p>
            <p>
              <FaHourglassHalf className="inline-block text-lg" />
              <strong>Elapsed Time (hours):</strong> {stopData.elapsedTime}
            </p>
          </motion.div>
        </div>

        <Footer />
      </motion.div>
    </>
  );
}

export default Stop;
