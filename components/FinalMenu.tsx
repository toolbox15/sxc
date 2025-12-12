import React from 'react';

// ==========================================
// 1. HEADER (Perfectly Centered & Scaled)
// ==========================================
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full gap-4">
      {/* Main Text with Pulse Animation */}
      <h1 className="relative text-6xl md:text-7xl lg:text-9xl font-black tracking-wider uppercase animate-pulse-glow"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            // A cleaner, brighter gradient for visibility
            backgroundImage: "linear-gradient(to bottom, #ffffff, #d1d5db)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // Stronger outline so it pops off the video
            WebkitTextStroke: "3px black", 
            filter: "drop-shadow(0 0 15px rgba(255,255,255,0.9))"
          }}
      >
        {text}
      </h1>

      {/* Subtext */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 uppercase tracking-widest"
          style={{ 
            textShadow: "0 0 20px #0000FF", 
            mixBlendMode: "screen" 
          }}
      >
        {subtext}
      </h2>

      <style>{`
        @keyframes pulse-white-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.7)); }
          50% { filter: drop-shadow(0 0 40px rgba(255,255,255,1)); }
        }
        .animate-pulse-glow {
          animation: pulse-white-glow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// ==========================================
// 2. FOOD MENU (Giant Icons + Dashes)
// ==========================================
const FoodMenuList = ({ items }: any) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <h3 className="text-white font-black text-4xl uppercase mb-8 tracking-wider border-b-4 border-white/20 pb-2 inline-block w-full drop-shadow-md">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-6"> {/* Increased gap for breathing room */}
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center w-full relative">
            
            {/* GIANT ICON (Increased to w-28) */}
            <div className="relative">
              <img 
                src={item.IconURL} 
                alt={item.Title} 
                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10 relative" 
              />
            </div>
            
            {/* Text Container */}
            <div className="flex items-end gap-3 flex-1 ml-4 mb-2">
              <span className="text-white font-bold text-3xl uppercase tracking-tight shadow-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
                {item.Title}
              </span>
              
              {/* THE DASHED LINE (Flex-grow fills the space) */}
              <div className="flex-1 border-b-4 border-dotted border-white/60 mb-2"></div>
              
              <span className="text-yellow-400 font-black text-4xl shadow-black drop-shadow-[0_2px_4px_rgba(0,0,0,1)] whitespace-nowrap">
                {item.Price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. DRINK LIST (Fixed Spacing & Dashes)
// ==========================================
const DrinkList = () => {
  const drinks = [
    { name: "BUD LIGHT DRAFT", price: "$5.00" },
    { name: "MODELO ESPECIAL", price: "$6.00" },
    { name: "LAGUNITAS IPA", price: "$7.50" },
    { name: "TITO'S & SODA", price: "$8.00" },
    { name: "SPICY MARGARITA", price: "$10.00" },
    { name: "GAME DAY SHOT", price: "$5.00" },
    { name: "BEER BUCKET (5)", price: "$25.00" }
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
       <h3 className="text-white font-black text-3xl uppercase mb-8 tracking-wider border-b-4 border-white/20 pb-2 inline-block w-full drop-shadow-md">
         ICE COLD DRINKS
       </h3>
      <div className="flex flex-col gap-4 w-full">
        {drinks.map((drink, index) => (
          <div key={index} className="flex justify-between items-end w-full gap-2">
             {/* Name */}
            <span className="text-white font-bold text-xl uppercase shadow-black drop-shadow-md leading-tight whitespace-nowrap">
              {drink.name}
            </span>
            
            {/* Dashed Line for drinks too */}
            <div className="flex-1 border-b-2 border-dotted border-white/30 mb-1 mx-2"></div>

            {/* Price */}
            <span className="text-yellow-400 font-black text-2xl whitespace-nowrap shadow-black drop-shadow-md">
              {drink.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN LAYOUT (Locked 16:9 Aspect Ratio)
// ==========================================
const FinalMenu = () => {
  const foodItems = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", IconURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200&h=200&fit=crop" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", IconURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&h=200&fit=crop" },
    { Title: "MVP BURGER", Price: "$16.99", IconURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
    { Title: "LOADED FRIES", Price: "$9.99", IconURL: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=200&h=200&fit=crop" },
    { Title: "PRETZEL BITES", Price: "$11.99", IconURL: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=200&h=200&fit=crop" },
  ];
  
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/1mdvf7p08f4xwo4rnp19f/bkgrd-menu.mp4?rlkey=f75w50969ivhhb7lzy8p34had&st=bc8bz5jb&raw=1"; 

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 16:9 CONTAINER */}
      <div className="relative w-full aspect-video max-h-screen shadow-2xl overflow-hidden bg-black">
        
        {/* VIDEO */}
        <video 
          src={BG_VIDEO} 
          className="absolute inset-0 w-full h-full object-fill z-0" 
          autoPlay loop muted playsInline 
        />
        
        {/* HEADER AREA */}
        <div className="absolute top-0 left-0 w-full h-[22%] flex items-center justify-center z-20 pt-[1.5%]">
           <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
        </div>

        {/* CONTENT AREA */}
        <div className="absolute inset-0 z-10">
            {/* Left Box (Food) */}
            <div style={{ position: 'absolute', top: '26%', left: '5%', width: '58%', height: '70%' }}>
              <FoodMenuList items={foodItems} />
            </div>

            {/* Right Box (Drinks) */}
            <div style={{ position: 'absolute', top: '26%', left: '68%', width: '28%', height: '70%' }}>
              <DrinkList />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
