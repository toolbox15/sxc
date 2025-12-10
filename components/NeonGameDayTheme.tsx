import React from 'react';
import { motion } from 'framer-motion';

// --- 1. THE TRACING BORDER ANIMATION ---
// This creates the "Ants Marching" LED effect around your boxes
const TracingBorder = ({ children }: any) => {
  return (
    <div className="relative w-full h-full">
      {/* Animated Gradient Layer */}
      <div className="absolute -inset-[3px] rounded-sm overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-[-100%]"
          style={{
            backgroundImage: `conic-gradient(from 0deg, transparent 0 340deg, #00FF00 360deg)`, // Green Tail
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[-100%]"
          style={{
            backgroundImage: `conic-gradient(from 180deg, transparent 0 340deg, #FFFF00 360deg)`, // Yellow Tail
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Black Mask (Keeps content readable inside the border) */}
      <div className="absolute inset-0 bg-black/80 z-0" />
      
      {/* The Actual Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

// --- 2. THE FOOD CARD COMPONENT ---
const FoodCard = ({ item }: any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-2">
      {/* Image Area (Top 60%) */}
      <div className="h-[60%] w-full relative overflow-hidden mb-2">
        <img 
          src={item.ImageURL || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
          className="w-full h-full object-cover rounded-sm"
          alt={item.Title} 
        />
      </div>
      {/* Text Area (Bottom 40%) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center leading-none">
        <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter mb-1 font-sans">{item.Title}</h3>
        <span className="text-2xl md:text-3xl font-black text-yellow-400 drop-shadow-md">{item.Price}</span>
      </div>
    </div>
  );
};

const GameDayTheme = ({ ads }: any) => {
  // Filter Data
  const mainItems = ads.filter((ad:any) => ad.Category === 'Main');

  // Fallback Data
  const foods = mainItems.length > 0 ? mainItems : [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" }
  ];

  // 🚨 UPDATED: This is your exact background image link
  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* 1. THE STATIC BACKGROUND IMAGE */}
      <img 
        src={BG_IMAGE} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        alt="Background" 
      />

      {/* 2. THE OVERLAY LAYER (Absolute Positioning to match the boxes) */}
      
      {/* BOX 1 (Left) */}
      <div style={{ position: 'absolute', top: '26%', left: '9.5%', width: '25%', height: '39%' }}>
        <TracingBorder>
           <FoodCard item={foods[0]} />
        </TracingBorder>
      </div>

      {/* BOX 2 (Middle) */}
      <div style={{ position: 'absolute', top: '26%', left: '37.5%', width: '25%', height: '39%' }}>
        <TracingBorder>
           <FoodCard item={foods[1] || foods[0]} />
        </TracingBorder>
      </div>

      {/* BOX 3 (Right) */}
      <div style={{ position: 'absolute', top: '26%', left: '65.5%', width: '25%', height: '39%' }}>
        <TracingBorder>
           <FoodCard item={foods[2] || foods[0]} />
        </TracingBorder>
      </div>

      {/* 3. LIVE SCORES (Top Right Corner Overlay) */}
      {/* This sits exactly where the scoreboard is in your design */}
      <div className="absolute top-[4%] right-[3%] w-[25%] h-[18%] bg-black/80 border-2 border-cyan-400 rounded-lg flex flex-col items-center justify-center shadow-[0_0_20px_#06b6d4]">
          <h2 className="text-yellow-400 font-black text-xl uppercase tracking-widest leading-none mb-1">LIVE SCORES</h2>
          <div className="flex w-full justify-between px-8 text-gray-300 text-xs font-bold tracking-widest">
              <span>KC</span>
              <span>SF</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
              <span className="text-4xl font-mono font-bold text-white">24</span>
              <span className="bg-green-600 text-black font-black px-2 py-0.5 text-xs rounded animate-pulse">4TH QTR</span>
              <span className="text-4xl font-mono font-bold text-white">17</span>
          </div>
      </div>

    </div>
  );
};

export default GameDayTheme;
