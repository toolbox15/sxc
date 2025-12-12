import React from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT OTHER THEMES
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';

// --- THE HEADER COMPONENT (Side-by-Side + Pulsating Glow) ---
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full z-20 mt-[3%] gap-4">
      
      {/* A. MAIN TEXT ("GAME DAY") - With Pulsating White Glow */}
      <h1 className="relative text-6xl md:text-8xl font-black tracking-wider uppercase animate-pulse-glow"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            // The Gradient Pattern
            backgroundImage: "linear-gradient(to right, #ff3333, #ffffff, #3366ff), radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 4px 4px",
            backgroundBlendMode: "multiply",
            mixBlendMode: "screen",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            // The initial glow (Animation handles the rest)
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))"
          }}
      >
        {text}
      </h1>

      {/* B. SUBTEXT ("EATS & DRINKS") - Solid Blue Neon */}
      <h2 className="text-4xl md:text-6xl font-bold text-blue-400 uppercase tracking-widest"
          style={{ 
            textShadow: "0 0 20px #0000FF, 0 0 40px #0000FF", 
            mixBlendMode: "plus-lighter" 
          }}
      >
        {subtext}
      </h2>

      {/* C. INLINE STYLE FOR THE PULSE ANIMATION */}
      <style>{`
        @keyframes pulse-white-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.6)); }
          50% { filter: drop-shadow(0 0 30px rgba(255,255,255,1)); }
        }
        .animate-pulse-glow {
          animation: pulse-white-glow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// --- FOOD CARD (Left & Middle) ---
const FoodItem = ({ item }:any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-1 relative group">
      <img src={item.ImageURL} className="h-[65%] w-full object-cover rounded-md mb-2 shadow-lg border-2 border-white/10" alt="Food" />
      <div className="text-center bg-black/60 p-2 rounded-md backdrop-blur-sm">
         <h3 className="text-white font-black text-xl lg:text-2xl uppercase mb-1 leading-none tracking-tighter">
            {item.Title}
         </h3>
         <span className="text-2xl lg:text-3xl font-black text-yellow-400 drop-shadow-md">
            {item.Price}
         </span>
      </div>
    </div>
  );
};

// --- DRINK LIST (Right Box - Professional List) ---
const DrinkList = () => {
  const drinks = [
    { name: "BUD LIGHT DRAFT", price: "$5.00" },
    { name: "MODELO ESPECIAL", price: "$6.00" },
    { name: "LAGUNITAS IPA", price: "$7.50" },
    { name: "TITO'S & SODA", price: "$8.00" },
    { name: "SPICY MARGARITA", price: "$10.00" },
    { name: "GAME DAY SHOT", price: "$5.00" }
  ];

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/50 rounded-lg border border-white/20 backdrop-blur-md">
      <div className="border-b-2 border-red-600 mb-3 pb-1">
        <h3 className="text-white font-black text-2xl uppercase italic tracking-wider">ON TAP & SHOTS</h3>
      </div>
      <div className="flex flex-col gap-3 overflow-hidden">
        {drinks.map((drink, index) => (
          <div key={index} className="flex justify-between items-center border-b border-white/10 pb-1">
            <span className="text-white font-bold text-lg uppercase truncate mr-2">{drink.name}</span>
            <span className="text-yellow-400 font-black text-xl">{drink.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- THE LAYOUT ---
const SpaceMenuFinal = ({ ads }: any) => {
  const foodItems = (ads && ads.length > 0) ? ads : [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
  ];

  const BG_VIDEO = "https://www.dropbox.com/scl/fi/1mdvf7p08f4xwo4rnp19f/bkgrd-menu.mp4?rlkey=f75w50969ivhhb7lzy8p34had&st=bc8bz5jb&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* 1. BACKGROUND VIDEO */}
      <video src={BG_VIDEO} className="absolute inset-0 w-full h-full object-fill z-0" autoPlay loop muted playsInline />

      {/* 2. HEADER (Side-by-Side) */}
      <div className="absolute top-0 w-full h-[25%] flex items-center justify-center z-10">
         <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
      </div>

      {/* 3. CONTENT GRID */}
      <div className="absolute inset-0 z-10">
          
          {/* LEFT BOX (Food) */}
          <div style={{ position: 'absolute', top: '28%', left: '10%', width: '24%', height: '45%' }}>
            <FoodItem item={foodItems[0]} />
          </div>

          {/* MIDDLE BOX (Food) */}
          <div style={{ position: 'absolute', top: '28%', left: '38%', width: '24%', height: '45%' }}>
            <FoodItem item={foodItems[1]} />
          </div>

          {/* RIGHT BOX (Drink List) */}
          <div style={{ position: 'absolute', top: '28%', left: '66%', width: '24%', height: '45%' }}>
            <DrinkList />
          </div>
      </div>
    </div>
  );
};

// --- MAIN ROUTER ---
const AdDisplay = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); 

  const backupAds = [
    { Category: 'Main', Title: 'TEST NACHOS', Price: '$14.99' },
    { Category: 'Main', Title: 'TEST WINGS', Price: '$12.99' }
  ];

  if (theme === 'Static') {
    return <SpaceMenuFinal ads={backupAds} />;
  }
  
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={backupAds} />;
  }

  return <CinematicTheme ads={backupAds} />;
};

export default AdDisplay;
