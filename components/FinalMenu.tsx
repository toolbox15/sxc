import React from 'react';

// ==========================================
// 1. HEADER (Varsity Style - Scaled Down)
// ==========================================
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full gap-3">
      {/* "GAME DAY" - Varsity Style */}
      <h1 className="relative text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            // Dot Texture + Gradient
            backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ffffff, #f0f0f0)",
            backgroundSize: "4px 4px, 100% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // Red Outline
            WebkitTextStroke: "2px #d60000", 
            filter: "drop-shadow(0 0 8px rgba(214, 0, 0, 0.6))"
          }}
      >
        {text}
      </h1>

      {/* "EATS & DRINKS" - Neon Blue */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 uppercase tracking-widest"
          style={{ 
            fontFamily: "'Arial', sans-serif",
            textShadow: "0 0 15px #0000FF", 
            mixBlendMode: "screen" 
          }}
      >
        {subtext}
      </h2>
    </div>
  );
};

// ==========================================
// 2. FOOD MENU (Slightly Smaller for TV Fit)
// ==========================================
const FoodMenuList = ({ items }: any) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <h3 className="text-white font-black text-3xl uppercase mb-4 tracking-wider border-b-4 border-red-600 pb-1 inline-block w-full drop-shadow-md">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-5"> 
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center w-full relative group">
            
            {/* ICON (Reduced from w-28 to w-20 to fit TV better) */}
            <div className="relative mr-4">
              <img 
                src={item.IconURL} 
                alt={item.Title} 
                className="w-20 h-20 object-cover rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10 relative" 
              />
            </div>
            
            {/* Text Container */}
            <div className="flex items-end gap-2 flex-1 mb-2">
              <span className="text-white font-bold text-2xl uppercase tracking-tight shadow-black drop-shadow-md whitespace-nowrap">
                {item.Title}
              </span>
              
              {/* WHITE DASHED LINE */}
              <div className="flex-1 border-b-4 border-dotted border-white/60 mb-2 opacity-80"></div>
              
              <span className="text-yellow-400 font-black text-3xl shadow-black drop-shadow-md whitespace-nowrap">
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
// 3. DRINK LIST (Scaled Down)
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
       <h3 className="text-white font-black text-2xl uppercase mb-4 tracking-wider border-b-4 border-red-600 pb-1 inline-block w-full drop-shadow-md">
         ICE COLD DRINKS
       </h3>
      <div className="flex flex-col gap-3 w-full">
        {drinks.map((drink, index) => (
          <div key={index} className="flex justify-between items-end w-full gap-2">
            {/* Name */}
            <span className="text-white font-bold text-lg uppercase shadow-black drop-shadow-md leading-tight whitespace-nowrap">
              {drink.name}
            </span>
            
            {/* Dashed Line */}
            <div className="flex-1 border-b-2 border-dotted border-white/40 mb-1 mx-2"></div>

            {/* Price */}
            <span className="text-yellow-400 font-black text-xl whitespace-nowrap shadow-black drop-shadow-md">
              {drink.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN LAYOUT (TV SAFE ZONE)
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
      
      {/* TV OVERSCAN FIX:
         I set the width/height to 94%. This creates a black border around the edge
         of the screen, ensuring your glowing neon border is FULLY VISIBLE and not cut off.
      */}
      <div className="relative w-[94%] h-[94%] aspect-video shadow-2xl overflow-hidden bg-black border border-gray-900">
        
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
