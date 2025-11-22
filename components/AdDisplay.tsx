import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const DEVICE_NAME = "Lobby_Screen_1";

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(API_URL);
        const data = await res.json();
        setAds(data.filter((ad:any) => ad.Status === 'Active'));
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    const sendHeartbeat = async () => {
      try {
        if (!API_URL) return;
        await fetch(`${API_URL}?action=heartbeat&device_id=${DEVICE_NAME}`, { mode: 'no-cors' });
      } catch (e) {}
    };

    fetchAds();
    sendHeartbeat();
    setInterval(fetchAds, 30000);
    setInterval(sendHeartbeat, 60000);
  }, []);

  // FALLBACK: If sheet is empty, show this so the portfolio looks good
  const displayAds = ads.length > 0 ? ads : [
    { Title: "Texas Brisket", Price: "$24.00", ImageURL: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800" },
    { Title: "Smoked Ribs", Price: "$18.50", ImageURL: "https://images.unsplash.com/photo-1544025162-d76690b6d012?auto=format&fit=crop&w=800" }
  ];

  return (
    <div className="relative min-h-screen bg-stone-900 overflow-hidden font-sans">
      
      {/* 1. MARQUEE HEADER */}
      <div className="bg-red-900 text-white py-2 overflow-hidden whitespace-nowrap border-b-4 border-yellow-600 shadow-xl z-20 relative">
        <div className="inline-block animate-marquee text-xl font-bold tracking-wider">
          🔥 FRESH OUT OF THE PIT — GET IT WHILE IT LASTS — SMOKED LOW AND SLOW FOR 14 HOURS — ASK ABOUT OUR BURNT ENDS SPECIAL 🔥
        </div>
      </div>

      {/* 2. MENU GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pb-32">
        {displayAds.map((ad, index) => (
          <div key={index} className="group relative bg-black border-2 border-stone-700 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]">
             {/* Image */}
             <div className="h-64 overflow-hidden">
               <img src={ad.ImageURL} alt={ad.Title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
             {/* Text */}
             <div className="p-6 bg-gradient-to-t from-black to-stone-900">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-orange-400 transition-colors">{ad.Title}</h2>
                {ad.Price && <div className="text-3xl text-yellow-500 font-bold font-mono">{ad.Price}</div>}
             </div>
          </div>
        ))}
      </div>

      {/* 3. FIRE ANIMATION LAYER (CSS Only - No Libraries needed) */}
      <div className="fixed bottom-0 left-0 w-full h-64 pointer-events-none z-0 flex justify-center items-end opacity-60 mix-blend-screen">
         {/* We use simple CSS styling injected here for the marquee and fire */}
         <style>{`
           @keyframes marquee {
             0% { transform: translateX(100%); }
             100% { transform: translateX(-100%); }
           }
           .animate-marquee {
             animation: marquee 20s linear infinite;
           }
         `}</style>
         {/* Fake Fire Gradient */}
         <div className="w-full h-full bg-gradient-to-t from-orange-600 via-red-900 to-transparent opacity-80 blur-xl animate-pulse"></div>
      </div>
    </div>
  );
}
