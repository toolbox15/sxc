import { useState, useEffect } from 'react';
import ChristmasTheme from './ChristmasTheme';
import BistroTheme from './BistroTheme';
import BearsTheme from './BearsTheme';
import LiveStreamTheme from './LiveStreamTheme';
import SlideshowTheme from './SlideshowTheme';
import SuspendedTheme from './SuspendedTheme';

// Define the shape of our Ad data (Flexible to handle Menu or Playlist items)
interface Ad {
  Title: string;
  ImageURL: string;
  MediaURL?: string; // For Playlist
  Status: string;
  Price: string;
  Target_Screen: string; // Used in Ads tab
  Client_ID?: string; // Used in Playlist tab
  Category: string;
  Color?: string;
  Description?: string;
  Schedule?: string;
  Duration?: number; // For Playlist
  Fit?: string; // For Playlist
  Transition?: string; // For Playlist
  Rotation?: number; // For Playlist
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
    let selectedTheme = "Corporate";

    if (lowerId.includes("joespizza") || lowerId.includes("bbq")) {
        selectedTheme = "Christmas"; 
    } 
    else if (lowerId.includes("bistro")) {
        selectedTheme = "Bistro";
    }
    else if (lowerId.includes("bears")) {
        selectedTheme = "Bears";
    }
    else if (lowerId.includes("live") || lowerId.includes("broadcast")) {
        selectedTheme = "Broadcast"; // <--- NEW: Live Video Mode
    }
    else if (lowerId.includes("tv") || lowerId.includes("slide") || lowerId.includes("tire")) {
        selectedTheme = "Slideshow"; // <--- NEW: Full Screen Ad Mode
    }

    setTheme(selectedTheme);

    // --- 2. DATA FETCHER (NOW SUPPORTS TABS) ---
    const fetchData = async () => {
      try {
        if (!API_URL) return;
        
        // INTELLIGENT ROUTING: 
        // If theme is Slideshow, fetch from 'Playlist' tab. Otherwise, fetch from 'Ads'.
        const tabName = selectedTheme === "Slideshow" ? "Playlist" : "Ads";
        
        // Pass the tab name to the API
        const res = await fetch(`${API_URL}?tab=${tabName}`); 
        const data = await res.json();
        
        // Filter by Client ID (Handles both 'Target_Screen' and 'Client_ID' columns)
        const relevantData = data.filter((item: any) => {
           const target = item.Target_Screen || item.Client_ID;
           // If target is undefined/empty, assume it doesn't match
           if (!target) return false; 
           return target === 'All' || target === deviceId;
        });
        
        setAds(relevantData);
        setIsLoading(false); 
      } catch (error) { 
        console.error("Error fetching data:", error);
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

  // ☠️ PRIORITY 1: KILL SWITCH (Check for LOCKED status)
  const isLocked = ads.some((ad: any) => ad.Category === 'LOCKED' && ad.Status === 'Active');
  if (isLocked) {
     return <SuspendedTheme />;
  }

  // --- THEME ROUTER ---

  if (theme === 'Bears') {
     return <BearsTheme ads={ads} />;
  }

  if (theme === 'Bistro') {
     return <BistroTheme ads={ads} />;
  }

  if (theme === 'Christmas') {
     return <ChristmasTheme ads={ads} />;
  }

  if (theme === 'Broadcast') {
     return <LiveStreamTheme ads={ads} />;
  }

  if (theme === 'Slideshow') {
     // Cast 'ads' to 'any' because the Playlist structure is slightly different
     return <SlideshowTheme playlist={ads as any[]} />;
  }
  
  // ROUTE: Default / Corporate
  return (
    <div className="bg-white text-black h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to {deviceId}</h1>
        <p className="mt-4 text-gray-500">Theme: {theme}</p>
        <p className="text-sm text-gray-400">Waiting for content assignment.</p>
    </div>
  );
}
