import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaBitcoin, FaDollarSign, FaQuoteLeft, FaExchangeAlt } from "react-icons/fa";
import Footer from "./layout/Footer";
import NavDash from "./layout/NavDash";

function Start() {
  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [quote, setQuote] = useState("");
  const [currencyRate, setCurrencyRate] = useState(null);

  // Fetch mining session data
  const fetchStartMining = async () => {
    try {
      const Token = localStorage.getItem("Token");

      if (!Token) {
        alert("You need to log in first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/mining/start",
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response?.data?.session) {
        setSessionData(response.data.session);
      } else {
        setErrorMessage("Failed to fetch mining session data.");
      }
    } catch (error) {
      console.error("Error starting mining session:", error.message);
      setErrorMessage("An error occurred while starting mining.");
    }
  };

  const fetchMotivationalQuote = async () => {
    try {
      const response = await axios.get("https://zenquotes.io/api/random");
      if (response?.data?.length) {
        setQuote(response.data[0].q + " —" + response.data[0].a);
      }
    } catch (error) {
      console.error("Error fetching motivational quote", error.message);
      setQuote("Stay motivated and keep pushing forward!");
    }
  };

  const fetchCurrencyRate = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate.host/latest?base=USD&symbols=EUR,GBP"
      );
      if (response?.data?.rates) {
        setCurrencyRate({
          USDToEUR: response.data.rates.EUR.toFixed(2),
          USDToGBP: response.data.rates.GBP.toFixed(2),
        });
      }
    } catch (error) {
      console.error("Error fetching exchange rates", error.message);
      setCurrencyRate({
        USDToEUR: "N/A",
        USDToGBP: "N/A",
      });
    }
  };

  useEffect(() => {
    fetchStartMining();
    fetchMotivationalQuote();
    fetchCurrencyRate();
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
              {console.log(sessionData)}
              <p className="mt-6">
                <strong>User ID:</strong> {sessionData.userId}
              </p>
              <p className="mt-6">
                <strong>Username:</strong> {sessionData.username}
              </p>
              <p className="mt-6">
                <strong>Is Mining:</strong> {sessionData.isMining ? "Yes" : "No"}
              </p>
              <p className="mt-6">
                <strong>Coins Mined:</strong> {sessionData.coinsMined}
              </p>
              <p className="mt-6">
                <strong>Elapsed Time:</strong> {Math.floor(sessionData.elapsedTime)} secs
              </p><p className="mt-6">
                <strong>Elapsed Time:</strong> {Math.floor(sessionData.elapsedTime/3600)} Hours
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
      

        {/* Motivational Quotes */}
        <motion.div
          className="card bg-black border-yellow-300 border p-4 rounded-lg shadow-lg text-yellow-400 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaQuoteLeft className="text-yellow-400 text-lg" />
            <h2 className="text-lg font-semibold mb-2">Daily Motivation</h2>
          </div>
          <p className="italic text-gray-300">"{quote}"</p>
        </motion.div>

        {/* Currency Exchange Rates */}
        <motion.div
          className="card bg-black border-yellow-300 border p-4 rounded-lg shadow-lg text-yellow-400 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaExchangeAlt className="text-yellow-400 text-lg" />
            <h2 className="text-lg font-semibold mb-2">Currency Exchange Rates</h2>
          </div>
          {currencyRate ? (
            <>
              <p><strong>USD to EUR:</strong> €{currencyRate.USDToEUR}</p>
              <p><strong>USD to GBP:</strong> £{currencyRate.USDToGBP}</p>
            </>
          ) : (
            <p>Loading rates...</p>
          )}
        </motion.div>

        <Footer />
      </motion.div>
    </>
  );
}

export default Start;
