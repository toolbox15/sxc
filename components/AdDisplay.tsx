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
        
        // 1. DETERMINE THEME LOGIC
        // If the URL contains JoesPizza or BBQ, force the Christmas theme
        if (deviceId.includes("JoesPizza") || deviceId.includes("BBQ")) {
            setTheme("Christmas"); 
        } else {
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
    return <div className="h-screen w-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  // 3. CHECK THEME AND RENDER
  if (theme === 'Christmas') {
     return <ChristmasTheme ads={ads} />;
  }
  
  // 4. DEFAULT RENDER (Corporate/Standard)
  return (
    <div className="bg-white text-black h-screen flex items-center justify-center">
        <h1 className="text-4xl">Welcome to {deviceId}</h1>
    </div>
  );
}
