import React from 'react';
import { useSearchParams } from 'react-router-dom';

// --- WE DEFINE THE MENU COMPONENT RIGHT HERE ---
// No importing means no "File Not Found" errors.
const SpaceMenuFinal = () => {
  // 1. The Data
  const items = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
  ];

  // 2. Your Background
  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  // 3. The Layout
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      {/* Background Image */}
      <img src={BG_IMAGE} className="absolute inset-0 w-full h-full object-cover z-0" alt="Background" />

      {/* LEFT BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '9.5%', width: '25%', height: '39%' }}>
        <div className="w-full h-full flex flex-col p-2">
          <img src={items[0].ImageURL} className="h-[65%] w-full object-cover rounded-sm mb-2" alt="Food" />
          <div className="text-center">
             <h3 className="text-white font-black text-2xl uppercase mb-1">{items[0].Title}</h3>
             <span className="text-3xl font-black text-yellow-400">{items[0].Price}</span>
          </div>
        </div>
      </div>

      {/* MIDDLE BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '37.5%', width: '25%', height: '39%' }}>
         <div className="w-full h-full flex flex-col p-2">
          <img src={items[1].ImageURL} className="h-[65%] w-full object-cover rounded-sm mb-2" alt="Food" />
          <div className="text-center">
             <h3 className="text-white font-black text-2xl uppercase mb-1">{items[1].Title}</h3>
             <span className="text-3xl font-black text-yellow-400">{items[1].Price}</span>
          </div>
        </div>
      </div>

      {/* RIGHT BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '65.5%', width: '25%', height: '39%' }}>
         <div className="w-full h-full flex flex-col p-2">
          <img src={items[2].ImageURL} className="h-[65%] w-full object-cover rounded-sm mb-2" alt="Food" />
          <div className="text-center">
             <h3 className="text-white font-black text-2xl uppercase mb-1">{items[2].Title}</h3>
             <span className="text-3xl font-black text-yellow-400">{items[2].Price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- THE MAIN APP ---
const AdDisplay = () => {
  // We ignore the URL ?id=... and force the Space Menu to show.
  // This proves it works.
  return <SpaceMenuFinal />;
};

export default AdDisplay;
