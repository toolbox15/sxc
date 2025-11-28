import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Beer } from 'lucide-react';
import ReactPlayer from 'react-player';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
}

// --- 🚨 FLASH SALE OVERLAY ---
const FlashSaleOverlay = ({ item }: { item: AdItem }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
      <motion.div 
        className="text-center p-8 border-y-8 border-orange-500 bg-black w-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-5xl font-black text-white italic uppercase mb-4">🚨 INTERRUPTION 🚨</h2>
        <h1 className="text-8xl font-black text-orange-500 uppercase">{item.Title}</h1>
        <p className="text-white text-4xl mt-4">{item.Description}</p>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const LiveStreamTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  const sidebarFood = ads.filter(ad => ad.Category === 'Kickoff');
  const sidebarDrinks = ads.filter(ad => ad.Category === 'Draft Picks');
  const alerts = ads.filter(ad => ad.Category === 'ALERT'); 
  const activeAlert = ads.find(ad => ad.Category === 'ALERT' && ad.Status === 'Active');

  const streamRow = ads.find(ad => ad.Category === 'STREAM');
  const videoUrl = streamRow ? streamRow.Price : "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"; 

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden font-sans">
      
      {activeAlert && <FlashSaleOverlay item={activeAlert} />}

      {/* --- TOP SECTION (Video + Sidebar) --- */}
      <div className="flex flex-1 overflow-hidden h-[88%]">
        
        {/* 📺 VIDEO PLAYER (80% Width) */}
        <div className="w-[80%] h-full relative bg-black">
          <ReactPlayer
            url={videoUrl}
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
            config={{ file: { attributes: { style: { width: '100%', height: '100%', objectFit: 'cover' } } } }}
          />
          <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1 font-bold text-sm rounded animate-pulse pointer-events-none">
            LIVE
          </div>
        </div>

        {/* 📋 SIDEBAR MENU (20% Width) */}
        <div className="w-[20%] h-full bg-slate-900 border-l border-slate-700 flex flex-col">
          <div className="bg-blue-950 p-4 text-center border-b-4 border-orange-500 z-10">
            <h2 className="text-white text-xl font-black italic uppercase">Game Day<br/><span className="text-orange-500">Menu</span></h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900">
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
                </div>
              ))}
            </div>

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
        </div>
      </div>

      {/* --- BOTTOM TICKER (The Bears Blue Bar) --- */}
      {/* Changed bg-red-700 to bg-blue-950 and removed border-white */}
      <div className="h-[12%] relative flex items-center bg-blue-950 z-20">

        {/* 🐻 BEARS STRIPES (Top border effect) */}
        {/* Top light orange stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-400 z-40"></div>
        {/* Bottom darker orange stripe sitting just below it */}
        <div className="absolute top-1 left-0 right-0 h-1 bg-orange-600 z-40"></div>
        
        {/* 🛑 STATIC LABEL (Rounded Box) */}
        <div className="relative z-30 h-full flex items-center pl-8 pr-12 bg-white rounded-tr-[50px] shadow-[5px_0_15px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col leading-none">
            {/* Changed text color to blue to match theme */}
            <span className="text-blue-950 font-black italic text-lg tracking-tighter">GAME DAY</span>
            <span className="text-black font-black italic text-3xl tracking-tighter">UPDATES</span>
          </div>
        </div>
        
        {/* 🏃‍♂️ SCROLLING TEXT AREA */}
        <div className="flex-1 h-full relative overflow-hidden flex items-center z-10">
          <motion.div 
            className="whitespace-nowrap absolute left-full flex items-center gap-16"
            animate={{ x: '-150vw' }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {alerts.length > 0 ? (
               alerts.map((item, i) => (
                 <span key={i} className="text-white text-4xl font-bold uppercase flex items-center gap-4 drop-shadow-md font-mono tracking-tighter">
                   <span className="text-yellow-300">🚨 {item.Title}:</span> {item.Description}
                 </span>
               ))
            ) : (
               <span className="text-white/90 text-3xl font-bold uppercase tracking-wider font-mono">
                 Welcome to the Sports Lounge • Ask your server about daily specials • Enjoy the game!
               </span>
            )}
          </motion.div>
        </div>

      </div>

    </div>
  );
};

export default LiveStreamTheme;
