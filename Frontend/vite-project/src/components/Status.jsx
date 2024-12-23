import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaBitcoin, FaQuoteLeft, FaExchangeAlt } from "react-icons/fa";
import Footer from "./layout/Footer";
import NavDash from "./layout/NavDash";

function Start() {
  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [quote, setQuote] = useState("");
  const [currencyRate, setCurrencyRate] = useState(null);

  const fetchMiningStatus = async () => {
    try {
      const Token = localStorage.getItem("Token");

      if (!Token) {
        alert("You need to log in first.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/mining/status", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
console.log(response.data.coinsEarned)

      if (response?.data?.session) {
        setSessionData({
          userId: response.data.session.userId,
          username: response.data.session.username || "Unknown",

          coinsMined:response.data.coinsEarned,
          elapsedTime: response.data.miningDuration || 0,
          isMining: !!response.data.session,
        });
        
      } else {
        setErrorMessage("Failed to fetch mining session status.");
      }
    } catch (error) {
      console.error("Error fetching mining status:", error.message);
      setErrorMessage("An error occurred while fetching the mining session status.");
    }
  };
 
  

  useEffect(() => {
    fetchMiningStatus();
 
  }, []);

  return (
    <>
      <NavDash />

      {/* Animated Main Dashboard Area */}
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
          Mining Dashboard
        </motion.h1>

        {errorMessage && (
          <motion.div
            className="alert-error bg-red-600 p-2 rounded mb-4 text-yellow-100 text-center"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Session Data Card */}
        <div className="flex justify-center gap-6 mb-6">
          {sessionData ? (
            <motion.div
              className="card bg-black border border-yellow-400 p-4 rounded-lg shadow-lg text-yellow-400 transition-all hover:scale-110"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-yellow-400 text-2xl" />
                <h2 className="text-2xl font-semibold">Session Data</h2>
              </div>
              <p className="mt-2">
                <strong>User ID:</strong> {sessionData.userId}
              </p>
              <p className="mt-2">
                <strong>Username:</strong> {sessionData.username}
              </p>
              <p className="mt-2">
                <strong>Coins Mined:</strong> {sessionData.coinsMined} Coins
                
              </p>
              <p className="mt-2">
                <strong>Elapsed Time:</strong> {Math.floor(sessionData.elapsedTime / 60)} minutes
              </p>
              <p className="mt-2">
                <strong>Is Mining:</strong> {sessionData.isMining ? "Yes" : "No"}
              </p>
            </motion.div>
          ) : (
            <motion.div className="card bg-black border border-yellow-400 p-4 rounded-lg shadow-lg text-center text-yellow-300">
              <div className="flex justify-center items-center">
                <FaBitcoin className="text-yellow-400 text-2xl" />
                <p>Loading session data...</p>
              </div>
            </motion.div>
          )}
        </div>

    

     

        <Footer />
      </motion.div>
    </>
  );
}

export default Start;
