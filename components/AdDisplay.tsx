import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORT ALL THEMES ---
// Now that TireShopTheme.tsx exists in the root folder, this works!
import ChristmasTheme from './ChristmasTheme';
import BistroTheme from './BistroTheme';
import BearsTheme from './BearsTheme';
import LiveStreamTheme from './LiveStreamTheme';
import SlideshowTheme from './SlideshowTheme';
import SuspendedTheme from './SuspendedTheme';
import TireShopTheme from './TireShopTheme'; // <--- No longer disabled

// ==========================================
// ⚡ INTERNAL NEON THEME (Backup)
// ==========================================
const SlideshowCard = ({ items, color1 = "#ff0000", color2 = "#0088ff" }: any) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (items.length < 2) return; 
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [items.length]);
  const currentItem = items[index] || { Title: "LOADING", Price: "...", ImageURL: "" };
  return (
    <div className="relative h-full w-full p-1 flex flex-col">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <div className="absolute inset-0 border-[4px] md:border-[6px] border-transparent rounded-lg" 
              style={{ background: `linear-gradient(to bottom right, ${color1}, ${color2}) border-box`, WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      </div>
      <div className="relative z-10 h-full w-full bg-black/90 flex flex-col border border-white/10 rounded-lg overflow-hidden">
        <div className="flex-1 w-full overflow-hidden relative group">
           <AnimatePresence mode='wait'>
             <motion.img key={index} src={currentItem.ImageURL} initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Content" />
           </AnimatePresence>
        </div>
        <div className="h-24 shrink-0 bg-gray-900 flex flex-col items-center justify-center border-t-2 border-blue-500/50 p-2 z-20">
            <h3 className="text-white font-black text-xl uppercase tracking-wider text-center leading-none mb-1">{currentItem.Title}</h3>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">{currentItem.Price}</span>
        </div>
      </div>
    </div>
  );
};

const NeonGameDayTheme = ({ ads }: any) => {
  const mainItems = ads.filter((ad:any) => ad.Category === 'Main');
  const drinkItems = ads.filter((ad:any) => ad.Category === 'Drinks');
  const getPair = (i: number) => [mainItems[i] || {}, drinkItems[i] || {}];
  return (
    <div className="w-full h-screen bg-[#050510] flex flex-col font-sans overflow-hidden relative">
      <div className="shrink-0 w-full p-6 flex items-center justify-between border-b-4 border-red-600 bg-black/60 z-20">
          <h1 className="text-7xl font-black text-white italic tracking-tighter">GAME DAY <span className="text-blue-500">MENU</span></h1>
      </div>
      <div className="flex-1 w-full p-8 grid grid-cols-3 gap-8 z-10">
          <SlideshowCard items={getPair(0)} color1="#ff0000" color2="#0000ff" />
          <SlideshowCard items={getPair(1)} color1="#0088ff" color2="#00ffff" />
          <SlideshowCard items={getPair(2)} color1="#ff8800" color2="#ffff00" />
      </div>
    </div>
  );
};

// ==========================================
// 🚨 MAIN CONTROLLER (v5.0 FINAL)
// ==========================================
const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  const [theme, setTheme] = useState<string>("Corporate"); 
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      if (!API_URL) return;
      const lowerId = deviceId.toLowerCase();
      let selectedTheme = "Corporate";

      if (lowerId.includes("joespizza") || lowerId.includes("bbq")) selectedTheme = "Christmas"; 
      else if (lowerId.includes("bistro")) selectedTheme = "Bistro";
      else if (lowerId.includes("bears")) selectedTheme = "Bears";
      else if (lowerId.includes("live") || lowerId.includes("broadcast")) selectedTheme = "Broadcast";
      else if (lowerId.includes("tv") || lowerId.includes("slide")) selectedTheme = "Slideshow";
      else if (lowerId.includes("tire") || lowerId.includes("auto")) selectedTheme = "TireShop"; // <--- Enabled!
      else if (lowerId.includes("neon") || lowerId.includes("tech")) selectedTheme = "Neon"; 
      
      setTheme(selectedTheme);

      const tabName = selectedTheme === "Slideshow" ? "Playlist" : "Ads";
      const res = await fetch(`${API_URL}?tab=${tabName}`);
      const data = await res.json();
      const relevantData = data.filter((item: any) => {
          const target = item.Target_Screen || item.Client_ID;
          return !target || target === 'All' || target === deviceId;
      });
      setAds(relevantData);
      setIsLoading(false);
    } catch (error) { setIsLoading(false); }
  };

  useEffect(() => { fetchData(); setInterval(fetchData, 30000); }, []);

  if (isLoading) return <div className="h-screen bg-black text-white flex items-center justify-center">LOADING v5.0...</div>;

  return (
    <>
      {(() => {
        const isLocked = ads.some((ad: any) => ad.Category === 'LOCKED' && ad.Status === 'Active');
        if (isLocked) return <SuspendedTheme />;

        if (theme === 'Bears') return <BearsTheme ads={ads} />;
        if (theme === 'Bistro') return <BistroTheme ads={ads} />;
        if (theme === 'Christmas') return <ChristmasTheme ads={ads} />;
        if (theme === 'Broadcast') return <LiveStreamTheme ads={ads} />;
        if (theme === 'Slideshow') return <SlideshowTheme playlist={ads} />;
        if (theme === 'TireShop') return <TireShopTheme ads={ads} />;
        if (theme === 'Neon') return <NeonGameDayTheme ads={ads} />;
        
        return (
            <div className="bg-white text-black h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to {deviceId}</h1>
                <p className="mt-4 text-gray-500">Theme: {theme}</p>
                <p className="text-sm text-gray-400">Waiting for content.</p>
            </div>
        );
      })()}
      
      {/* FINAL DEBUG BOX */}
      <div className="fixed bottom-0 right-0 bg-green-600 text-white p-2 text-xs font-mono z-[9999]">
         v5.0 FINAL | ID: {deviceId}
      </div>
    </>
  );
}
