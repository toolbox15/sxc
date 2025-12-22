import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 1. PROMOTIONAL CAROUSEL
// ==========================================
const PromotionalCarousel = () => {
  const promotions = [
    { 
      title: "BOWL SPECIAL", 
      subtitle: "BUFFALO CHICKEN BOWL", 
      imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      accentColor: "text-yellow-300"
    },
    { 
      title: "6-PACK DEAL",
      subtitle: "TAKE HOME & SAVE", 
      imageUrl: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&w=800&q=80",
      accentColor: "text-lime-300"
    }
  ];
   
  const [current, setCurrent] = useState(0);
   
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promotions.length]);
   
  return (
    <div className="w-full h-[200px] overflow-hidden rounded-xl border-2 border-yellow-500/50 shadow-2xl relative">
      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full relative flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${promotions[current].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 text-center">
          <h3 className={`text-3xl font-black uppercase tracking-widest ${promotions[current].accentColor} drop-shadow-lg`}>
            {promotions[current].title}
          </h3>
          <p className="text-xl font-bold text-white drop-shadow-md">
            {promotions[current].subtitle}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. HEADER
// ==========================================
const VarsityHeader = ({ text, subtext }) => {
  return (
    <div className="flex flex-row items-baseline justify-center w-full gap-3 pr-[30%] relative top-[4%]">
      <h1 className="relative text-5xl md:text-7xl font-black tracking-tighter uppercase"
          style={{
            fontFamily: "'Impact', sans-serif",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px #d60000", 
            filter: "drop-shadow(0 0 12px rgba(214, 0, 0, 0.5))"
          }}
      >
        {text}
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest opacity-90">
        {subtext}
      </h2>
    </div>
  );
};

// ==========================================
// 3. DYNAMIC FOOD LIST (Clipped Ellipse Version)
// ==========================================
const FoodMenuList = ({ items }) => {
  // Placeholder image if Google Sheet cell is empty
  const placeholder = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop";

  return (
    <div className="w-full h-full flex flex-col p-2">
      <h3 className="text-white font-black text-3xl uppercase mb-6 tracking-wider border-b-4 border-red-600 pb-2 drop-shadow-lg">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-6"> 
        {items.map((item, index) => (
          <div key={index} className="flex items-center w-full group">
            
            {/* ELLIPSE CLIPPED ICON */}
            <div className="relative mr-6 shrink-0">
              <div className="w-24 h-20 overflow-hidden shadow-2xl border-2 border-white/80"
                   style={{ borderRadius: '50% / 50%' }}> {/* This creates the Ellipse shape */}
                <img 
                  src={item.ImageURL || placeholder} 
                  alt={item.Title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* TEXT & PRICE CONTAINER */}
            <div className="flex items-end gap-3 flex-1 mb-2">
              <span className="text-white font-black uppercase italic drop-shadow-md whitespace-nowrap" 
                    style={{ fontSize: '28px', letterSpacing: '-1px' }}>
                {item.Title}
              </span>
              
              {/* Dotted Connector */}
              <div className="flex-1 border-b-4 border-dotted border-white/40 mb-2"></div>
              
              <span className="text-yellow-400 font-black drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" 
                    style={{ fontSize: '34px' }}>
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
// 4. MAIN LAYOUT
// ==========================================
const FinalMenu = ({ items }) => {
  // Filter for Active items and ensure we only show items meant for this screen
  const activeItems = items.filter(item => item.Status === 'Active');
   
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/jzf7pcmzukxfrltktaf3d/bkmenu.mp4?rlkey=esuubnyzl9stppqvwau8cxs0m&st=3ln0rquf&dl=1"; 

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-[94%] h-[94%] aspect-video shadow-2xl overflow-hidden bg-black border border-gray-900">
        
        {/* BACKGROUND VIDEO */}
        <video src={BG_VIDEO} className="absolute inset-0 w-full h-full object-fill z-0" autoPlay loop muted playsInline />
        
        {/* OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 bg-black/20 z-1" />

        {/* HEADER */}
        <div className="absolute top-0 left-0 w-full h-[22%] flex items-center justify-center z-20 pt-[1.5%]">
           <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
        </div>

        {/* CONTENT */}
        <div className="absolute inset-0 z-10">
            {/* Menu Items Area */}
            <div style={{ position: 'absolute', top: '26%', left: '5%', width: '55%', height: '70%' }}>
              <FoodMenuList items={activeItems} />
            </div>

            {/* Side Promo Area */}
            <div style={{ position: 'absolute', top: '15%', right: '5%', width: '28%', zIndex: 30 }}>
              <PromotionalCarousel />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
