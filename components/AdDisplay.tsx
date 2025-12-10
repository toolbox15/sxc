import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Import the other themes (we keep these as they work)
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';

// --- 1. THE SPACE THEME (DEFINED RIGHT HERE) ---
// We define it inside this file so it CANNOT fail to load.
const SpaceMenuInternal = ({ ads }: any) => {
  // Hardcoded backup data
  const backupData = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
  ];

  const itemsToDisplay = (ads && ads.length > 0) ? ads : backupData;
  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      <img src={BG_IMAGE} className="absolute inset-0 w-full h-full object-cover z-0" alt="Background" />

      {/* LEFT BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '9.5%', width: '25%', height: '39%' }}>
        <InternalFoodCard item={itemsToDisplay[0]} />
      </div>

      {/* MIDDLE BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '37.5%', width: '25%', height: '39%' }}>
        <InternalFoodCard item={itemsToDisplay[1] || itemsToDisplay[0]} />
      </div>

      {/* RIGHT BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '65.5%', width: '25%', height: '39%' }}>
        <InternalFoodCard item={itemsToDisplay[2] || itemsToDisplay[0]} />
      </div>
    </div>
  );
};

// Helper for the Space Theme
const InternalFoodCard = ({ item }: any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="h-[65%] w-full relative overflow-hidden mb-2 rounded-sm shadow-lg">
        <img src={item.ImageURL} className="w-full h-full object-cover" alt={item.Title} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-start text-center leading-none">
        <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter mb-1 font-sans">{item.Title}</h3>
        <span className="text-2xl md:text-3xl font-black text-yellow-400 drop-shadow-md">{item.Price}</span>
      </div>
    </div>
  );
};

// --- 2. THE MAIN ROUTER ---
const AdDisplay = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); 

  // Hardcoded backup data for the other themes
  const backupAds = [
    { Category: 'Main', Title: 'TEST NACHOS', Price: '$14.99' },
    { Category: 'Main', Title: 'TEST WINGS', Price: '$12.99' }
  ];

  console.log("Current Theme requested:", theme);

  // If URL is .../?id=Static -> USE THE INTERNAL THEME ABOVE
  if (theme === 'Static') {
    return <SpaceMenuInternal ads={backupAds} />;
  }
  
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={backupAds} />;
  }

  return <CinematicTheme ads={backupAds} />;
};

export default AdDisplay;
