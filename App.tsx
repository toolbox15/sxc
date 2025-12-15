// App.tsx - UPDATED WITH DATA FETCHING AND 30-SECOND REFRESH

import React, { useState, useEffect } from 'react';
import AdDisplay from './components/AdDisplay';

// --- DATA STRUCTURE (Must match your expected sheet output) ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
  Color?: string;
  Target_Screen?: string;
}

// ⚠️ IMPORTANT: Replace this URL with your actual Google Apps Script (GAS) Web App URL
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec"; 

function App() {
  const [ads, setAds] = useState<AdItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- DATA FETCHING FUNCTION ---
  const fetchData = async () => {
    try {
      console.log("Fetching new data from API...");
      const response = await fetch(GAS_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AdItem[] = await response.json();
      setAds(data);
      setError(null);
    } catch (err) {
      console.error("Could not fetch data:", err);
      setError("Failed to load menu data. Check API URL.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- EFFECT HOOK: Handles Initial Load and 30-Second Refresh ---
  useEffect(() => {
    // 1. Initial Data Fetch
    fetchData();

    // 2. Set up the Refresh Interval (30,000 milliseconds = 30 seconds)
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    // 3. Cleanup function: Clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount


  // --- RENDER LOGIC ---
  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center bg-black text-white text-3xl">Loading Menu...</div>;
  }

  if (error) {
    return <div className="w-full h-screen flex items-center justify-center bg-red-800 text-white text-3xl">{error}</div>;
  }

  // Pass the fetched 'ads' data down to the AdDisplay router component
  return <AdDisplay ads={ads} />; 
}

export default App;
