import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

const BearsTheme = ({ ads }: { ads: any[] }) => {
  // Mapping based on your screenshot categories
  const kickoff = ads.filter(ad => String(ad.category).toLowerCase().includes('kickoff'));
  const mains = ads.filter(ad => String(ad.category).toLowerCase().includes('main'));
  const drinks = ads.filter(ad => String(ad.category).toLowerCase().includes('draft'));

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

        {/* Kickoff Section */}
        <div className="col-span-4 pl-40 pt-4">
          <div className="bg-orange-600 p-2 mb-4 font-black italic">KICKOFF</div>
          {kickoff.map((item, i) => (
            <div key={i} className="mb-4 border-b border-white/20 pb-2">
              <div className="flex justify-between font-bold text-2xl">
                <span>{item.title}</span>
                <span className="text-orange-500">{item.price}</span>
              </div>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Main Event Section */}
        <div className="col-span-4 bg-blue-950/40 p-6 border-t-4 border-white backdrop-blur-sm">
          <div className="bg-white text-blue-950 p-2 mb-6 font-black italic text-center text-2xl">THE MAIN EVENT</div>
          {mains.map((item, i) => (
            <div key={i} className="mb-8 text-center border-b border-white/20 pb-4">
              <h3 className="text-3xl font-black uppercase">{item.title}</h3>
              <div className="text-3xl font-black text-orange-500 my-1">{item.price}</div>
              <p className="text-sm italic">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Draft Picks Section */}
        <div className="col-span-4 pr-32 pt-4 text-right">
          <div className="bg-orange-600 p-2 mb-4 font-black italic">DRAFT PICKS</div>
          {drinks.map((item, i) => (
            <div key={i} className="mb-4 border-b border-white/20 pb-2">
              <div className="flex justify-between flex-row-reverse font-bold text-2xl">
                <span>{item.title}</span>
                <span className="text-orange-500">{item.price}</span>
              </div>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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

        // 🛡️ RE-MAPPING TO MATCH YOUR SPREADSHEET COLUMNS
        const filtered = allData.filter((row: any) => {
          // Normalize the client name for comparison
          const clientInSheet = String(row.client).toLowerCase().replace(/['\s]/g, '');
          
          // Use Column J for Status and Column L for Target_Screen as per your image
          return clientInSheet === shopIdFromURL && String(row.status).toLowerCase() === "active";
        });
        
        setItems(filtered);
      } catch (err) { console.error("Error:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopIdFromURL]);

  return <BearsTheme ads={items} />;
};

export default App;
