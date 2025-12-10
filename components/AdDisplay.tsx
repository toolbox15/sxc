import React from 'react';
import { useSearchParams } from 'react-router-dom';

// --- 1. THE OUTER SCREEN GLOW (THE BIG BORDER) ---
const ScreenBorder = () => {
  return (
    // FIX: Changed inset-[1.5%] to inset-0 so it touches the very edges
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-none">
      
      {/* The Moving Gradient Layer */}
      <div className="absolute inset-0 p-[10px]"> {/* Matches the thickness of your dotted line */}
        
        {/* Green Tail */}
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#00FF00_360deg)] animate-[spin_4s_linear_infinite]" />
        
        {/* Yellow Tail */}
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_180deg,transparent_0_340deg,#FFFF00_360deg)] animate-[spin_4s_linear_infinite]" />
        
        {/* The Black Inner Mask (This cuts out the center so you can see the menu) */}
        {/* We leave a transparent gap for the border to shine through */}
        <div className="absolute inset-[10px] bg-transparent" /> 
      </div>
    </div>
  );
};

// --- 2. FOOD CARD ---
const FoodItem = ({ item }:any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-1">
      <img 
        src={item.ImageURL} 
        className="h-[60%] w-full object-cover rounded-sm mb-2 shadow-lg" 
        alt="Food" 
      />
      <div className="text-center">
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

// --- 3. THE MENU LAYOUT ---
const SpaceMenuFinal = () => {
  const items = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
  ];

  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* A. The Glowing Frame (Now perfectly aligned to the edge) */}
      <ScreenBorder />

      {/* B. The Background Image (Stretched to fit) */}
      <img 
        src={BG_IMAGE} 
        className="absolute inset-0 w-full h-full object-fill z-0" 
        alt="Background" 
      />

      {/* C. The Food Items */}
      
      {/* LEFT BOX */}
      <div style={{ position: 'absolute', top: '27%', left: '10.5%', width: '23%', height: '37%' }}>
        <FoodItem item={items[0]} />
      </div>

      {/* MIDDLE BOX */}
      <div style={{ position: 'absolute', top: '27%', left: '38.5%', width: '23%', height: '37%' }}>
        <FoodItem item={items[1]} />
      </div>

      {/* RIGHT BOX */}
      <div style={{ position: 'absolute', top: '27%', left: '66.5%', width: '23%', height: '37%' }}>
        <FoodItem item={items[2]} />
      </div>

    </div>
  );
};

// --- MAIN APP ---
const AdDisplay = () => {
  return <SpaceMenuFinal />;
};

export default AdDisplay;
