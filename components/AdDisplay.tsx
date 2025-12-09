import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------
// 🚨 TEMPORARILY DISABLED EXTERNAL THEMES TO FIX BUILD CRASH
// ---------------------------------------------------------
// import ChristmasTheme from './ChristmasTheme';
// import BistroTheme from './BistroTheme';
// import BearsTheme from './BearsTheme';
// import LiveStreamTheme from './LiveStreamTheme';
// import SlideshowTheme from './SlideshowTheme';
// import SuspendedTheme from './SuspendedTheme';
// import TireShopTheme from './themes/TireShopTheme'; 

// ==========================================
// ⚡ INTERNAL NEON THEME (Safe to use)
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
              style={{ 
                background: `linear-gradient(to bottom right, ${color1}, ${color2}) border-box`,
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }} 
         />
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <motion.rect 
          x="3" y="3" width="99%" height="98%" 
          fill="none" stroke="white" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round" rx="6" ry="6" 
          animate={{ strokeDashoffset: [0, -60] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="relative z-10 h-full w-full bg-black/90 flex flex-col border border-white/10 rounded-lg overflow-hidden">
        <div className="flex-1 w-full overflow-hidden relative group">
           <AnimatePresence mode='wait'>
             <motion.img 
               key={index}
               src={currentItem.ImageURL} 
               initial={{ x: 300, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -300, opacity: 0 }}
               transition={{ duration: 0.5 }}
               className="absolute inset-0 w-full h-full object-cover opacity-90" 
               alt="Content" 
             />
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
// 🚨 MAIN CONTROLLER
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

      // Simple Logic for now
      if (lowerId.includes("neon") || lowerId.includes("tech")) selectedTheme = "Neon"; 
      
      setTheme(selectedTheme);

      const res = await fetch(`${API_URL}?tab=Ads`);
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

  if (isLoading) return <div className="h-screen bg-black text-white flex items-center justify-center">LOADING v3.0...</div>;

  return (
    <>
      {(() => {
        // ONLY NEON IS ACTIVE RIGHT NOW
        if (theme === 'Neon') return <NeonGameDayTheme ads={ads} />;
        
        // Default Corporate Screen (White)
        return (
            <div className="bg-white text-black h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to {deviceId}</h1>
                <p className="mt-4 text-gray-500">Theme: {theme}</p>
                <div className="p-4 bg-gray-100 rounded text-sm text-gray-600 mt-4">
                   Other themes are temporarily disabled to fix the crash.
                </div>
            </div>
        );
      })()}

      {/* DEBUG BOX: IF YOU SEE THIS, THE UPDATE WORKED */}
      <div className="fixed bottom-0 right-0 bg-red-600 text-white p-2 text-xs font-mono z-[9999]">
         v3.0 RESET | ID: {deviceId}
      </div>
    </>
  );
}
