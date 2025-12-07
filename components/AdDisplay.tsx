import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

// --- IMPORT EXISTING THEMES (Keep these) ---
import ChristmasTheme from './ChristmasTheme';
import BistroTheme from './BistroTheme';
import BearsTheme from './BearsTheme';
import LiveStreamTheme from './LiveStreamTheme';
import SlideshowTheme from './SlideshowTheme';
import SuspendedTheme from './SuspendedTheme';
import TireShopTheme from './themes/TireShopTheme';

// ==========================================
// 🚨 PART 1: THE NEON THEME (BUILT-IN)
// ==========================================

const TechCard = ({ title, price, children, color = 'blue', delay = 0 }: any) => {
  const colors: any = {
    blue: { outer: 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]', inner: 'border-blue-300', text: 'text-blue-400' },
    red: { outer: 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]', inner: 'border-red-400', text: 'text-red-500' },
    orange: { outer: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]', inner: 'border-orange-300', text: 'text-orange-400' }
  };
  const c = colors[color] || colors.blue;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="relative h-full w-full bg-black/80 flex flex-col p-1"
    >
      <div className={`absolute -top-[2px] -left-[2px] w-6 h-6 border-t-4 border-l-4 ${c.outer} z-20`} />
      <div className={`absolute -top-[2px] -right-[2px] w-6 h-6 border-t-4 border-r-4 ${c.outer} z-20`} />
      <div className={`absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-4 border-l-4 ${c.outer} z-20`} />
      <div className={`absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-4 border-r-4 ${c.outer} z-20`} />

      <div className={`relative h-full w-full border ${c.inner} border-opacity-50 flex flex-col z-0`}>
        <div className="h-3/4 w-full overflow-hidden relative">
           {children}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
        </div>
        <div className="h-1/4 bg-gray-900/90 border-t border-white/10 flex flex-col items-center justify-center">
            <h3 className="text-white font-black text-xl uppercase tracking-wider drop-shadow-md">{title}</h3>
            <span className={`text-3xl font-black ${c.text} drop-shadow-[0_0_10px_currentColor]`}>{price}</span>
        </div>
      </div>
    </motion.div>
  );
};

const DUMMY_MENU = {
  featured: [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80", Category: "Main" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80", Category: "Main" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", Category: "Main" }
  ],
  offers: [
    { Title: "HALF-OFF APPS", Description: "UNTIL KICKOFF" },
    { Title: "BEER OF THE MONTH", Description: "HAZY HOPPER - $7" }
  ]
};

const NeonGameDayTheme: React.FC<{ ads?: any[] }> = ({ ads = [] }) => {
  const featured = ads && ads.filter(ad => ad.Category === 'Main').length > 0 
      ? ads.filter(ad => ad.Category === 'Main') 
      : DUMMY_MENU.featured;
  const offers = ads && ads.filter(ad => ad.Category === 'Offer').length > 0
      ? ads.filter(ad => ad.Category === 'Offer')
      : DUMMY_MENU.offers;

  return (
    <div className="w-full h-screen bg-black p-8 flex flex-col gap-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a2e_0%,#000000_100%)] z-0" />
      <div className="relative z-10 h-[15%] w-full flex items-center justify-between border-b-4 border-red-600 bg-black/50 px-8 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)]">
          <div className="flex flex-col"><h1 className="text-6xl font-black text-white italic tracking-tighter drop-shadow-[4px_4px_0_#b91c1c]">GAME DAY <span className="text-blue-500">MENU</span></h1></div>
          <div className="flex items-center gap-6 border-2 border-white/20 bg-black px-6 py-2 rounded-lg">
             <div className="text-center"><div className="text-gray-400 text-xs font-bold">HOME</div><div className="text-4xl font-black text-white">24</div></div>
             <div className="text-red-500 font-bold animate-pulse">VS</div>
             <div className="text-center"><div className="text-gray-400 text-xs font-bold">AWAY</div><div className="text-4xl font-black text-white">21</div></div>
          </div>
      </div>
      <div className="relative z-10 h-[65%] grid grid-cols-3 gap-8 px-4">
          <TechCard title={featured[0]?.Title} price={featured[0]?.Price} color="red" delay={0.1}><img src={featured[0]?.ImageURL} className="w-full h-full object-cover" alt="Food" /></TechCard>
          <TechCard title={featured[1]?.Title || "Loading..."} price={featured[1]?.Price || ""} color="blue" delay={0.3}><img src={featured[1]?.ImageURL || ""} className="w-full h-full object-cover" alt="Food" /></TechCard>
          <TechCard title={featured[2]?.Title || "Loading..."} price={featured[2]?.Price || ""} color="orange" delay={0.5}><img src={featured[2]?.ImageURL || ""} className="w-full h-full object-cover" alt="Food" /></TechCard>
      </div>
      <div className="relative z-10 h-[15%] flex gap-4">
        {offers.map((offer: any, i: number) => (
            <div key={i} className="flex-1 border-2 border-dashed border-gray-700 bg-gray-900/80 rounded-lg flex items-center justify-center gap-4 shadow-lg">
                <span className="text-yellow-400 font-black text-2xl uppercase animate-pulse">{offer.Title}:</span>
                <span className="text-white font-bold text-xl tracking-widest">{offer.Description}</span>
            </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 🚨 PART 2: THE MAIN CONTROLLER (ROUTER)
// ==========================================

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  // FORCE DEFAULT TO NEON to prove it works
  const [theme, setTheme] = useState<string>("Neon"); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false); 

  const fetchData = async () => {
    try {
      if (!API_URL) throw new Error("No API URL");
      
      const lowerId = deviceId.toLowerCase();
      let selectedTheme = "Neon"; // Default to Neon

      if (lowerId.includes("joespizza") || lowerId.includes("bbq")) selectedTheme = "Christmas"; 
      else if (lowerId.includes("bistro")) selectedTheme = "Bistro";
      else if (lowerId.includes("bears")) selectedTheme = "Bears";
      else if (lowerId.includes("live") || lowerId.includes("broadcast")) selectedTheme = "Broadcast";
      else if (lowerId.includes("tv") || lowerId.includes("slide")) selectedTheme = "Slideshow";
      else if (lowerId.includes("tire") || lowerId.includes("auto")) selectedTheme = "TireShop";
      else if (lowerId.includes("neon") || lowerId.includes("tech")) selectedTheme = "Neon"; 
      
      setTheme(selectedTheme);
      // Fetch Data Logic
      const tabName = selectedTheme === "Slideshow" ? "Playlist" : "Ads";
      const res = await fetch(`${API_URL}?tab=${tabName}`);
      if (!res.ok) throw new Error("Network Error");
      const data = await res.json();
      const relevantData = data.filter((item: any) => {
          const target = item.Target_Screen || item.Client_ID;
          if (!target) return false; 
          return target === 'All' || target === deviceId;
      });
      setAds(relevantData);
      setIsLoading(false);
      setIsOffline(false); 
    } catch (error) { 
      console.warn("Offline Mode Triggered");
      setIsOffline(true); 
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 30000);
    const handleOnline = () => { fetchData(); setIsOffline(false); };
    window.addEventListener('online', handleOnline
