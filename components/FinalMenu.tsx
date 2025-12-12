import React from 'react';

// ==========================================
// 1. HEADER COMPONENT
// ==========================================
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full gap-4">
      <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase animate-pulse-glow"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            backgroundImage: "linear-gradient(to right, #ff3333, #ffffff, #3366ff), radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 4px 4px",
            backgroundBlendMode: "multiply",
            mixBlendMode: "screen",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))"
          }}
      >
        {text}
      </h1>

      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-400 uppercase tracking-widest"
          style={{ 
            textShadow: "0 0 20px #0000FF, 0 0 40px #0000FF", 
            mixBlendMode: "plus-lighter" 
          }}
      >
        {subtext}
      </h2>

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

// ==========================================
// 2. NEW: FOOD MENU LIST WITH LARGER ICONS & DASHES
// ==========================================
const FoodMenuList = ({ items }: any) => {
  if (!items) return null;
  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-white font-black text-3xl uppercase mb-6 tracking-wider border-b-2 border-white pb-2 inline-block w-full">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-5">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center w-full">
            {/* Larger Icon/Picture (w-20 h-20) */}
            <img src={item.IconURL} alt={item.Title} className="w-20 h-20 object-cover rounded-full mr-4 border-2 border-white/20 shadow-lg" />
            
            {/* Title, Dashes, and Price container */}
            <div className="flex items-end gap-2 flex-1">
              <span className="text-white font-bold text-2xl uppercase tracking-tight shadow-black drop-shadow-md whitespace-nowrap">{item.Title}</span>
              {/* White dashed line filling the space */}
              <div className="flex-1 border-b-2 border-dashed border-white/50 mb-2"></div>
              <span className="text-yellow-400 font-black text-3xl shadow-black drop-shadow-md whitespace-nowrap">{item.Price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. UPDATED: DRINK LIST
// ==========================================
const DrinkList = () => {
  const drinks = [
    { name: "BUD LIGHT DRAFT", price: "$5.00" },
    { name: "MODELO ESPECIAL", price: "$6.00" },
    { name: "LAGUNITAS IPA", price: "$7.50" },
    { name: "TITO'S & SODA", price: "$8.00" },
    { name: "SPICY MARGARITA", price: "$10.00" },
    { name: "GAME DAY SHOT", price: "$5.00" },
    { name: "BUCKET OF BEERS (5)", price: "$25.00" }
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
       <h3 className="text-white font-black text-3xl uppercase mb-6 tracking-wider border-b-2 border-white pb-2 inline-block w-full">
         ICE COLD DRINKS
       </h3>
      <div className="flex flex-col gap-3 w-full">
        {drinks.map((drink, index) => (
          // Use items-start to align top of multi-line names with price
          <div key={index} className="flex justify-between items-start w-full border-b border-white/20 pb-2 gap-2">
             {/* Allow name to wrap, slightly smaller font */}
            <span className="text-white font-bold text-xl uppercase flex-1 break-words shadow-black drop-shadow-md leading-tight">{drink.name}</span>
            {/* Prevent price from wrapping, slightly smaller font */}
            <span className="text-yellow-400 font-black text-2xl whitespace-nowrap shadow-black drop-shadow-md">{drink.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN LAYOUT (ASPECT RATIO LOCKED)
// ==========================================
const FinalMenu = () => {
  // Hardcoded Food Data with small icon URLs
  const foodItems = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", IconURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=100&h=100&fit=crop" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", IconURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=100&h=100&fit=crop" },
    { Title: "MVP DOUBLE BURGER", Price: "$16.99", IconURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop" },
    { Title: "LOADED FRIES", Price: "$9.99", IconURL: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=100&h=100&fit=crop" },
    { Title: "PRETZEL BITES", Price: "$11.99", IconURL: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=100&h=100&fit=crop" },
  ];
  
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/1mdvf7p08f4xwo4rnp19f/bkgrd-menu.mp4?rlkey=f75w50969ivhhb7lzy8p34had&st=bc8bz5jb&raw=1"; 

  return (
    // OUTER CONTAINER: Black background that centers the menu
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* 16:9 LOCK CONTAINER */}
      <div className="relative w-full aspect-video max-h-screen shadow-2xl overflow-hidden bg-black">
        
        {/* VIDEO BACKGROUND */}
        <video 
          src={BG_VIDEO} 
          className="absolute inset-0 w-full h-full object-fill z-0" 
          autoPlay loop muted playsInline 
        />
        
        {/* HEADER CONTAINER */}
        <div className="absolute top-0 left-0 w-full h-[22%] flex items-center justify-center z-20 pt-[1.5%]">
           <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="absolute inset-0 z-10">
            
            {/* FOOD LIST (Left Side) */}
            <div style={{ position: 'absolute', top: '26%', left: '5%', width: '58%', height: '70%' }}>
              <FoodMenuList items={foodItems} />
            </div>

            {/* DRINK LIST (Right Side) */}
            <div style={{ position: 'absolute', top: '26%', left: '66%', width: '28%', height: '70%' }}>
              <DrinkList />
            </div>

        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
