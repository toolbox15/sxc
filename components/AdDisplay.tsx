import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- 1. THE TRACING NEON BORDER COMPONENT ---
// This creates the moving light effect AND a solid black background to cover the old lines.
const NeonFrame = ({ children }: any) => {
  return (
    <div className="relative w-full h-full p-[3px] overflow-hidden rounded-lg bg-black">
      
      {/* A. The "Tracing" Animation Layer */}
      {/* This spins a gradient behind the black box to look like moving lights */}
      <motion.div
        className="absolute inset-[-150%]"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0 340deg, #00FF00 360deg)' // Green Light
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[-150%]"
        style={{
          background: 'conic-gradient(from 180deg, transparent 0 340deg, #FFFF00 360deg)' // Yellow Light
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* B. The "Mask" Layer */}
      {/* This creates the black center so only the edges glow */}
      <div className="absolute inset-[3px] bg-black rounded-lg z-10" />

      {/* C. The Content Layer */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};

// --- 2. THE CONTENT (FOOD ITEM) ---
const FoodItem = ({ item }:any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-2">
      <img 
        src={item.ImageURL} 
        className="h-[60%] w-full object-cover rounded-sm mb-2 shadow-lg z-20" 
        alt="Food" 
      />
      <div className="text-center z-20">
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

// --- 3. THE SPACE MENU LAYOUT ---
const SpaceMenuFinal = () => {
  const items = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
  ];

  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* Background Image - We still use "fill" to stretch it */}
      <img 
        src={BG_IMAGE} 
        className="absolute inset-0 w-full h-full object-fill z-0" 
        alt="Background" 
      />

      {/* LAYOUT STRATEGY: 
         We make these boxes slightly LARGER than the white lines in your picture.
         Because they have a black background, they will sit ON TOP of the white lines
         and cover them up.
      */}

      {/* LEFT BOX */}
      <div style={{ position: 'absolute', top: '26.5%', left: '11.5%', width: '23%', height: '37%' }}>
        <NeonFrame>
           <FoodItem item={items[0]} />
        </NeonFrame>
      </div>

      {/* MIDDLE BOX */}
      <div style={{ position: 'absolute', top: '26.5%', left: '38.5%', width: '23%', height: '37%' }}>
        <NeonFrame>
           <FoodItem item={items[1]} />
        </NeonFrame>
      </div>

      {/* RIGHT BOX */}
      <div style={{ position: 'absolute', top: '26.5%', left: '65.5%', width: '23%', height: '37%' }}>
        <NeonFrame>
           <FoodItem item={items[2]} />
        </NeonFrame>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const AdDisplay = () => {
  return <SpaceMenuFinal />;
};

export default AdDisplay;
