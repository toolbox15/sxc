import { useState, useEffect } from 'react';
import ChristmasTheme from './ChristmasTheme';

// Define the shape of our Ad data to prevent errors
interface Ad {
  Title: string;
  ImageURL: string;
  Status: string;
  Price: string;
  Target_Screen: string;
  Category: string;
}

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
// Defaults to "Lobby_Screen_1" if no ID is provided in the URL
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [theme, setTheme] = useState<string>("Corporate");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // --- DEBUGGING LOG ---
        // Open your browser console (F12) to see this value. 
        // It confirms exactly what ID the system sees.
        console.log("System detected Device ID:", deviceId);

        // 1. DETERMINE THEME LOGIC (UPDATED)
        // We convert the ID to lowercase so "JoesPizza", "joespizza", and "JOESPIZZA" all work.
        const lowerId = deviceId.toLowerCase();

        if (lowerId.includes("joespizza") || lowerId.includes("bbq")) {
            console.log("Theme set to: Christmas"); // Debug log
            setTheme("Christmas"); 
        } else {
            console.log("Theme set to: Corporate"); // Debug log
            setTheme("Corporate");
        }

        // 2. FILTER ADS FOR THIS DEVICE
        const relevantAds = data.filter((ad: Ad) => 
            ad.Status === 'Active' && 
            (ad.Target_Screen === 'All' || ad.Target_Screen === deviceId)
        );
        
        setAds(relevantAds);
        setIsLoading(false); 
      } catch (error) { 
        console.error("Error fetching ads:", error);
        setIsLoading(false);
      }
    };

    // Heartbeat logic
    const sendHeartbeat = async () => {
      try {
        if (!API_URL) return;
        await fetch(`${API_URL}?action=heartbeat&device_id=${deviceId}`, { mode: 'no-cors' });
      } catch (e) {}
    };

    fetchData();
    sendHeartbeat();
    
    // Set Timers
    const dataInterval = setInterval(fetchData, 30000);
    const heartbeatInterval = setInterval(sendHeartbeat, 60000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(heartbeatInterval);
    };
  }, []);

  // --- RENDER LOGIC ---

  if (isLoading) {
    return <div className="h-screen w-screen bg-black text-white flex items-center justify-center">Loading System...</div>;
  }

  // 3. CHECK THEME AND RENDER
  if (theme === 'Christmas') {
     return <ChristmasTheme ads={ads} />;
  }
  
  // 4. DEFAULT RENDER (Corporate/Standard)
  return (
    <div className="bg-white text-black h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to {deviceId}</h1>
        <p className="mt-4 text-gray-500">Theme: {theme}</p>
    </div>
  );
}
