import React, { useState, useEffect } from 'react';

// --- THEME 1: TONY'S BAR (FOOTBALL FIELD) ---
const BearsTheme = ({ ads }: { ads: any[] }) => {
  // Flexible filter: catches 'Kickoff', 'KICKOFF', 'MAINS', 'Draft Picks', etc.
  const getByCat = (c: string) => ads.filter(a => {
    const cat = String(a.Category || a.category || "").toLowerCase().trim();
    if (c === 'kickoff') return cat.includes('kick'); 
    if (c === 'main') return cat.includes('main');
    if (c === 'draft') return cat.includes('draft') || cat.includes('pick');
    return false;
  });

  const renderItem = (item: any, i: number) => {
    const title = item.Title || item.title || "Unnamed Item";
    const price = item.Price || item.price || "";
    return (
      <div key={i} className="flex justify-between border-b border-white/20 mb-3 text-2xl font-bold uppercase tracking-tight">
        <span>{title}</span>
        <span className="text-orange-500">{price}</span>
      </div>
    );
  };

  return (
    <div className="w-full h-screen relative bg-cover bg-center text-white font-sans overflow-hidden" 
         style={{ backgroundImage: "url('/field-bg.png')" }}>
      <div className="absolute inset-0 bg-blue-950/20 z-0"></div>
      
      <h1 className="relative z-10 text-center text-7xl font-black pt-12 uppercase italic drop-shadow-2xl">
        GAME DAY <span className="text-orange-500">SPECIALS</span>
      </h1>
      
      <div className="relative z-10 grid grid-cols-3 gap-12 p-16 mt-6">
        {/* KICKOFF SECTION */}
        <div className="px-4">
          <div className="bg-orange-600 p-2 mb-6 font-black italic text-xl shadow-lg">KICKOFF</div>
          {getByCat('kickoff').length > 0 ? 
            getByCat('kickoff').map((item, i) => renderItem(item, i)) : 
            <p className="text-sm opacity-40 italic">Check Sheet: Column D must contain 'Kickoff'</p>
          }
        </div>

        {/* MAIN EVENT SECTION */}
        <div className="bg-blue-950/50 p-6 border-t-4 border-white backdrop-blur-md shadow-2xl">
          <div className="bg-white text-blue-900 p-2 mb-8 font-black text-center text-2xl uppercase">The Main Event</div>
          {getByCat('main').map((item, i) => (
            <div key={i} className="text-center mb-10 border-b border-white/10 pb-4">
              <div className="text-4xl font-black uppercase leading-none">{item.Title || item.title}</div>
              <div className="text-3xl text-orange-500 font-bold mt-2">{item.Price || item.price}</div>
            </div>
          ))}
        </div>

        {/* DRAFT PICKS SECTION */}
        <div className="px-4 text-right">
          <div className="bg-orange-600 p-2 mb-6 font-black italic text-xl shadow-lg">DRAFT PICKS</div>
          {getByCat('draft').map((item, i) => (
             <div key={i} className="flex justify-between flex-row-reverse border-b border-white/20 mb-3 text-2xl font-bold uppercase">
                <span>{item.Title || item.title}</span>
                <span className="text-orange-500">{item.Price || item.price}</span>
             </div>
          ))}
        </div>
      </div>

      {/* FOOTBALL ASSETS */}
      <img src="/beer-glass.png" className="absolute bottom-6 left-8 h-56 drop-shadow-2xl" style={{ transform: 'scaleX(-1)' }} />
      <img src="/football.png" className="absolute bottom-8 right-8 h-28 drop-shadow-2xl" />
    </div>
  );
};

// --- THEME 2: TIRE SHOP (DARK THEME) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div className="h-screen bg-slate-950 text-white p-24 flex flex-col items-center justify-start overflow-hidden">
    <h1 className="text-8xl font-black mb-16 italic border-b-8 border-yellow-400 pb-6 uppercase tracking-tighter">
      TIRE SHOP <span className="text-yellow-400">DEALS</span>
    </h1>
    <div className="w-full max-w-5xl space-y-8">
      {ads.length > 0 ? ads.map((ad, i) => (
        <div key={i} className="bg-slate-900 border-l-[12px] border-yellow-400 p-10 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="text-5xl font-black uppercase tracking-tighter">{ad.Title || ad.title}</div>
          <div className="text-6xl font-black text-yellow-400 font-mono">{ad.Price || ad.price}</div>
        </div>
      )) : <p className="text-3xl opacity-30 italic">No Active Deals Found in Sheet</p>}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  
  // Normalizes URL ID: 'tonysbar' or 'tireshop'
  const shopId = (params.get('id') || "tonysbar").toLowerCase().replace(/\s/g, '');
  
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
        const data = await res.json();
        
        const filtered = data.filter((row: any) => {
          // Cleans Target_Screen (Column K) and Status (Column I)
          const target = String(row.Target_Screen || row.target_screen || row.targetScreen || "").toLowerCase().replace(/\s/g, '');
          const status = String(row.Status || row.status || "").toLowerCase().trim();
          
          // Match if URL id is found in the sheet target column
          return (target.includes(shopId) || shopId.includes(target)) && status === 'active';
        });
        setItems(filtered);
      } catch (e) { console.error("Data Fetch Error:", e); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Live refresh every 5 seconds
    return () => clearInterval(interval);
  }, [shopId]);

  return shopId === 'tireshop' ? <TireShopTheme ads={items} /> : <BearsTheme ads={items} />;
};

export default App;
