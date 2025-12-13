import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 1. PROMOTIONAL CAROUSEL
// ==========================================
const PromotionalCarousel = () => {
  const promotions = [
    { 
      title: "HAPPY HOUR", 
      subtitle: "HALF PRICE APPS", 
      detail: "MON-FRI 4-6PM",
      // Changed image to a bar setting for Mike's
      imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      accentColor: "text-yellow-300"
    },
    { 
      title: "BURGER NIGHT",
      subtitle: "EVERY TUESDAY", 
      detail: "$10 BURGER & BREW",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      accentColor: "text-lime-300"
    },
    { 
      title: "MIKE'S PICK", 
      subtitle: "CRAFT IPA", 
      detail: "TRY SOMETHING NEW",
      imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      accentColor: "text-white"
    }
  ];
   
  const [current, setCurrent] = useState(0);
   
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
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${promotions[current].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
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
      
      {/* "MIKE'S BAR" */}
      <h1 className="relative text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ffffff, #f0f0f0)",
            backgroundSize: "4px 4px, 100% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px #004aad", // Changed outline to Blue for Mike's
            filter: "drop-shadow(0 0 8px rgba(0, 74, 173, 0.6))"
          }}
      >
        {text}
      </h1>

      {/* "NEIGHBORHOOD PUB" */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-widest relative top-[2%]"
          style={{ 
            fontFamily: "'Arial', sans-serif",
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
// 3. FOOD MENU
// ==========================================
const FoodMenuList = ({ items }) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      {/* Title Changed for Mike's */}
      <h3 className="text-white font-black text-2xl uppercase mb-3 tracking-wider border-b-4 border-blue-600 pb-1 inline-block w-full drop-shadow-md">
        MIKE'S KITCHEN
      </h3>
      <div className="flex flex-col gap-5"> 
        {items.map((item, index) => (
          <div key={index} className="flex items-center w-full relative group">
            
            <div className="relative mr-4">
              <img 
                src={item.IconURL} 
                alt={item.Title} 
                className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10 relative" 
              />
            </div>
            
            <div className="flex items-end gap-2 flex-1 mb-2">
              <span 
                className="text-white font-bold uppercase tracking-tight shadow-black drop-shadow-md whitespace-nowrap"
                style={{ fontSize: '26px' }}
              >
                {item.Title}
              </span>
              
              <div className="flex-1 border-b-4 border-dotted border-white/60 mb-2 opacity-80"></div>
              
              <span 
                className="text-yellow-400 font-black shadow-black drop-shadow-md whitespace-nowrap"
                style={{ fontSize: '32px' }}
              >
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
// 4. DRINK LIST
// ==========================================
const DrinkList = () => {
  const drinks = [
    { name: "MIKE'S LAGER", price: "$4.00" }, // Custom beer
    { name: "GUINNESS", price: "$7.00" },
    { name: "STELLA ARTOIS", price: "$6.50" },
    { name: "OLD FASHIONED", price: "$12.00" },
    { name: "HOUSE WINE", price: "$8.00" },
    { name: "IRISH CAR BOMB", price: "$9.00" },
    { name: "PITCHER SPECIAL", price: "$18.00" }
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
       {/* Title Changed for Mike's */}
       <h3 className="text-white font-black text-2xl uppercase mb-4 tracking-wider border-b-4 border-blue-600 pb-1 inline-block w-full drop-shadow-md">
         COLD ON TAP
       </h3>
      <div className="flex flex-col gap-3 w-full">
        {drinks.map((drink, index) => (
          <div key={index} className="flex justify-between items-end w-full gap-2">
            <span className="text-white font-bold text-lg uppercase shadow-black drop-shadow-md leading-tight whitespace-nowrap">
              {drink.name}
            </span>
            <div className="flex-1 border-b-2 border-dotted border-white/40 mb-1 mx-2"></div>
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
// 5. MAIN LAYOUT
// ==========================================
const FinalMenu = () => {
  const foodItems = [
    { Title: "BBQ RIB BASKET", Price: "$18.99", IconURL: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop" },
    { Title: "FISH & CHIPS", Price: "$15.99", IconURL: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=200&h=200&fit=crop" },
    { Title: "CLASSIC SMASH", Price: "$14.99", IconURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
    { Title: "ONION RINGS", Price: "$8.99", IconURL: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&h=200&fit=crop" },
    { Title: "CHICKEN STRIPS", Price: "$12.99", IconURL: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop" },
  ];
   
  // Keeping the video consistent for now, but you can change this URL later
  const BG_VIDEO = "https://www.dropbox.com/scl/fi/jzf7pcmzukxfrltktaf3d/bkmenu.mp4?rlkey=esuubnyzl9stppqvwau8cxs0m&st=3ln0rquf&dl=1"; 

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-[94%] h-[94%] aspect-video shadow-2xl overflow-hidden bg-black border border-gray-900">
        
        <video 
          src={BG_VIDEO} 
          className="absolute inset-0 w-full h-full object-fill z-0" 
          autoPlay loop muted playsInline 
        />
        
        <div className="absolute top-0 left-0 w-full h-[22%] flex items-center justify-center z-20 pt-[1.5%]">
           {/* HEADER TEXT CHANGED HERE */}
           <VarsityHeader text="MIKE'S BAR" subtext="NEIGHBORHOOD PUB" />
        </div>

        <div className="absolute inset-0 z-10">
            <div style={{ position: 'absolute', top: '26%', left: '5%', width: '46.4%', height: '70%' }}>
              <FoodMenuList items={foodItems} />
            </div>

            <div style={{ 
              position: 'absolute', 
              top: '12%', 
              left: '66.9%',
              width: '28%', 
              height: '200px',
              zIndex: 30
            }}>
              <PromotionalCarousel />
            </div>

            <div style={{ position: 'absolute', top: '45%', left: '66.4%', width: '28%', height: '46%' }}>
              <DrinkList />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinalMenu;
