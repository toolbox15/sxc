import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

// --- THEME 1: TONY'S BAR (FOOTBALL FIELD) ---
const BearsTheme = ({ ads }: { ads: any[] }) => {
  // Filters based on your Column E (Category)
  const kickoff = ads.filter(ad => String(ad.category).toLowerCase().includes('kickoff'));
  const mains = ads.filter(ad => String(ad.category).toLowerCase().includes('main'));
  const drinks = ads.filter(ad => String(ad.category).toLowerCase().includes('draft'));

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans" 
         style={{ backgroundImage: "url('/field-bg.png')" }}>
      <div className="absolute inset-0 bg-blue-950/30 z-0"></div>

      {/* 🍺 ASSETS: Flipped mug and small football */}
      <div className="absolute bottom-6 left-6 z-10">
          <img src="/beer-glass.png" className="h-64 w-auto drop-shadow-2xl" style={{ transform: 'scaleX(-1)' }} />
      </div>
      <div className="absolute bottom-6 right-6 z-10">
        <motion.img src="/football.png" className="h-32 w-auto drop-shadow-2xl" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} />
      </div>

      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12 text-white">
        <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
          <h1 className="text-7xl font-black uppercase italic drop-shadow-2xl text-white">GAME DAY <span className="text-orange-500">SPECIALS</span></h1>
        </div>

        {/* Kickoff */}
        <div className="col-span-4 pl-40 pt-4">
          <div className="bg-orange-600 p-2 mb-4 font-black italic">KICKOFF</div>
          {kickoff.map((item, i) => (
            <div key={i} className="mb-4 border-b border-white/20 pb-2">
              <div className="flex justify-between font-bold text-2xl"><span>{item.title}</span><span className="text-orange-500">{item.price}</span></div>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Main Event */}
        <div className="col-span-4 bg-blue-950/40 p-6 border-t-4 border-white backdrop-blur-sm">
          <div className="bg-white text-blue-950 p-2 mb-6 font-black italic text-center text-2xl uppercase">The Main Event</div>
          {mains.map((item, i) => (
            <div key={i} className="mb-8 text-center border-b border-white/20 pb-4">
              <h3 className="text-3xl font-black uppercase">{item.title}</h3>
              <div className="text-3xl font-black text-orange-500 my-1">{item.price}</div>
              <p className="text-sm italic">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Draft Picks */}
        <div className="col-span-4 pr-32 pt-4 text-right">
          <div className="bg-orange-600 p-2 mb-4 font-black italic">DRAFT PICKS</div>
          {drinks.map((item, i) => (
            <div key={i} className="mb-4 border-b border-white/20 pb-2">
              <div className="flex justify-between flex-row-reverse font-bold text-2xl"><span>{item.title}</span><span className="text-orange-500">{item.price}</span></div>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- THEME 2: TIRE SHOP (DARK THEME) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div className="h-screen bg-slate-950 text-white p-20 flex flex-col items-center">
    <h1 className="text-8xl font-black mb-12 italic border-b-8 border-yellow-400 pb-4">TIRE SHOP <span className="text-yellow-400">DEALS</span></h1>
    <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
      {ads.map((ad, i) => (
        <div key={i} className="bg-slate-900 border-l-8 border-yellow-400 p-6 flex justify-between items-center shadow-2xl">
          <div><h2 className="text-4xl font-black uppercase">{ad.title}</h2><p className="text-xl text-slate-400">{ad.description}</p></div>
          <div className="text-5xl font-black text-yellow-400">{ad.price}</div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  const shopIdFromURL = (params.get('id') || "tonysbar").toLowerCase().trim();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?t=${new Date().getTime()}`);
        const allData = await response.json();

        // 🛡️ STRICT FILTERING FOR YOUR SPREADSHEET
        const filtered = allData.filter((row: any) => {
          // Compare URL id to Target_Screen (Column L)
          const target = String(row.target_screen || row.targetScreen || "").toLowerCase().trim();
          // Check Status (Column J)
          const status = String(row.status || "").toLowerCase().trim();
          
          return target === shopIdFromURL && status === "active";
        });
        
        setItems(filtered);
      } catch (err) { console.error("Fetch Error:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopIdFromURL]);

  if (shopIdFromURL === 'tonysbar') return <BearsTheme ads={items} />;
  return <TireShopTheme ads={items} />;
};

// 🚨 THE FIX FOR NETLIFY:
export default App;
