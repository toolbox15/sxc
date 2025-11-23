import { useState, useEffect } from 'react';
import ChristmasTheme from './ChristmasTheme'; // Make sure this matches your file name

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  const [theme, setTheme] = useState("Corporate"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // 1. DETERMINE THEME
        // Ideally, we would read this from the Sheet, but for now let's use the ID
        if (deviceId.includes("JoesPizza") || deviceId.includes("BBQ")) {
            setTheme("Christmas"); // <--- FORCING CHRISTMAS THEME HERE FOR YOU
        } else {
            setTheme("Corporate");
        }

        // 2. FILTER ADS
        const relevantAds = data.filter((ad:any) => 
            ad.Status === 'Active' && 
            (ad.Target_Screen === 'All' || ad.Target_Screen === deviceId)
        );
        setAds(relevantAds);
      } catch (error) { console.error(error); }
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
    setInterval(fetchData, 30000);
    setInterval(sendHeartbeat, 60000);
  }, []); // <--- useEffect ENDS HERE

  // --- THE TRAFFIC COP (Must be OUTSIDE useEffect) ---
  
  // 3. CHECK THEME AND RENDER
  if (theme === 'Christmas') {
     return <ChristmasTheme ads={ads} />;
  }
  
  // 4. DEFAULT RENDER (Corporate/Standard)
  return (
    <div className="bg-white text-black h-screen flex items-center justify-center">
        <h1 className="text-4xl">Welcome to {deviceId}</h1>
        {/* You can put your standard corporate layout here */}
    </div>
  );
}
