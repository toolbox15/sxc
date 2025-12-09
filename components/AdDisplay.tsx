import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion } from 'framer-motion'; 

// ==========================================
// ⚡ COMPONENT: THE NEON BORDER (ANIMATED)
// ==========================================
// This creates the Red/Blue tube AND the chasing white dots.

const NeonCard = ({ title, price, image, color1 = "#ff0000", color2 = "#0088ff" }: any) => {
  return (
    <div className="relative h-full w-full p-[6px] flex flex-col">
      
      {/* 1. THE GRADIENT TUBE (Background Glow) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <div className="absolute inset-0 border-[6px] border-transparent rounded-sm" 
              style={{ 
                background: `linear-gradient(to bottom right, ${color1}, ${color2}) border-box`,
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }} 
         />
         {/* Outer Glow for the Tube */}
         <div className="absolute inset-0 opacity-50 blur-xl bg-gradient-to-br from-blue-600 to-red-600" />
      </div>

      {/* 2. THE CHASING DOTS (Animation) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <motion.rect 
          x="3" y="3" width="99%" height="98.5%" 
          fill="none" 
          stroke="white" 
          strokeWidth="3" 
          strokeDasharray="10 20" /* 10px Dot, 20px Gap */
          strokeLinecap="round"
          rx="2" ry="2" 
          animate={{ strokeDashoffset: [0, -60] }} /* THIS MAKES IT RUN */
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* 3. INNER CONTENT (The Food) */}
      <div className="relative z-10 h-full w-full bg-black/90 flex flex-col border border-white/10 overflow-hidden">
        
        {/* IMAGE AREA */}
        <div className="h-3/4 w-full overflow-hidden relative group">
           <img src={image} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" alt="Food" />
           {/* Scanlines */}
           <div className="absolute inset-0 pointer-events-none opacity-30" 
                style={{backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%'}} />
        </div>

        {/* TEXT AREA */}
        <div className="h-1/4 bg-gray-900 flex flex-col items-center justify-center border-t-2 border-blue-500/50">
            <h3 className="text-white font-black text-2xl uppercase tracking-wider drop-shadow-md">{title}</h3>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              {price}
            </span>
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

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
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
        setIsLoading(false);
      } catch (error) { setIsLoading(false); }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // --- SAFE DATA FALLBACK ---
  const featured = ads.filter(ad => ad.Category === 'Main');
  const offers = ads.filter(ad => ad.Category === 'Offer');

  // Dummy Data if Sheet is Empty
  const item1 = featured[0] || { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80" };
  const item2 = featured[1] || { Title: "WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" };
  const item3 = featured[2] || { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" };
  
  const offer1 = offers[0] || { Title: "HALF-OFF APPS", Description: "UNTIL KICKOFF" };
  const offer2 = offers[1] || { Title: "BEER OF THE MONTH", Description: "HAZY HOPPER - $7" };

  if (isLoading) return <div className="h-screen bg-black text-white flex items-center justify-center">SYSTEM LOADING...</div>;

  return (
    <div className="w-full h-screen bg-[#050510] p-6 flex flex-col gap-6 font-sans overflow-hidden relative">
      
      {/* BACKGROUND STARS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black pointer-events-none" />

      {/* HEADER */}
      <div className="h-[15%] w-full flex items-center justify-between border-b-4 border-red-600 bg-black/60 px-8 rounded-xl relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          <h1 className="relative z-10 text-7xl font-black text-white italic tracking-tighter drop-shadow-[4px_4px_0_#b91c1c]">
            GAME DAY <span className="text-blue-500">MENU</span>
          </h1>
          
          {/* LIVE SCOREBOARD */}
          <div className="relative z-10 flex items-center gap-6 border-2 border-white/20 bg-black px-8 py-3 rounded-lg shadow-lg">
             <div className="text-center">
                <div className="text-gray-400 text-sm font-bold tracking-widest">HOME</div>
                <div className="text-5xl font-black text-white">24</div>
             </div>
             <div className="text-red-500 font-bold text-2xl animate-pulse">VS</div>
             <div className="text-center">
                <div className="text-gray-400 text-sm font-bold tracking-widest">AWAY</div>
                <div className="text-5xl font-black text-white">21</div>
             </div>
          </div>
      </div>

      {/* MAIN GRID */}
      <div className="h-[65%] grid grid-cols-3 gap-8 px-2">
          <NeonCard title={item1.Title} price={item1.Price} image={item1.ImageURL} color1="#ff0000" color2="#0000ff" />
          <NeonCard title={item2.Title} price={item2.Price} image={item2.ImageURL} color1="#0088ff" color2="#00ffff" />
          <NeonCard title={item3.Title} price={item3.Price} image={item3.ImageURL} color1="#ff8800" color2="#ffff00" />
      </div>

      {/* FOOTER PROMOS */}
      <div className="h-[15%] flex gap-6">
         <div className="flex-1 border-2 border-dashed border-gray-700 bg-gray-900/80 rounded-lg flex items-center justify-center gap-4 shadow-lg backdrop-blur-sm">
            <span className="text-yellow-400 font-black text-3xl uppercase animate-pulse">{offer1.Title}:</span>
            <span className="text-white font-bold text-2xl tracking-widest">{offer1.Description}</span>
         </div>
         <div className="flex-1 border-2 border-dashed border-gray-700 bg-gray-900/80 rounded-lg flex items-center justify-center gap-4 shadow-lg backdrop-blur-sm">
            <span className="text-yellow-400 font-black text-3xl uppercase animate-pulse">{offer2.Title}:</span>
            <span className="text-white font-bold text-2xl tracking-widest">{offer2.Description}</span>
         </div>
      </div>
    </div>
  );
}
