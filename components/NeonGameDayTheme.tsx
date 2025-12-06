import React from 'react';
import TechCard from './TechCard'; // <--- Import the Lego Block we just made

// --- PLACEHOLDER DATA ---
const DUMMY_MENU = {
  featured: [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80", Category: "Main" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80", Category: "Main" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", Category: "Main" }
  ],
  offers: [
    { Title: "HALF-OFF APPS", Description: "UNTIL KICKOFF" },
    { Title: "BEER OF THE MONTH", Description: "HAZY HOPPER - $7" }
  ]
};

const NeonGameDayTheme: React.FC<{ ads?: any[] }> = ({ ads = [] }) => {
  const featured = ads.filter(ad => ad.Category === 'Main').length > 0 ? ads.filter(ad => ad.Category === 'Main') : DUMMY_MENU.featured;

  return (
    <div className="w-full h-screen bg-black p-8 flex flex-col gap-6 relative overflow-hidden">
      
      {/* BACKGROUND (The Circuit Board Look) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a2e_0%,#000000_100%)] z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 z-0" />

      {/* --- HEADER BAR (The "Game Day" Box) --- */}
      <div className="relative z-10 h-[15%] w-full flex items-center justify-between border-b-4 border-red-600 bg-black/50 px-8 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)]">
          {/* Left Title */}
          <div className="flex flex-col">
             <h1 className="text-6xl font-black text-white italic tracking-tighter drop-shadow-[4px_4px_0_#b91c1c]">
               GAME DAY <span className="text-blue-500">MENU</span>
             </h1>
          </div>
          {/* Right Live Score (Static Mockup) */}
          <div className="flex items-center gap-6 border-2 border-white/20 bg-black px-6 py-2 rounded-lg">
             <div className="text-center">
                <div className="text-gray-400 text-xs font-bold">HOME</div>
                <div className="text-4xl font-black text-white">24</div>
             </div>
             <div className="text-red-500 font-bold animate-pulse">VS</div>
             <div className="text-center">
                <div className="text-gray-400 text-xs font-bold">AWAY</div>
                <div className="text-4xl font-black text-white">21</div>
             </div>
          </div>
      </div>

      {/* --- MAIN CONTENT (Using TechCards) --- */}
      <div className="relative z-10 h-[65%] grid grid-cols-3 gap-8 px-4">
          <TechCard title={featured[0].Title} price={featured[0].Price} color="red" delay={0.1}>
             <img src={featured[0].ImageURL} className="w-full h-full object-cover" alt="Food" />
          </TechCard>
          
          <TechCard title={featured[1].Title} price={featured[1].Price} color="blue" delay={0.3}>
             <img src={featured[1].ImageURL} className="w-full h-full object-cover" alt="Food" />
          </TechCard>

          <TechCard title={featured[2].Title} price={featured[2].Price} color="orange" delay={0.5}>
             <img src={featured[2].ImageURL} className="w-full h-full object-cover" alt="Food" />
          </TechCard>
      </div>

      {/* --- FOOTER PROMOS --- */}
      <div className="relative z-10 h-[15%] flex gap-4">
        {DUMMY_MENU.offers.map((offer, i) => (
            <div key={i} className="flex-1 border-2 border-dashed border-gray-700 bg-gray-900/80 rounded-lg flex items-center justify-center gap-4 shadow-lg">
                <span className="text-yellow-400 font-black text-2xl uppercase animate-pulse">{offer.Title}:</span>
                <span className="text-white font-bold text-xl tracking-widest">{offer.Description}</span>
            </div>
        ))}
      </div>

    </div>
  );
};

export default NeonGameDayTheme;
