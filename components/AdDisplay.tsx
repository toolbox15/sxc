import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 🔄 COMPONENT: SLIDING NEON CARD
// ==========================================
const SlideshowCard = ({ items, color1 = "#ff0000", color2 = "#0088ff" }: any) => {
  const [index, setIndex] = useState(0);

  // FASTER CYCLE: Switches every 4 seconds so you see it working
  useEffect(() => {
    if (items.length < 2) return; // Don't run timer if only 1 item
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [items.length]);

  const currentItem = items[index] || { Title: "LOADING", Price: "...", ImageURL: "" };

  return (
    <div className="relative h-full w-full p-1 flex flex-col">
      
      {/* 1. ANIMATED BORDER */}
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

      {/* 2. INNER CONTENT (The Slider) */}
      <div className="relative z-10 h-full w-full bg-black/90 flex flex-col border border-white/10 rounded-lg overflow-hidden">
        
        {/* SLIDING IMAGE AREA */}
        <div className="flex-1 w-full overflow-hidden relative group">
           <AnimatePresence mode='wait'>
             <motion.img 
               key={index} // Changing this KEY forces React to re-draw (animate) the image
               src={currentItem.ImageURL} 
               initial={{ x: 300, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -300, opacity: 0 }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
               className="absolute inset-0 w-full h-full object-cover opacity-90" 
               alt="Content" 
             />
           </AnimatePresence>
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* SLIDING TEXT AREA */}
        <div className="h-24 shrink-0 bg-gray-900 flex flex-col items-center justify-center border-t-2 border-blue-500/50 p-2 z-20">
            <AnimatePresence mode='wait'>
                <motion.div 
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                    <h3 className="text-white font-black text-lg md:text-2xl uppercase tracking-wider text-center leading-none mb-1">
                        {currentItem.Title}
                    </h3>
                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white drop-shadow-md">
                        {currentItem.Price}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
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

// --- FALLBACK IMAGES (So it always slides) ---
const DEFAULT_BEER = { Title: "ICE COLD BEER", Price: "$6.00", ImageURL: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80" };
const DEFAULT_FOOD = { Title: "EPIC BURGER", Price: "$15.00", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" };

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(`${API_URL}?tab=Ads`);
        const data = await res.json();
        const relevantData = data.filter((item: any) => {
            const target = item.Target_Screen || item.Client_ID;
            return !target || target === 'All' || target === deviceId;
        });
        setAds(relevantData);
      } catch (error) {}
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const mainItems = ads.filter(ad => ad.Category === 'Main');
  const drinkItems = ads.filter(ad => ad.Category === 'Drinks' || ad.Category === 'Draft Picks');
  const offers = ads.filter(ad => ad.Category === 'Offer');

  // --- FORCE PAIRING LOGIC ---
  // If we find a food, we try to find a drink. 
  // If no drink exists in data, we USE DEFAULT_BEER so it still slides.
  const getPair = (index: number) => {
     // Get Food (or default if missing)
     const food = mainItems[index] || DEFAULT_FOOD;
     
     // Get Drink (or default if missing)
     // This guarantees we ALWAYS have 2 items, so animation ALWAYS runs.
     const drink = drinkItems[index] || DEFAULT_BEER; 
     
     return [food, drink]; 
  };

  const offer1 = offers[0] || { Title: "HALF-OFF APPS", Description: "UNTIL KICKOFF" };
  const offer2 = offers[1] || { Title: "BEER OF THE MONTH", Description: "HAZY HOPPER - $7" };

  return (
    <div className="w-full h-screen bg-[#050510] flex flex-col font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black pointer-events-none" />

      {/* HEADER */}
      <div className="shrink-0 w-full p-4 md:p-6 flex items-center justify-between border-b-4 border-red-600 bg-black/60 shadow-xl z-20">
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter drop-shadow-[4px_4px_0_#b91c1c]">
            GAME DAY <span className="text-blue-500">MENU</span>
          </h1>
          <div className="hidden md:flex items-center gap-6 border-2 border-white/20 bg-black px-6 py-2 rounded-lg shadow-lg">
             <div className="text-center"><div className="text-gray-400 text-xs font-bold">HOME</div><div className="text-5xl font-black text-white">24</div></div>
             <div className="text-red-500 font-bold text-2xl animate-pulse">VS</div>
             <div className="text-center"><div className="text-gray-400 text-xs font-bold">AWAY</div><div className="text-5xl font-black text-white">21</div></div>
          </div>
      </div>

      {/* MAIN GRID - Forces 3 Sliding Cards */}
      <div className="flex-1 min-h-0 w-full p-4 md:p-8 grid grid-cols-3 gap-4 md:gap-8 z-10">
          <SlideshowCard items={getPair(0)} color1="#ff0000" color2="#0000ff" />
          <SlideshowCard items={getPair(1)} color1="#0088ff" color2="#00ffff" />
          <SlideshowCard items={getPair(2)} color1="#ff8800" color2="#ffff00" />
      </div>

      {/* FOOTER */}
      <div className="shrink-0 w-full p-4 md:p-6 flex gap-4 md:gap-6 z-20 bg-black/40 backdrop-blur-sm">
         <div className="flex-1 border-2 border-dashed border-gray-600 bg-gray-900/90 rounded-lg flex items-center justify-center p-4 shadow-lg">
            <span className="text-yellow-400 font-black text-2xl md:text-3xl uppercase animate-pulse mr-3">{offer1.Title}:</span>
            <span className="text-white font-bold text-xl md:text-2xl tracking-widest">{offer1.Description}</span>
         </div>
         <div className="hidden md:flex flex-1 border-2 border-dashed border-gray-600 bg-gray-900/90 rounded-lg items-center justify-center p-4 shadow-lg">
            <span className="text-yellow-400 font-black text-2xl md:text-3xl uppercase animate-pulse mr-3">{offer2.Title}:</span>
            <span className="text-white font-bold text-xl md:text-2xl tracking-widest">{offer2.Description}</span>
         </div>
      </div>
    </div>
  );
}
