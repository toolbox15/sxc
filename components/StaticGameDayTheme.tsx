import React from 'react';

// --- SIMPLE FOOD CARD COMPONENT ---
const StaticFoodCard = ({ item }: any) => {
  if (!item) return null;
  return (
    <div className="w-full h-full flex flex-col p-2">
      
      {/* 1. Food Image */}
      <div className="h-[65%] w-full relative overflow-hidden mb-2 rounded-sm shadow-lg">
        <img 
          src={item.ImageURL || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
          className="w-full h-full object-cover"
          alt={item.Title} 
        />
      </div>

      {/* 2. Text Info */}
      <div className="flex-1 flex flex-col items-center justify-start text-center leading-none">
        <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter mb-1 font-sans">
            {item.Title}
        </h3>
        <span className="text-2xl md:text-3xl font-black text-yellow-400 drop-shadow-md">
            {item.Price}
        </span>
      </div>
    </div>
  );
};

const StaticGameDayTheme = ({ ads }: any) => {
  // 1. FILTER YOUR DATA
  const mainItems = ads.filter((ad:any) => ad.Category === 'Main');

  // 2. FALLBACK DATA (In case the sheet is empty)
  const foods = mainItems.length > 0 ? mainItems : [
    { Title: "VOLCANO NACHOS", Price: "$14.99", ImageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", ImageURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" },
    { Title: "MVP BURGER", Price: "$16.99", ImageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" }
  ];

  // 3. YOUR DROPBOX LINK (With raw=1 to make it work)
  const BG_IMAGE = "https://www.dropbox.com/scl/fi/b78mrroli2c27sn2sz83y/gameday-bg.jpg?rlkey=hshroxnwsw2yea5ayds77mz3j&st=m3wtcx3r&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* BACKGROUND IMAGE */}
      <img 
        src={BG_IMAGE} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        alt="Background" 
      />

      {/* CONTENT OVERLAY */}
      {/* These percentages position the food EXACTLY inside your white boxes */}
      
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
