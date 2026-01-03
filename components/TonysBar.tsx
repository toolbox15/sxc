import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

// --- THEME COMPONENTS (Directly integrated to prevent build errors) ---

const SirenImage = () => (
  <div className="relative z-50">
    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
      <Flame className="text-white w-10 h-10" />
    </div>
    <motion.div className="absolute inset-0 bg-red-500 rounded-full opacity-0" animate={{ opacity: [0, 0.6, 0], scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
  </div>
);

const FlashSaleOverlay = ({ item }: { item: any }) => (
  <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
    <motion.div className="relative z-10 w-[90%] max-w-5xl bg-blue-950 rounded-3xl border-[6px] border-white p-12 flex flex-col items-center shadow-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <div className="absolute -top-10 left-10"><SirenImage /></div>
      <div className="absolute -top-10 right-10"><SirenImage /></div>
      <h2 className="text-orange-600 text-4xl font-black italic">FIELD ALERT</h2>
      <h1 className="text-white text-8xl md:text-9xl font-black uppercase italic text-center mt-4 drop-shadow-lg">{item.title}</h1>
      <div className="mt-8 bg-white px-10 py-4 rounded-full">
        <p className="text-blue-950 text-4xl font-black uppercase">{item.description || "LIMITED TIME!"}</p>
      </div>
    </motion.div>
  </div>
);

const BearsTheme = ({ ads, activeAlert }: { ads: any[], activeAlert: any }) => {
  const kickoff = ads.filter(ad => String(ad.category).toUpperCase() === 'KICKOFF');
  const mains = ads.filter(ad => String(ad.category).toUpperCase() === 'MAIN EVENT');
  const drinks = ads.filter(ad => String(ad.category).toUpperCase() === 'DRAFT PICKS');

  return (
    <div className="w-full h-screen relative overflow-hidden bg-blue-950 font-sans text-white p-10">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
      
      {activeAlert && <FlashSaleOverlay item={activeAlert} />}

      <div className="relative z-20 grid grid-cols-12 gap-8 h-full">
        <div className="col-span-12 text-center border-b-8 border-orange-600 pb-4 mb-4">
          <h1 className="text-7xl font-black italic uppercase tracking-tighter">GAME DAY <span className="text-orange-500">SPECIALS</span></h1>
        </div>

        {/* Kickoff */}
        <div className="col-span-4 space-y-6">
          <div className="bg-orange-600 p-4 rounded-r-xl flex items-center gap-3"><Flame /><h2 className="text-3xl font-black italic uppercase">Kickoff</h2></div>
          {kickoff.map((item, i) => (
            <div key={i} className="border-b border-white/20 pb-2 flex justify-between items-start">
              <div><h3 className="text-2xl font-bold uppercase">{item.title}</h3><p className="text-sm text-gray-300">{item.description}</p></div>
              <span className="text-3xl font-black text-orange-500">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Main Event */}
        <div className="col-span-4 space-y-6 bg-white/5 p-6 rounded-2xl">
          <div className="bg-white text-blue-950 p-4 rounded-xl flex items-center gap-3"><UtensilsCrossed /><h2 className="text-3xl font-black italic uppercase">The Main Event</h2></div>
          {mains.map((item, i) => (
            <div key={i} className="border-b border-white/20 pb-2 flex justify-between items-start">
              <div><h3 className="text-2xl font-bold uppercase">{item.title}</h3><p className="text-sm text-gray-300">{item.description}</p></div>
              <span className="text-3xl font-black text-orange-500">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Draft Picks */}
        <div className="col-span-4 space-y-6">
          <div className="bg-orange-600 p-4 rounded-l-xl flex items-center gap-3 justify-end"><h2 className="text-3xl font-black italic uppercase">Draft Picks</h2><Beer /></div>
          {drinks.map((item, i) => (
            <div key={i} className="border-b border-white/20 pb-2 flex justify-between items-start text-right">
              <span className="text-3xl font-black text-orange-500">{item.price}</span>
              <div><h3 className="text-2xl font-bold uppercase">{item.title}</h3><p className="text-sm text-gray-300">{item.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CORE APP ENGINE ---

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  const params = new URLSearchParams(window.location.search);
  const shopId = (params.get('id') || params.get('ID') || params.get('shop') || "").toLowerCase().trim();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        const alertTrigger = data.find((row: any) => String(row.category).toUpperCase() === 'ALERT' && String(row.status).toLowerCase() === 'active');
        const menu = data.filter((row: any) => String(row.status).toLowerCase() === "active" && String(row.category).toUpperCase() !== 'ALERT');
        setItems(menu);
        setActiveAlert(alertTrigger || null);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopId]);

  if (shopId === 'tonysbar') return <BearsTheme ads={items} activeAlert={activeAlert} />;
  
  return (
    <div className="h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-black italic tracking-widest uppercase">
        {shopId ? `SYNCING ${shopId}...` : "PLEASE SPECIFY ?ID=TONYSBAR"}
      </h1>
    </div>
  );
};

export default App;
