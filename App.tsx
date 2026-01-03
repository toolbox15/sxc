import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- THEME 1: TONY'S BAR ---
const BearsTheme = ({ ads }: { ads: any[] }) => {
  const getByCat = (c: string) => ads.filter(a => 
    String(a.Category || a.category || "").toLowerCase().includes(c.toLowerCase())
  );

  return (
    <div className="w-full h-screen relative bg-cover bg-center text-white" style={{ backgroundImage: "url('/field-bg.png')" }}>
      <div className="absolute inset-0 bg-blue-900/20"></div>
      <h1 className="relative z-10 text-center text-6xl font-black pt-10 uppercase italic">
        GAME DAY <span className="text-orange-500">SPECIALS</span>
      </h1>
      
      <div className="relative z-10 grid grid-cols-3 gap-10 p-20 mt-10">
        <div>{/* KICKOFF */}
          <div className="bg-orange-600 p-2 mb-4 font-bold italic">KICKOFF</div>
          {getByCat('kickoff').map((item, i) => (
            <div key={i} className="flex justify-between border-b border-white/20 mb-2 text-2xl font-bold">
              <span>{item.Title || item.title}</span><span className="text-orange-500">{item.Price || item.price}</span>
            </div>
          ))}
        </div>
        <div className="bg-blue-950/40 p-4 border-t-4 border-white">
          <div className="bg-white text-blue-900 p-2 mb-4 font-bold text-center">THE MAIN EVENT</div>
          {getByCat('main').map((item, i) => (
            <div key={i} className="text-center mb-6">
              <div className="text-3xl font-black uppercase">{item.Title || item.title}</div>
              <div className="text-2xl text-orange-500 font-bold">{item.Price || item.price}</div>
            </div>
          ))}
        </div>
        <div>{/* DRAFT PICKS */}
          <div className="bg-orange-600 p-2 mb-4 font-bold italic text-right">DRAFT PICKS</div>
          {getByCat('draft').map((item, i) => (
            <div key={i} className="flex justify-between flex-row-reverse border-b border-white/20 mb-2 text-2xl font-bold">
              <span>{item.Title || item.title}</span><span className="text-orange-500">{item.Price || item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <img src="/beer-glass.png" className="absolute bottom-5 left-5 h-48" style={{ transform: 'scaleX(-1)' }} />
      <img src="/football.png" className="absolute bottom-5 right-5 h-24" />
    </div>
  );
};

// --- THEME 2: TIRE SHOP ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div className="h-screen bg-slate-950 text-white p-20 flex flex-col items-center">
    <h1 className="text-7xl font-black mb-12 italic border-b-8 border-yellow-400 pb-4">
      TIRE SHOP <span className="text-yellow-400">DEALS</span>
    </h1>
    <div className="w-full max-w-4xl space-y-6">
      {ads.map((ad, i) => (
        <div key={i} className="bg-slate-900 border-l-8 border-yellow-400 p-8 flex justify-between items-center">
          <div className="text-4xl font-black uppercase">{ad.Title || ad.title}</div>
          <div className="text-5xl font-black text-yellow-400">{ad.Price || ad.price}</div>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  // URL cleanup to handle 'tireshop' vs 'tonysbar'
  const shopId = (params.get('id') || "tonysbar").toLowerCase().replace(/\s/g, '');
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
        const data = await res.json();
        const filtered = data.filter((row: any) => {
          // Clean up the Target_Screen from sheet (removes spaces)
          const sheetTarget = String(row.Target_Screen || row.target_screen || "").toLowerCase().replace(/\s/g, '');
          const status = String(row.Status || row.status || "").toLowerCase();
          return sheetTarget === shopId && status === 'active';
        });
        setItems(filtered);
      } catch (e) { console.error(e); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopId]);

  return shopId === 'tireshop' ? <TireShopTheme ads={items} /> : <BearsTheme ads={items} />;
};

export default App;
