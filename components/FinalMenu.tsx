import React from 'react';

// ==========================================
// 1. THE "VARSITY" HEADER (Red Outline & Texture)
// ==========================================
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full gap-4">
      {/* "GAME DAY" - Varsity Style (White with Red Border) */}
      <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            // This creates the "Dot Pattern" inside the white text
            backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ffffff, #f0f0f0)",
            backgroundSize: "4px 4px, 100% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // THE RED OUTLINE
            WebkitTextStroke: "3px #d60000", 
            // The Glow
            filter: "drop-shadow(0 0 10px rgba(214, 0, 0, 0.6))"
          }}
      >
        {text}
      </h1>

      {/* "EATS & DRINKS" - Blue Neon Style */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 uppercase tracking-widest"
          style={{ 
            fontFamily: "'Arial', sans-serif",
            textShadow: "0 0 15px #0000FF, 0 0 30px #0000FF", 
            // Using 'screen' blending to make it look like light
            mixBlendMode: "screen" 
          }}
      >
        {subtext}
      </h2>
    </div>
  );
};

// ==========================================
// 2. FOOD MENU (Giant Icons + White Dashes)
// ==========================================
const FoodMenuList = ({ items }: any) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <h3 className="text-white font-black text-4xl uppercase mb-8 tracking-wider border-b-4 border-red-600 pb-2 inline-block w-full drop-shadow-md">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-6"> 
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center w-full relative group">
            
            {/* GIANT ICON (Size: w-28 h-28) */}
            <div className="relative mr-5">
              <img 
                src={item.IconURL} 
                alt={item.Title} 
                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10 relative" 
              />
            </div>
            
            {/* Text Container */}
            <div className="flex items-end gap-3 flex-1 mb-4">
              <span className="text-white font-bold text-3xl uppercase tracking-tight shadow-black drop-shadow-md whitespace-nowrap">
                {item.Title}
              </span>
              
              {/* THE WHITE DASHED LINE */}
              <div className="flex-1 border-b-4 border-dotted border-white/60 mb-2 opacity-80"></div>
              
              <span className="text-yellow-400 font-black text-4xl shadow-black drop-shadow-md whitespace-nowrap">
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
// 3. DRINK LIST (Aligned & Dashed)
// ==========================================
const DrinkList = () => {
  const drinks = [
    { name: "BUD LIGHT DRAFT", price: "$5.00" },
    { name: "MODELO ESPECIAL", price: "$6.00" },
    { name: "LAGUNITAS IPA", price: "$7.50"
