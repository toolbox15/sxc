import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 1. PROMOTIONAL CAROUSEL (With Drink-Themed Images - No Progress Bar)
// ==========================================
const PromotionalCarousel = () => {
  const promotions = [
    { 
      title: "HAPPY HOUR", 
      subtitle: "4PM - 7PM", 
      detail: "$2 OFF ALL DRAFTS",
      // Metal bucket full of ice and beer bottles
      imageUrl: "https://images.unsplash.com/photo-1629203851126-d8c3329f3872?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      accentColor: "text-yellow-300"
    },
    { 
      title: "FEATURED COCKTAIL", 
      subtitle: "TOUCHDOWN MARGARITA", 
      detail: "WITH GRAND MARNIER",
      // Metal bucket with cocktail gear and glasses
      imageUrl: "https://images.unsplash.com/photo-1578985545060-4c5e0e0263f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      accentColor: "text-lime-300"
    },
    { 
      title: "GAME DAY SPECIAL", 
      subtitle: "BEER BUCKET", 
      detail: "5 FOR $20",
      // Frosty beer keg close-up
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e5c7c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      accentColor: "text-white"
    }
  ];
  
  const [current, setCurrent] = useState(0);
  
  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full h-[200px] overflow-hidden rounded-lg border-2 border-yellow-500/50 shadow-2xl">
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative flex flex-col items-center justify-center p-4"
        // Applied stronger vignette gradient for brighter images
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${promotions[current].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className={`text-4xl font-black uppercase tracking-widest ${promotions[current].accentColor} mb-2 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
            {promotions[current].title}
          </h3>
          <p className="text-2xl font-bold text-white mb-1 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {promotions[current].subtitle}
          </p>
          <p className="text-xl text-white/90 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {promotions[current].detail}
          </p>
        </div>
        
        {/* Progress indicator REMOVED as requested */}
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. HEADER (Varsity GAME DAY + White EATS & DRINKS + Moved Left)
// ==========================================
const VarsityHeader = ({ text, subtext }: any) => {
  return (
    // PADDING RIGHT 20% to shift the visual center to the LEFT
    <div className="flex flex-row items-baseline justify-center w-full gap-3 pr-[30%] relative top-[4%]">
      
      {/* "GAME DAY" - REDUCED SIZE BY 5% */}
      <h1 className="relative text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase"
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

      {/* "EATS & DRINKS" - REDUCED SIZE BY 5% */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-widest relative top-[2%]"
          style={{ 
            fontFamily: "'Arial', sans-serif",
            // White Glow
            textShadow: "0 0 15px rgba(255, 255, 255, 0.8)", 
            mixBlendMode: "screen" 
          }}
      >
        {subtext}
      </h2>
    </div>
  );
};

// ==========================================
// 3. FOOD MENU (TV Size) - UPDATED TEXT SIZES
// ==========================================
const FoodMenuList = ({ items }: any) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <h3 className="text-white font-black text-2xl uppercase mb-3 tracking-wider border-b-4 border-red-600 pb-1 inline-block w-full drop-shadow-md">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-5"> 
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center w-full relative group">
            
            {/* ICON (w-16) - Reduced from w-20 */}
            <div className="relative mr-4">
              <img 
                src={item.IconURL} 
                alt={item.Title} 
                className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10 relative" 
              />
            </div>
            
            {/* Text Container */}
            <div className="flex items-end gap-2 flex-1 mb-2">
              <span className="text-white font-bold text-xl uppercase tracking-tight shadow-black drop-shadow-md whitespace-nowrap">
                {item.Title}
              </span>
              
              {/* WHITE DASHED LINE */}
              <div className="flex-1 border-b-4 border-dotted border-white/60 mb-2 opacity-80"></div>
              
              <span className="text-yellow-400 font-black text-2xl shadow-black drop-shadow-md whitespace-nowrap">
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
// 4. DRINK LIST (TV Size)
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
// 5. MAIN LAYOUT (TV SAFE ZONE 94%) - UPDATED SIZES
// ==========================================
const FinalMenu = () => {
  const foodItems = [
    { Title: "VOLCANO NACHOS", Price: "$14.99", IconURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200&h=200&fit=crop" },
    { Title: "TOUCHDOWN WINGS", Price: "$12.99", IconURL: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&h=200&fit=crop" },
    { Title: "MVP BURGER", Price: "$16.99", IconURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
    { Title: "LOADED FRIES", Price: "$9.99", IconURL: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=200&h=200&fit=crop" },
    { Title: "PRETZEL BITES", Price: "$11.99", IconURL: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=200&h=200&fit=crop" },
  ];
  
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/jzf7pcmzukxfrltktaf3d/bkmenu.mp4?rlkey=esuubnyzl9stppqvwau8cxs0m&st=3ln0rquf&dl=1"; 

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* 94% CONTAINER TO FIX TV OVERSCAN */}
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
            {/* Left Box (Food) - Reduced by 20% from 58% to 46.4% */}
            <div style={{ position: 'absolute', top: '26%', left: '5%', width: '46.4%', height: '70%' }}>
              <FoodMenuList items={foodItems} />
            </div>

            {/* Promotional Carousel with Drink Images - MOVED LEFT BY 3% */}
            <div style={{ 
              position: 'absolute', 
              top: '12%', 
              left: '67.4%',  // Changed from '70.4%' to '67.4%'
              width: '28%', 
              height: '200px',
              zIndex: 30
            }}>
              <PromotionalCarousel />
            </div>

            {/* Right Box (Drinks) */}
            <div style={{ position: 'absolute', top: '45%', left: '66.4%', width: '28%', height: '46%' }}>
              <DrinkList />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
