import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

const BearsTheme = ({ ads, alert }: { ads: any[], alert: any }) => {
  const kickoff = ads.filter(ad => String(ad.category).toLowerCase() === 'kickoff');
  const mains = ads.filter(ad => String(ad.category).toLowerCase() === 'main event' || String(ad.category).toLowerCase() === 'main-event');
  const drinks = ads.filter(ad => String(ad.category).toLowerCase() === 'draft picks' || String(ad.category).toLowerCase() === 'draft-picks');

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans" 
         style={{ backgroundImage: "url('/field-bg.png')" }}>
      
      <div className="absolute inset-0 bg-blue-950/30 z-0"></div>

      {/* 🚨 FLASH SALE OVERLAY */}
      {alert && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <motion.div className="relative z-10 w-[90%] max-w-5xl bg-blue-950 rounded-3xl border-[6px] border-white p-12 flex flex-col items-center shadow-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
             <h2 className="text-orange-600 text-4xl font-black italic">FIELD ALERT</h2>
             <h1 className="text-white text-8xl md:text-9xl font-black uppercase italic text-center mt-4 drop-shadow-lg">{alert.title}</h1>
             <div className="mt-8 bg-white px-10 py-4 rounded-full">
               <p className="text-blue-950 text-4xl font-black uppercase">{alert.description || "LIMITED TIME!"}</p>
             </div>
          </motion.div>
        </div>
      )}

      {/* 🍺 BEER GLASS: Smaller (h-80) and Flipped (scale-x-[-1]) */}
      <div className="absolute bottom-2 left-2 z-10">
          <img 
            src="/beer-glass.png" 
            alt="Beer Glass" 
            className="h-80 w-auto drop-shadow-2xl" 
            style={{ transform: 'scaleX(-1)' }} 
          />
      </div>

      {/* 🏈 FOOTBALL: Smaller (h-40) and Positioned in the corner */}
      <div className="absolute bottom-4 right-4 z-10">
        <motion.img 
          src="/football.png" 
          className="h-40 w-auto drop-shadow-2xl" 
          animate={{ rotate: [0, 5, 0], y: [0, -5, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
        />
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
        <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
          <h1 className="text-7xl font-black uppercase tracking-tighter text-white italic drop-shadow-2xl">
            GAME DAY <span className="text-orange-500">SPECIALS</span>
          </h1>
        </div>

        {/* Kickoff */}
        <div className="col-span-4 pl-40 pt-4">
          <div className="bg-orange-600/80 border-l-4 border-orange-500 p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm">
            <Flame className="text-white" /><h2 className="text-3xl font-black text-white uppercase italic">Kickoff</h2>
          </div>
          <div className="flex flex-col gap-5">
            {kickoff.map((item, i) => (
              <div key={i} className="border-b border-white/30 pb-2 flex justify-between items-end">
                <div><h3 className="text-xl font-bold text-white uppercase">{item.title}</h3><p className="text-slate-100 text-xs font-bold">{item.description}</p></div>
                <span className="text-2xl font-black text-orange-500">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Event */}
        <div className="col-span-4 pt-4 px-6 bg-blue-950/40 rounded-t-3xl border-t-4 border-white backdrop-blur-sm">
          <div className="bg-white p-3 mb-4 rounded-lg flex items-center gap-3">
            <UtensilsCrossed className="text-blue-950" /><h2 className="text-3xl font-black text-blue-950 uppercase italic">The Main Event</h2>
          </div>
          <div className="flex flex-col gap-6">
            {mains.map((item, i) => (
              <div key={i} className="border-b border-white/30 pb-2 flex justify-between items-end">
                <div><h3 className="text-2xl font-bold text-white uppercase">{item.title}</h3><p className="text-slate-100 text-sm font-bold">{item.description}</p></div>
                <span className="text-3xl font-black text-orange-500">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Draft Picks */}
        <div className="col-span-4 pr-32 pt-4">
          <div className="bg-orange-600/80 border-r-4 border-orange-500 p-3 mb-4 rounded-l-lg text-right flex items-center justify-end gap-3 backdrop-blur-sm">
            <h2 className="text-3xl font-black text-white uppercase italic">Draft Picks</h2><Beer className="text-white" />
          </div>
          <div className="flex flex-col gap-5 text-right">
            {drinks.map((item, i) => (
              <div key={i} className="border-b border-white/30 pb-2 flex justify-between items-end">
                <span className="text-2xl font-black text-orange-500">{item.price}</span>
                <div><h3 className="text-xl font-bold text-white uppercase">{item.title}</h3><p className="text-slate-100 text-xs font-bold">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  const params = new URLSearchParams(window.location.search);
  const shopId = (params.get('id') || params.get('ID') || "tonysbar").toLowerCase().trim();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        const alertTrigger = data.find((row: any) => String(row.category).toUpperCase() === 'ALERT' && String(row.status).toLowerCase() === 'active');
        const menu = data.filter((row: any) => String(row.status).toLowerCase() === "active" && String(row.category).toUpperCase() !== 'ALERT');
        setItems(menu);
        setActiveAlert(alertTrigger || null);
      } catch (err) { console.error(err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopId]);

  return <BearsTheme ads={items} alert={activeAlert} />;
};

export default App;
