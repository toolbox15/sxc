import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Beer } from 'lucide-react';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
}

// --- MAIN COMPONENT ---
const LiveStreamTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  // 1. FILTER DATA
  const sidebarFood = ads.filter(ad => ad.Category === 'Kickoff');
  const sidebarDrinks = ads.filter(ad => ad.Category === 'Draft Picks');
  const alerts = ads.filter(ad => ad.Category === 'ALERT');

  // 2. VIDEO SOURCE 
  // Looks for a row with Category "STREAM". If missing, plays a demo video.
  const streamRow = ads.find(ad => ad.Category === 'STREAM');
  const videoUrl = streamRow ? streamRow.Price : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; 

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden font-sans">
      
      {/* --- TOP SECTION (Video + Sidebar) --- */}
      <div className="flex flex-1 overflow-hidden h-[90%]">
        
        {/* 📺 VIDEO PLAYER (80% Width) */}
        <div className="w-[80%] h-full relative bg-black border-r-4 border-blue-900">
          <video 
            src={videoUrl} 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-bold text-xs rounded animate-pulse">
            LIVE
          </div>
        </div>

        {/* 📋 SIDEBAR MENU (20% Width) */}
        <div className="w-[20%] h-full bg-blue-950 flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 p-3 text-center shadow-lg z-10">
            <h2 className="text-white text-lg font-black italic uppercase">Game Day Menu</h2>
          </div>

          {/* Scrolling List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Eats */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-orange-500 border-b border-blue-800 pb-1">
                <Flame size={16} />
                <h3 className="font-bold text-md uppercase">Eats</h3>
              </div>
              {sidebarFood.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-white font-bold text-sm">
                    <span>{item.Title}</span>
                    <span className="text-orange-400">{item.Price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Drinks */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-300 border-b border-blue-800 pb-1">
                <Beer size={16} />
                <h3 className="font-bold text-md uppercase">Drinks</h3>
              </div>
              {sidebarDrinks.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-white font-bold text-sm">
                    <span>{item.Title}</span>
                    <span className="text-blue-300">{item.Price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM TICKER (10% Height) --- */}
      <div className="h-[10%] bg-blue-900 border-t-4 border-orange-600 flex items-center relative overflow-hidden">
        <div className="bg-orange-600 h-full px-8 flex items-center z-10 shadow-xl">
          <span className="text-white font-black italic text-2xl">UPDATES</span>
        </div>
        
        {/* Scrolling Text Animation */}
        <motion.div 
          className="whitespace-nowrap absolute left-full flex items-center gap-16"
          animate={{ x: '-150vw' }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {alerts.length > 0 ? (
             alerts.map((item, i) => (
               <span key={i} className="text-white text-3xl font-bold uppercase text-yellow-400 flex items-center gap-4">
                 🚨 {item.Title}: {item.Description}
               </span>
             ))
          ) : (
             <span className="text-white text-3xl font-bold uppercase text-slate-300">
               Welcome to the Sports Lounge • Ask about our daily specials • Enjoy the game!
             </span>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default LiveStreamTheme;
