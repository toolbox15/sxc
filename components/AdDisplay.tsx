import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

// Import all themes
import ChristmasTheme from './ChristmasTheme';
import BistroTheme from './BistroTheme';
import BearsTheme from './BearsTheme';
import LiveStreamTheme from './LiveStreamTheme';
import SlideshowTheme from './SlideshowTheme';
import SuspendedTheme from './SuspendedTheme';
import TireShopTheme from './themes/TireShopTheme'; // <--- NEW IMPORT

// Define the shape of our Ad data
interface Ad {
  Title: string;
  ImageURL: string;
  MediaURL?: string;
  Status: string;
  Price: string;
  Target_Screen: string;
  Client_ID?: string;
  Category: string;
  Color?: string;
  Description?: string;
  Schedule?: string;
  Duration?: number;
  Fit?: string;
  Transition?: string;
  Rotation?: number;
}

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  const [theme, setTheme] = useState<string>("Corporate");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false); // Track connection status

  // --- 1. DATA FETCHER (WITH BACKUP SYSTEM) ---
  const fetchData = async () => {
    try {
      if (!API_URL) throw new Error("No API URL");
      
      // Determine Theme Logic based on ID
      const lowerId = deviceId.toLowerCase();
      let selectedTheme = "Corporate";

      if (lowerId.includes("joespizza") || lowerId.includes("bbq")) selectedTheme = "Christmas"; 
      else if (lowerId.includes("bistro")) selectedTheme = "Bistro";
      else if (lowerId.includes("bears")) selectedTheme = "Bears";
      else if (lowerId.includes("live") || lowerId.includes("broadcast")) selectedTheme = "Broadcast";
      else if (lowerId.includes("tv") || lowerId.includes("slide")) selectedTheme = "Slideshow";
      else if (lowerId.includes("tire") || lowerId.includes("auto") || lowerId.includes("shop")) selectedTheme = "TireShop"; // <--- NEW ROUTE
      
      setTheme(selectedTheme);

      const tabName = selectedTheme === "Slideshow" ? "Playlist" : "Ads";
      const res = await fetch(`${API_URL}?tab=${tabName}`);
      
      if (!res.ok) throw new Error("Network Error");
      
      const data = await res.json();
      
      // Filter Data
      const relevantData = data.filter((item: any) => {
          const target = item.Target_Screen || item.Client_ID;
          if (!target) return false; 
          return target === 'All' || target === deviceId;
      });
      
      // ✅ SUCCESS: Save to Local Backup (Bunker Mode)
      localStorage.setItem(`backup_${deviceId}`, JSON.stringify(relevantData));
      
      setAds(relevantData);
      setIsLoading(false);
      setIsOffline(false); 

    } catch (error) { 
      console.warn("Offline Mode Activated");
      setIsOffline(true); // Trigger red icon
      
      // 🚨 FAILURE: Load from Local Backup
      const backup = localStorage.getItem(`backup_${deviceId}`);
      if (backup) {
          setAds(JSON.parse(backup));
          setIsLoading(false);
      }
    }
  };

  // --- 2. INTELLIGENT RECONNECT LISTENER ---
  useEffect(() => {
    fetchData(); // Run once on mount

    // A. Standard Poll (Every 30s)
    const interval = setInterval(fetchData, 30000);

    // B. "Internet is Back!" Listener (Instant Trigger)
    const handleOnline = () => {
      console.log("Internet Restored! Refreshing Data...");
      fetchData(); 
      setIsOffline(false);
    };

    const sendHeartbeat = async () => {
      try {
        await fetch(`${API_URL}?action=heartbeat&device_id=${deviceId}`, { mode: 'no-cors' });
      } catch (e) {}
    };
    const heartbeatInterval = setInterval(sendHeartbeat, 60000);

    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      clearInterval(heartbeatInterval);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (isLoading) {
    return <div className="h-screen w-screen bg-black text-white flex items-center justify-center">Loading System...</div>;
  }

  // --- RENDER ---
  return (
    <>
      {/* ⚠️ OFFLINE INDICATOR (Tiny red icon if net is down) */}
      {isOffline && (
        <div className="absolute top-2 right-2 z-[9999] bg-red-600 text-white p-2 rounded-full opacity-50 animate-pulse">
          <WifiOff size={20} />
        </div>
      )}

      {/* THEME RENDERER */}
      {(() => {
        // 1. Check Kill Switch
        const isLocked = ads.some((ad: any) => ad.Category === 'LOCKED' && ad.Status === 'Active');
        if (isLocked) return <SuspendedTheme />;

        // 2. Load Theme
        if (theme === 'Bears') return <BearsTheme ads={ads} />;
        if (theme === 'Bistro') return <BistroTheme ads={ads} />;
        if (theme === 'Christmas') return <ChristmasTheme ads={ads} />;
        if (theme === 'Broadcast') return <LiveStreamTheme ads={ads} />;
        if (theme === 'Slideshow') return <SlideshowTheme playlist={ads as any[]} />;
        if (theme === 'TireShop') return <TireShopTheme ads={ads} />; // <--- NEW COMPONENT
        
        // 3. Default
        return (
            <div className="bg-white text-black h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to {deviceId}</h1>
                <p className="mt-4 text-gray-500">Theme: {theme}</p>
                <p className="text-sm text-gray-400">Waiting for content assignment.</p>
            </div>
        );
      })()}
    </>
  );
}
