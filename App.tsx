import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

// --- THEME COMPONENTS (Your Exact Logic) ---

const SirenImage = () => (
  <div className="relative z-50">
    <div className="w-32 h-32 md:w-40 md:h-40 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
       <Flame className="text-white w-20 h-20" />
    </div>
    <motion.div className="absolute inset-0 bg-red-500 rounded-full opacity-0" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
  </div>
);

const FlashSaleOverlay = ({ item }: { item: any }) => (
  <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden">
    <motion.div className="relative z-10 w-[90%] max-w-5xl bg-blue-950 rounded-3xl border-[6px] border-white shadow-2xl flex flex-col items-center p-12" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <div className="absolute -top-16 -left-12 z-50"><SirenImage /></div>
      <div className="absolute -top-16 -right-12 z-50"><SirenImage /></div>
      <div className="absolute -top-10 bg-orange-600 text-white px-10 py-4 rounded-xl border-4 border-white shadow-lg transform -rotate-1 z-20">
        <h2 className="text-4xl font-black italic uppercase tracking-widest">FIELD ALERT</h2>
      </div>
      <h1 className="text-8xl md:text-[10rem] font-black text-white uppercase italic leading-none mt-8 drop-shadow-[6px_6px_0px_#ea580c] text-center">{item.title}</h1>
      <div className="mt-8 bg-white px-16 py-4 rounded-full shadow-2xl">
        <p className="text-blue-950 text-4xl md:text-5xl font-black uppercase tracking-wide text-center">{item.description || "LIMITED TIME ONLY!"}</p>
      </div>
    </motion.div>
  </div>
);

// --- THE TIRE SHOP THEME (Saved for your other link) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div className="w-full h-screen bg-black text-white p-10 font-bold">
    <h1 className="text-red-600 text-6xl uppercase mb-10 border-l-8 border-red-600 pl-4">Tire Specials</h1>
    <div className="space-y-6">
      {ads.map((ad, i) => (
        <div key={i} className="bg-zinc-900 p-6 flex justify-between items-center border-b-2 border-zinc-800">
          <div><h2 className="text-4xl">{ad.title}</h2><p className="text-zinc-400">{ad.description}</p></div>
          <div className="text-5xl text-red-500">{ad.price}</div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ENGINE ---
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  const params = new URLSearchParams(window.location.search);
  const shopId = (params.get('id') || params.get('ID') || params.get('shop') || "").toLowerCase().trim();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!shopId) { setLoading(false); return; }
    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        const alertTrigger = data.find((row: any) => String(row.category).toUpperCase() === 'ALERT' && String(row.status).toLowerCase() === 'active');
        const menuItems = data.filter((row: any) => String(row.status).toLowerCase() === "active" && String(row.category).toUpperCase() !== 'ALERT');
        setItems(menuItems);
        setActiveAlert(alertTrigger || null);
        setLoading(false);
      } catch (err) { setLoading(false); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopId]);

  // TONYS BAR THEME RENDERING
  if (shopId === 'tonysbar') {
    const kickoff = items.filter(ad => ad.category === 'Kickoff');
    const mains = items.filter(ad => ad.category === 'Main Event');
    const drinks = items.filter(ad => ad.category === 'Draft Picks');

    return (
      <div className="w-full h-screen relative overflow-hidden bg-blue-950 bg-opacity-90 font-sans">
        {activeAlert && <FlashSaleOverlay item={activeAlert} />}
        
        <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
          <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
            <h1 className="text-7xl font-black uppercase tracking-tighter text-white italic drop-shadow-2xl">
              GAME DAY <span className="text-orange-500">SPECIALS</span>
            </h1>
          </div>

          {/* Kickoff Section */}
          <div className="col-span-4 space-y-4">
            <div className="bg-orange-600 p-3 mb-4 rounded-r-lg flex items-center gap-3"><Flame className="text-white" /><h2 className="text-3xl font-black text-white uppercase italic">KICKOFF</h2></div>
            {kickoff.map((item, i) => (
              <div key={i} className="border-b border-slate-600/50 pb-2 flex justify-between">
                <div><h3 className="text-xl font-bold text-white uppercase">{item.title}</h3><p className="text-slate-300 text-xs">{item.description}</p></div>
                <span className="text-2xl font-black text-orange-500">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Main Event Section */}
          <div className="col-span-4 space-y-4 px-4 bg-white/5 rounded-xl">
            <div className="bg-white p-3 mb-4 rounded-lg flex items-center gap-3"><UtensilsCrossed className="text-blue-950" /><h2 className="text-3xl font-black text-blue-950 uppercase italic">MAIN EVENT</h2></div>
            {mains.map((item, i) => (
              <div key={i} className="border-b border-slate-600/50 pb-2 flex justify-between">
                <div><h3 className="text-2xl font-bold text-white uppercase">{item.title}</h3><p className="text-slate-300 text-sm">{item.description}</p></div>
                <span className="text-3xl font-black text-orange-500">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Draft Picks Section */}
          <div className="col-span-4 space-y-4">
            <div className="bg-orange-600 p-3 mb-4 rounded-l-lg flex items-center justify-end gap-3"><h2 className="text-3xl font-black text-white uppercase italic">DRAFT PICKS</h2><Beer className="text-white" /></div>
            {drinks.map((item, i) => (
              <div key={i} className="border-b border-slate-600/50 pb-2 flex justify-between text-right">
                <span className="text-2xl font-black text-orange-500">{item.price}</span>
                <div><h3 className="text-xl font-bold text-white uppercase">{item.title}</h3><p className="text-slate-300 text-xs">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (shopId === 'tireshop') return <TireShopTheme ads={items} />;

  return <div className="h-screen bg-black text-white flex items-center justify-center"><h1>SYNCING {shopId}...</h1></div>;
};

export default App;
