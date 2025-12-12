import React from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT THE OTHER THEMES
// (These files must exist in your components folder)
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';

// --- 2. DEFINE THE NEW VIDEO THEME (INTERNAL COMPONENT) ---
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-col items-center justify-center w-full z-20 mt-[2%]">
      <h1 className="relative text-7xl md:text-8xl font-black tracking-wider uppercase"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            backgroundImage: "linear-gradient(to right, #ff3333, #ffffff, #3366ff), radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 4px 4px",
            backgroundBlendMode: "multiply",
            mixBlendMode: "screen",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.8)",
            filter: "drop-shadow(0 0 15px rgba(255,50,50,0.6))"
          }}
      >
        {text}
      </h1>
      <h2 className="text-4xl md:text-5xl font-bold text-blue-400 uppercase tracking-widest mt-[-10px]"
          style={{ textShadow: "0 0 20px #0000FF", mixBlendMode: "plus-lighter" }}>
        {subtext}
      </h2>
    </div>
  );
};

const FoodItem = ({ item }:any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-1">
      <img src={item.ImageURL} className="h-[60%] w-full object-cover rounded-sm mb-2 shadow-lg" alt="Food" />
      <div className="text-center">
         <h3 className="text-white font-black text-xl lg:text-2xl uppercase mb-1 leading-none tracking-tighter">{item.Title}</h3>
         <span className="text-2xl lg:text-3xl font-black text-yellow-400 drop-shadow-md">{item.Price}</span>
      </div>
    </div>
  );
};

const SpaceMenuFinal = ({ ads }: any) => {
  // Use passed data or fallback
  const items = (ads && ads.length > 0) ? ads : [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
  ];

  const BG_VIDEO = "https://www.dropbox.com/scl/fi/1mdvf7p08f4xwo4rnp19f/bkgrd-menu.mp4?rlkey=f75w50969ivhhb7lzy8p34had&st=bc8bz5jb&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      <video src={BG_VIDEO} className="absolute inset-0 w-full h-full object-fill z-0" autoPlay loop muted playsInline />
      <div className="absolute top-0 w-full h-[25%] flex items-center justify-center z-10">
         <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
      </div>
      <div className="absolute inset-0 z-10">
          <div style={{ position: 'absolute', top: '27%', left: '10.5%', width: '23%', height: '37%' }}><FoodItem item={items[0]} /></div>
          <div style={{ position: 'absolute', top: '27%', left: '38.5%', width: '23%', height: '37%' }}><FoodItem item={items[1]} /></div>
          <div style={{ position: 'absolute', top: '27%', left: '66.5%', width: '23%', height: '37%' }}><FoodItem item={items[2]} /></div>
      </div>
    </div>
  );
};

// --- 3. THE MAIN ROUTER (The Brain) ---
const AdDisplay = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); 

  // Hardcoded backup data so menus don't crash if Google Sheet is empty
  const backupAds = [
    { Category: 'Main', Title: 'TEST NACHOS', Price: '$14.99' },
    { Category: 'Main', Title: 'TEST WINGS', Price: '$12.99' },
    { Category: 'Main', Title: 'TEST BURGER', Price: '$16.99' }
  ];

  console.log("Current Theme requested:", theme);

  // 4. CHECK THE URL AND SHOW THE RIGHT THEME
  
  // IF ?id=Static -> Show the New Video Menu
  if (theme === 'Static') {
    return <SpaceMenuFinal ads={backupAds} />;
  }
  
  // IF ?id=Neon or ?id=Sports -> Show the old GameDay theme
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={backupAds} />;
  }

  // ELSE (Default) -> Show Cinematic/Corporate Theme
  return <CinematicTheme ads={backupAds} />;
};

export default AdDisplay;
