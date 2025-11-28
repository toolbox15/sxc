import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Beer, Ticket } from 'lucide-react';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
}

// --- MAIN COMPONENT ---
const BroadcastTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  // 1. FILTER DATA
  const sidebarFood = ads.filter(ad => ad.Category === 'Kickoff');
  const sidebarDrinks = ads.filter(ad => ad.Category === 'Draft Picks');
  const tickerNews = ads.filter(ad => ad.Category === 'ALERT'); // Used for scrolling ticker

  // 2. GET VIDEO SOURCE (Default to a placeholder if no STREAM row exists)
  const streamRow = ads.find(ad => ad.Category === 'STREAM');
  const videoUrl = streamRow ? streamRow.Price : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; 
  // (Note: In production, upload a generic 'Sports Highlights' loop to your public folder)

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden font-sans">
      
      {/* --- TOP ROW (Content + Sidebar) --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 📺 VIDEO PLAYER (80% Width) */}
        <div className="w-4/5 relative bg-black border-r-4 border-slate-800">
          <video 
            src={videoUrl} 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          />
          
          {/* OVERLAY: "LIVE" Badge */}
          <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1 font-bold rounded animate-pulse">
            LIVE BROADCAST
          </div>
        </div>

        {/* 📋 SIDEBAR MENU (20% Width) */}
        <div className="w-1/5 bg-slate-900 border-l border-slate-700 flex flex-col">
          {/* Header */}
          <div className="bg-blue-900 p-4 text-center border-b-4 border-orange-500">
            <h2 className="text-white text-xl font-black italic uppercase">Game Day<br/><span className="text-orange-500">Menu</span></h2>
          </div>

          {/* Scrolling List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Food Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-orange-500 border-b border-slate-700 pb-1">
                <Flame size={18} />
                <h3 className="font-bold text-lg uppercase">Eats</h3>
              </div>
              {sidebarFood.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-white font-bold text-sm">
                    <span>{item.Title}</span>
                    <span className="text-orange-400">{item.Price}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{item.Description}</p>
                </div>
              ))}
            </div>

            {/* Drinks Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-400 border-b border-slate-700 pb-1">
                <Beer size={18} />
                <h3 className="font-bold text-lg uppercase">Drinks</h3>
              </div>
              {sidebarDrinks.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-white font-bold text-sm">
                    <span>{item.Title}</span>
                    <span className="text-blue-400">{item.Price}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
          
          {/* Ad Space (Bottom of Sidebar) */}
          <div className="bg-white p-4 text-center">
            <p className="text-black font-bold text-xs uppercase mb-1">Sponsored By</p>
            <div className="h-20 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-500 text-xs font-bold">[YOUR AD HERE]</span>
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM TICKER (The "Crawl") --- */}
      <div className="h-16 bg-blue-950 border-t-4 border-orange-600 flex items-center relative overflow-hidden">
        <div className="bg-orange-600 h-full px-6 flex items-center z-10 skew-x-[-10deg] ml-[-10px]">
          <span className="text-white font-black italic text-xl skew-x-[10deg]">ALERTS</span>
        </div>
        
        {/* Scrolling Text */}
        <motion.div 
          className="whitespace-nowrap absolute left-full flex items-center gap-12"
          animate={{ x: '-100vw' }} // Moves left forever
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {/* If no alerts, show default message */}
          {tickerNews.length === 0 ? (
             <span className="text-white text-2xl font-bold uppercase">Welcome to the Game Day Experience • Ask your server about daily specials • Follow us on Instagram</span>
          ) : (
             tickerNews.map((item, i) => (
               <span key={i} className="text-white text-2xl font-bold uppercase text-yellow-400">
                 🚨 {item.Title}: {item.Description} 🚨
               </span>
             ))
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default BroadcastTheme;
