import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

// ==========================================
// 🚨 SAFE MODE: INTERNAL NEON THEME (CSS ONLY)
// ==========================================

const NeonCard = ({ title, price, image }: any) => {
  return (
    <div className="relative h-full w-full bg-black flex flex-col p-[2px] overflow-hidden group">
      {/* GLOWING BORDER (CSS) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 animate-pulse" />
      
      {/* INNER BLACK BOX */}
      <div className="relative z-10 h-full w-full bg-gray-900 m-[2px] flex flex-col border border-white/10">
        
        {/* IMAGE */}
        <div className="h-3/4 w-full overflow-hidden relative">
           <img src={image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Food" />
           {/* SCANLINES */}
           <div className="absolute inset-0 pointer-events-none" 
                style={{backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%'}} />
        </div>

        {/* TEXT */}
        <div className="h-1/4 bg-black flex flex-col items-center justify-center border-t border-blue-500/50">
            <h3 className="text-white font-black text-xl uppercase tracking-wider">{title}</h3>
            <span className="text-3xl font-black text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{price}</span>
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
  
  // FETCH DATA
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
  // If no data, show dummy data so screen isn't white
  const item1 = featured[0] || { Title: "LOADING...", Price: "$--", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80" };
  const item2 = featured[1] || { Title: "LOADING...", Price: "$--", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" };
  const item3 = featured[2] || { Title: "LOADING...", Price: "$--", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" };

  if (isLoading) return <div className="h-screen bg-black text-white flex items-center justify-center">SYSTEM BOOT...</div>;

  return (
    <div className="w-full h-screen bg-black p-4 flex flex-col gap-4 font-sans overflow-hidden">
      
      {/* HEADER */}
      <div className="h-[15%] w-full flex items-center justify-between border-b-4 border-red-600 bg-gray-900 px-8 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20 animate-pulse" />
          <h1 className="relative z-10 text-6xl font-black text-white italic tracking-tighter">GAME DAY <span className="text-blue-500">MENU</span></h1>
          <div className="relative z-10 flex items-center gap-6 border-2 border-white/20 bg-black px-6 py-2 rounded-lg">
             <div className="text-center"><div className="text-gray-400 text-xs font-bold">HOME</div><div className="text-4xl font-black text-white">24</div></div>
             <div className="text-red-500 font-bold">VS</div>
             <div className="text-center"><div className="text-gray-400 text-xs font-bold">AWAY</div><div className="text-4xl font-black text-white">21</div></div>
          </div>
      </div>

      {/* GRID */}
      <div className="h-[65%] grid grid-cols-3 gap-6">
          <NeonCard title={item1.Title} price={item1.Price} image={item1.ImageURL} />
          <NeonCard title={item2.Title} price={item2.Price} image={item2.ImageURL} />
          <NeonCard title={item3.Title} price={item3.Price} image={item3.ImageURL} />
      </div>

      {/* FOOTER */}
      <div className="h-[15%] flex gap-4">
         <div className="flex-1 border-2 border-dashed border-gray-700 bg-gray-900 flex items-center justify-center">
            <span className="text-yellow-400 font-black text-2xl uppercase">SPECIAL: </span>
            <span className="text-white font-bold text-xl ml-4">HALF OFF APPS</span>
         </div>
      </div>
    </div>
  );
}
