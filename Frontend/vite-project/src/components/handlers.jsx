import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Handle Start Mining
export const handleStartMining = async (navigate) => {

  try {
    const Token = localStorage.getItem('Token'); 

    if (!Token) {
      alert('You need to log in first');
      return;
    }

    

    
    window.location.href = '/start';
    // Navigate to another route

    
  } catch (error) {
    console.error('Error starting mining:', error.response?.data || error.message);
  }

};

// Other handlers remain unchanged
export const handleStopMining = () => {

  try {
    const Token = localStorage.getItem('Token'); 

    if (!Token) {
      alert('You need to log in first');
      return;
    }

    

    
    window.location.href = '/stop';
    // Navigate to another route

    
  } catch (error) {
    console.error('Error starting mining:', error.response?.data || error.message);
  }
};

export const handleCheckStatus = () => {
  window.location.href = '/status';

};

export const handleViewProgress = () => {
  window.location.href = '/progress';

};

export const handleClaimRewards = () => {
  window.location.href = '/rewards';

};
