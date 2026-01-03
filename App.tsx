import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- THEME 1: TONY'S BAR (FOOTBALL) ---
const BearsTheme = ({ ads }: { ads: any[] }) => {
  const getByCat = (c: string) => ads.filter(a => 
    String(a.Category || a.category || "").toLowerCase().includes(c.toLowerCase())
  );

  const renderItem = (item: any, i: number) => {
    // YOUR SMART LOGIC HERE
    const title = item.Title || item.title || item.TITLE || "Unnamed Item";
    const price = item.Price || item.price || item.PRICE || "";
    return (
      <div key={i} className="flex justify-between border-b border-white/20 mb-2 text-2xl font-bold uppercase">
        <span>{title}</span>
        <span className="text-orange-500">{price}</span>
      </div>
    );
  };

  return (
    <div className="w-full h-screen relative bg-cover bg-center text-white font-sans" style={{ backgroundImage: "url('/field-bg.png')" }}>
      <div className="absolute inset-0 bg-blue-900/20"></div>
      <h1 className="relative z-10 text-center text-7xl font-black pt-10 uppercase italic drop-shadow-2xl">
        GAME DAY <span className="text-orange-500">SPECIALS</span>
      </h1>
      
      <div className="relative z-10 grid grid-cols-3 gap-10 p-20 mt-10">
        <div>
          <div className="bg-orange-600 p-2 mb-4 font-bold italic">KICKOFF</div>
          {getByCat('kickoff').map((item, i) => renderItem(item, i))}
        </div>
        <div className="bg-blue-950/40 p-4 border-t-4 border-white backdrop-blur-sm">
          <div className="bg-white text-blue-900 p-2 mb-6 font-bold text-center text-xl">THE MAIN EVENT</div>
          {getByCat('main').map((item, i) => (
            <div key={i} className="text-center mb-8">
              <div className="text-4xl font-black uppercase">{item.Title || item.title || item.TITLE}</div>
              <div className="text-3xl text-orange-500 font-bold">{item.Price || item.price || item.PRICE}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-orange-600 p-2 mb-4 font-bold italic text-right">DRAFT PICKS</div>
          {getByCat('draft').map((item, i) => (
             <div key={i} className="flex justify-between flex-row-reverse border-b border-white/20 mb-2 text-2xl font-bold uppercase">
                <span>{item.Title || item.title || item.TITLE}</span>
                <span className="text-orange-500">{item.Price || item.price || item.PRICE}</span>
             </div>
          ))}
        </div>
      </div>
      <img src="/beer-glass.png" className="absolute bottom-5 left-5 h-48 drop-shadow-2xl" style={{ transform: 'scaleX(-1)' }} />
      <img src="/football.png" className="absolute bottom-5 right-5 h-24 drop-shadow-2xl" />
    </div>
  );
};

// --- THEME 2: TIRE SHOP (DARK) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div className="h-screen bg-slate-950 text-white p-20 flex flex-col items-center">
    <h1 className="text-7xl font-black mb-12 italic border-b-8 border-yellow-400 pb-4 uppercase">
      TIRE SHOP <span className="text-yellow-400">DEALS</span>
    </h1>
    <div className="w-full max-w-4xl space-y-6">
      {ads.map((ad, i) => (
        <div key={i} className="bg-slate-900 border-l-8 border-yellow-400 p-8 flex justify-between items-center shadow-2xl">
          <div className="text-4xl font-black uppercase tracking-tighter">{ad.Title || ad.title || ad.TITLE}</div>
          <div className="text-5xl font-black text-yellow-400">{ad.Price || ad.price || ad.PRICE}</div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP LOGIC ---
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  const shopId = (params.get('id') || "tonysbar").toLowerCase().replace(/\s/g, '');
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
        const data = await res.json();
        
        const filtered = data.filter((row: any) => {
          // Flexible mapping for Target_Screen and Status
          const target = String(row.Target_Screen || row.target_screen || row.targetScreen || "").toLowerCase().replace(/\s/g, '');
          const status = String(row.Status || row.status || "").toLowerCase().trim();
          return target === shopId && status === 'active';
        });
        setItems(filtered);
      } catch (e) { console.error("Error fetching data:", e); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopId]);

  return shopId === 'tireshop' ? <TireShopTheme ads={items} /> : <BearsTheme ads={items} />;
};

export default App;
