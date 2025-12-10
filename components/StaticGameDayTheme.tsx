import React from 'react';

// --- SIMPLE FOOD CARD (No Animation) ---
const StaticFoodCard = ({ item }: any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-2">
      
      {/* 1. Food Image */}
      <div className="h-[65%] w-full relative overflow-hidden mb-2 rounded-sm">
        <img 
          src={item.ImageURL || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
          className="w-full h-full object-cover"
          alt={item.Title} 
        />
      </div>

      {/* 2. Text Info */}
      <div className="flex-1 flex flex-col items-center justify-start text-center">
        <h3 className="text-white font-bold text-xl md:text-2xl uppercase leading-none mb-1 font-sans">
            {item.Title}
        </h3>
        <span className="text-2xl md:text-3xl font-bold text-yellow-400">
            {item.Price}
        </span>
      </div>
    </div>
  );
};

const StaticGameDayTheme = ({ ads }: any) => {
  // Filter Data
  const mainItems = ads.filter((ad:any) => ad.Category === 'Main');

  // Fallback Data (If Google Sheet is empty)
  const foods = mainItems.length > 0 ? mainItems : [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" }
  ];

  // YOUR DROPBOX BACKGROUND LINK
  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* 1. THE BACKGROUND IMAGE (Static) */}
      <img 
        src={BG_IMAGE} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        alt="Background" 
      />

      {/* 2. THE CONTENT OVERLAY */}
      {/* We use exact percentages to place items inside the white boxes of your image */}
      
      {/* LEFT BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '9.5%', width: '25%', height: '39%' }}>
        <StaticFoodCard item={foods[0]} />
      </div>

      {/* MIDDLE BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '37.5%', width: '25%', height: '39%' }}>
        <StaticFoodCard item={foods[1] || foods[0]} />
      </div>

      {/* RIGHT BOX */}
      <div style={{ position: 'absolute', top: '26%', left: '65.5%', width: '25%', height: '39%' }}>
        <StaticFoodCard item={foods[2] || foods[0]} />
      </div>

    </div>
  );
};

export default StaticGameDayTheme;
