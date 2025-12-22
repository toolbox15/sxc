import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 1. PROMOTIONAL CAROUSEL (Kept your original design)
// ==========================================
const PromotionalCarousel = () => {
  const promotions = [
    { 
      title: "BOWL SPECIAL", 
      subtitle: "BUFFALO CHICKEN BOWL", 
      detail: "HEARTY & FLAVORFUL",
      imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      accentColor: "text-yellow-300"
    },
    { 
      title: "6-PACK DEAL",
      subtitle: "TAKE HOME", 
      detail: "SAVE $5",
      imageUrl: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
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
    <div className="w-full h-[200px] overflow-hidden rounded-lg border-2 border-yellow-500/50 shadow-2xl">
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full relative flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${promotions[current].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 text-center">
          <h3 className={`text-4xl font-black uppercase tracking-widest ${promotions[current].accentColor} mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
            {promotions[current].title}
          </h3>
          <p className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
      <h1 className="relative text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px #d60000", 
            filter: "drop-shadow(0 0 8px rgba(214, 0, 0, 0.6))"
          }}
      >
        {text}
      </h1>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-widest">
        {subtext}
      </h2>
    </div>
  );
};

// ==========================================
// 3. DYNAMIC FOOD LIST
// ==========================================
const FoodMenuList = ({ items }) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <h3 className="text-white font-black text-2xl uppercase mb-3 tracking-wider border-b-4 border-red-600 pb-1">
        GAME DAY BITES
      </h3>
      <div className="flex flex-col gap-5"> 
        {items.map((item, index) => (
          <div key={index} className="flex items-center w-full relative">
            <div className="relative mr-4">
              <img 
                src={item.ImageURL || "https://via.placeholder.com/150"} 
                alt={item.Title} 
                className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-lg" 
              />
            </div>
            <div className="flex items-end gap-2 flex-1 mb-2">
              <span className="text-white font-bold uppercase" style={{ fontSize: '26px' }}>
                {item.Title}
              </span>
              <div className="flex-1 border-b-4 border-dotted border-white/60 mb-2"></div>
              <span className="text-yellow-400 font-black" style={{ fontSize: '32px' }}>
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
const FinalMenu = ({ items }) => { // Receiving 'items' from App.tsx
  // This filters the main list to only show things you haven't marked as "Inactive"
  const activeItems = items.filter(item => item.Status === 'Active');
   
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/jzf7pcmzukxfrltktaf3d/bkmenu.mp4?rlkey=esuubnyzl9stppqvwau8cxs0m&st=3ln0rquf&dl=1"; 

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-[94%] h-[94%] aspect-video shadow-2xl overflow-hidden bg-black border border-gray-900">
        <video src={BG_VIDEO} className="absolute inset-0 w-full h-full object-fill z-0" autoPlay loop muted playsInline />
        
        <div className="absolute top-0 left-0 w-full h-[22%] flex items-center justify-center z-20 pt-[1.5%]">
           <VarsityHeader text="GAME DAY" subtext="EATS & DRINKS" />
        </div>

        <div className="absolute inset-0 z-10">
            {/* Left Box (Now uses your real data!) */}
            <div style={{ position: 'absolute', top: '26%', left: '5%', width: '46.4%', height: '70%' }}>
              <FoodMenuList items={activeItems} />
            </div>

            <div style={{ position: 'absolute', top: '12%', left: '66.9%', width: '28%', height: '200px', zIndex: 30 }}>
              <PromotionalCarousel />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
