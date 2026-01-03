import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

// --- THEME 1: TONY'S BAR (FOOTBALL FIELD) ---
const BearsTheme = ({ ads, alert }: { ads: any[], alert: any }) => {
  const kickoff = ads.filter(ad => String(ad.category).toLowerCase() === 'kickoff');
  const mains = ads.filter(ad => String(ad.category).toLowerCase() === 'main event' || String(ad.category).toLowerCase() === 'main-event');
  const drinks = ads.filter(ad => String(ad.category).toLowerCase() === 'draft picks' || String(ad.category).toLowerCase() === 'draft-picks');

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans" 
         style={{ backgroundImage: "url('/field-bg.png')" }}>
      <div className="absolute inset-0 bg-blue-950/30 z-0"></div>

      {/* 🍺 BEER GLASS: Flipped & Smaller */}
      <div className="absolute bottom-6 left-6 z-10">
          <img src="/beer-glass.png" className="h-64 w-auto drop-shadow-2xl" style={{ transform: 'scaleX(-1)' }} />
      </div>

      {/* 🏈 FOOTBALL: Corner & Smaller */}
      <div className="absolute bottom-6 right-6 z-10">
        <motion.img src="/football.png" className="h-32 w-auto drop-shadow-2xl" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} />
      </div>

      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12 text-white">
        <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
          <h1 className="text-7xl font-black uppercase italic drop-shadow-2xl">GAME DAY <span className="text-orange-500">SPECIALS</span></h1>
        </div>
        {/* Menu Columns */}
        <div className="col-span-4 pl-40"><div className="bg-orange-600 p-2 mb-4">KICKOFF</div>{kickoff.map((item, i) => <div key={i} className="mb-4"><b>{item.title}</b> - {item.price}</div>)}</div>
        <div className="col-span-4 bg-blue-950/40 p-4 border-t-4 border-white"><div className="bg-white text-blue-950 p-2 mb-4">MAINS</div>{mains.map((item, i) => <div key={i} className="mb-4 text-center text-xl"><b>{item.title}</b><br/>{item.price}</div>)}</div>
        <div className="col-span-4 pr-32 text-right"><div className="bg-orange-600 p-2 mb-4">DRAFT PICKS</div>{drinks.map((item, i) => <div key={i} className="mb-4"><b>{item.title}</b> - {item.price}</div>)}</div>
      </div>
    </div>
  );
};

// --- THEME 2: TIRE SHOP (PLACEHOLDER) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div className="h-screen bg-slate-900 text-white p-20">
    <h1 className="text-6xl font-black mb-10">TIRE SHOP <span className="text-yellow-400">DEALS</span></h1>
    {ads.map((ad, i) => <div key={i} className="border-b py-4 text-3xl font-bold">{ad.title} — {ad.price}</div>)}
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

        // 🛡️ THE STRICT FILTER
        const filtered = allData.filter((row: any) => {
          const clientInSheet = String(row.client).toLowerCase().replace(/['\s]/g, ''); // "Tony's Bar" -> "tonysbar"
          return clientInSheet === shopIdFromURL && String(row.status).toLowerCase() === "active";
        });
        
        setItems(filtered);
      } catch (err) { console.error("Error fetching hub data:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopIdFromURL]);

  // Choose theme based on URL ID
  if (shopIdFromURL === 'tonysbar') return <BearsTheme ads={items} alert={null} />;
  return <TireShopTheme ads={items} />;
};

export default App;
