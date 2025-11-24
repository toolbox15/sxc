import { useState, useEffect } from 'react';
import ChristmasTheme from './ChristmasTheme';
import BistroTheme from './BistroTheme'; // <--- NEW IMPORT

// Define the shape of our Ad data to prevent errors
interface Ad {
  Title: string;
  ImageURL: string;
  Status: string;
  Price: string;
  Target_Screen: string;
  Category: string;
  Color?: string;
  Description?: string;
}

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [theme, setTheme] = useState<string>("Corporate");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- 1. TRAFFIC COP LOGIC ---
  useEffect(() => {
    const lowerId = deviceId.toLowerCase();
    console.log("System detected ID:", lowerId);

    // LOGIC: Check the URL to decide which Theme file to load
    if (lowerId.includes("joespizza") || lowerId.includes("bbq")) {
        setTheme("Christmas"); 
    } 
    else if (lowerId.includes("bistro")) {
        setTheme("Bistro"); // <--- NEW RULE
    }
    else {
        setTheme("Corporate");
    }
  }, []); 

  // --- 2. DATA FETCHER ---
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

  // ROUTE: Bistro Theme
  if (theme === 'Bistro') {
     return <BistroTheme ads={ads} />;
  }

  // ROUTE: Christmas Theme
  if (theme === 'Christmas') {
     return <ChristmasTheme ads={ads} />;
  }
  
  // ROUTE: Default / Corporate
  return (
    <div className="bg-white text-black h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to {deviceId}</h1>
        <p className="mt-4 text-gray-500">Theme: {theme}</p>
        <p className="text-sm text-gray-400">Add '?id=JoesBistro' to URL to test.</p>
    </div>
  );
}
