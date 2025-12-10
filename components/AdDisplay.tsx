import React from 'react';
import { useSearchParams } from 'react-router-dom';

// --- SPACE MENU (SHRUNK VERSION) ---
const SpaceMenuFinal = () => {
  const items = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
  ];

  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  // CARD COMPONENT
  const FoodItem = ({ item }:any) => (
    <div className="w-full h-full flex flex-col p-1">
      {/* Image Height reduced to 60% to show more text space */}
      <img src={item.ImageURL} className="h-[60%] w-full object-cover rounded-sm mb-2 shadow-lg" alt="Food" />
      <div className="text-center">
         {/* Font sizes reduced slightly to fit better */}
         <h3 className="text-white font-black text-xl lg:text-2xl uppercase mb-1 leading-none">{item.Title}</h3>
         <span className="text-2xl lg:text-3xl font-black text-yellow-400 drop-shadow-md">{item.Price}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      <img src={BG_IMAGE} className="absolute inset-0 w-full h-full object-cover z-0" alt="Background" />

      {/* UPDATED DIMENSIONS:
         I reduced the Width from 25% -> 23%
         I reduced the Height from 39% -> 37%
         I adjusted Top/Left to center them perfectly inside the white lines.
      */}

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
