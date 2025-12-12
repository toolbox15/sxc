import React from 'react';

// ==========================================
// 1. THE HEADER (Centered & Scaled)
// ==========================================
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full gap-4">
      {/* "GAME DAY" */}
      <h1 className="relative text-6xl md:text-8xl font-black tracking-wider uppercase animate-pulse-glow"
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

      {/* "EATS & DRINKS" */}
      <h2 className="text-4xl md:text-5xl font-bold text-blue-400 uppercase tracking-widest"
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
// 2. FOOD LIST (White Text)
// ==========================================
const FoodMenuList = ({ items }: any) => {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-white font-black text-3xl uppercase mb-4 tracking-wider border-b-2 border-red-600 pb-2 inline-block w-full">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-4">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center w-full border-b border-white/10 pb-2">
            <span className="text-white font-bold text-2xl uppercase tracking-tight shadow-black drop-shadow-md">{item.Title}</span>
            <span className="text-yellow-400 font-black text-3xl shadow-black drop-shadow-md">{item.Price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. DRINK LIST (White Text)
// ==========================================
const DrinkList = () => {
  const drinks = [
    { name: "BUD LIGHT DRAFT", price: "$5.00" },
    { name: "MODELO ESPECIAL", price: "$6.00" },
    { name: "LAGUNITAS IPA", price: "$7.50" },
    { name: "TITO'S & SODA", price: "$8.00" },
    { name: "SPICY MARGARITA", price: "$10.00" },
    { name: "GAME DAY SHOT", price: "$5.00" },
    { name: "BUCKET OF BEERS", price: "$25.00" }
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
       <h3 className="text-white font-black text-3xl uppercase mb-4 tracking-wider border-b-2 border-red-600 pb-2 inline-block w-full">
         ICE COLD DRINKS
       </h3>
      <div className="flex flex-col gap-4 w-full">
        {drinks.map((drink, index) => (
          <div key={index} className="flex justify-between items-center w-full border-b border-white/20 pb-2">
            <span className="text-white font-bold text-xl uppercase mr-2 shadow-black drop-shadow-md">{drink.name}</span>
            <span className="text-yellow-400 font-black text-2xl shadow-black drop-shadow-md">{drink.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN LAYOUT (16:9 Precision)
// ==========================================
const FinalMenu = () => {
  const foodItems = [
    { Title: "VOLCANO NACHOS", Price: "$14.99" },
    { Title: "TOUCHDOWN WINGS (12)", Price: "$12.99" },
    { Title: "MVP DOUBLE BURGER", Price: "$16.99" },
    { Title: "LOADED FRIES", Price: "$9.99" },
    { Title: "PRETZEL BITES & QUESO", Price: "$11.99" },
  ];
  
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/1mdvf7p08f4xwo4rnp19f/bkgrd-menu.mp4?rlkey=f75w50969ivhhb7lzy8p34had&st=bc8bz5jb&raw=1"; 

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* VIDEO BACKGROUND */}
      <video 
        src={BG_VIDEO} 
        className="absolute inset-0 w-full h-full object-fill z-0" 
        autoPlay loop muted playsInline 
      />
      
      {/* HEADER CONTAINER - Centered in the top 22% of the screen */}
      <div className="absolute top-0 left-0 w-full h-[22%] flex items-center justify-center z-20 pt-[1%]">
         <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="absolute inset-0 z-10">
          
          {/* FOOD LIST (Left Side) 
              Aligned to fill the space below the header and to the left of the drink box 
          */}
          <div style={{ position: 'absolute', top: '25%', left: '5%', width: '58%', height: '70%' }}>
            <FoodMenuList items={foodItems} />
          </div>

          {/* DRINK LIST (Right Side)
              Aligned to fit inside the tall Golden Box on the right 
          */}
          <div style={{ position: 'absolute', top: '25%', left: '66%', width: '28%', height: '70%' }}>
            <DrinkList />
          </div>

      </div>
    </div>
  );
};

export default FinalMenu;
