import { useState, useEffect } from 'react';
import ChristmasTheme from './ChristmasTheme';

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

  // --- 1. TRAFFIC COP (Runs immediately, doesn't wait for Google Sheets) ---
  useEffect(() => {
    const lowerId = deviceId.toLowerCase();
    console.log("System detected ID:", lowerId);

    // If ID is "joespizza_lobby", this will set theme to Christmas
    if (lowerId.includes("joespizza") || lowerId.includes("bbq")) {
        setTheme("Christmas"); 
    } else {
        setTheme("Corporate");
    }
  }, []); // Empty brackets = Runs once when page loads

  // --- 2. DATA FETCHER (Runs in background) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // Filter ads for this specific device
        const relevantAds = data.filter((ad: Ad) => 
            ad.Status === 'Active' && 
            (ad.Target_Screen === 'All' || ad.Target_Screen === deviceId)
        );
        
        setAds(relevantAds);
        setIsLoading(false); 
      } catch (error) { 
        console.error("Error fetching ads:", error);
        // Even if data fails, we stop loading so the Theme can show (empty)
        setIsLoading(false);
      }
    };

    // Heartbeat logic
    const sendHeartbeat = async () => {
      try {
        await fetch(`${API_URL}?action=heartbeat&device_id=${deviceId}`, { mode: 'no-cors' });
      } catch (e) {}
    };

    fetchData();
    sendHeartbeat();
    
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
