import React from 'react';
import { motion } from 'framer-motion';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Color?: string;
}

// --- PLACEHOLDER DATA ---
const DUMMY_MENU = {
  kickoff: [
    { Title: "Ditka Dogs", Price: "$8", Description: "Chicago style, poppy seed bun, neon green relish, sport peppers", Category: "Kickoff" },
    { Title: "Soldier Field Nachos", Price: "$14", Description: "Tortilla chips, chili, beer cheese, jalapeños, sour cream", Category: "Kickoff" },
    { Title: "Midway Wings", Price: "$16", Description: "1lb jumbo wings, buffalo or bbq, ranch dip", Category: "Kickoff" },
    { Title: "Beer Battered Curds", Price: "$10", Description: "Wisconsin cheddar, marinara sauce", Category: "Kickoff" }
  ],
  main_event: [
    { Title: "The Quarterback Burger", Price: "$18", Description: "Double patty, bacon, cheddar, onion strings, bbq sauce", Category: "Main Event" },
    { Title: "Italian Beef", Price: "$15", Description: "Thinly sliced roast beef, giardiniera, dipped or dry", Category: "Main Event" },
    { Title: "Deep Dish Pizza", Price: "$24", Description: "Sausage & Pepperoni, allowance of 25 mins", Category: "Main Event" },
    { Title: "Gridiron Steak Sandwich", Price: "$20", Description: "Ribeye, provolone, grilled onions, garlic bread", Category: "Main Event" }
  ],
  draft_picks: [
    { Title: "Bear Down Lager", Price: "$7", Description: "Local Pilsner, 16oz", Category: "Draft Picks" },
    { Title: "Miller Lite Pitcher", Price: "$18", Description: "For the table", Category: "Draft Picks" },
    { Title: "Orange & Blue Shot", Price: "$8", Description: "Vodka, Blue Curacao, Orange Juice", Category: "Draft Picks" },
    { Title: "Hail Mary Bloody", Price: "$12", Description: "Spicy mix, celery, salami, cheese cube", Category: "Draft Picks" }
  ]
};

// --- ANIMATION SETTINGS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } }
};

// --- STADIUM FLASH EFFECT ---
const StadiumFlashEffect = () => {
  const flashes = Array.from({ length: 15 });
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flashes.map((_, i) => {
        const startX = random(0, window.innerWidth);
        const startY = random(0, window.innerHeight / 2);
        
        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full blur-xl"
            style={{ width: random(10, 40), height: random(10, 40), top: startY, left: startX }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: random(1, 8), delay: random(0, 5) }}
          />
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
const BearsTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  const kickoff = ads.filter(ad => ad.Category === 'Kickoff').length > 0 ? ads.filter(ad => ad.Category === 'Kickoff') : DUMMY_MENU.kickoff;
  const mains = ads.filter(ad => ad.Category === 'Main Event').length > 0 ? ads.filter(ad => ad.Category === 'Main Event') : DUMMY_MENU.main_event;
  const drinks = ads.filter(ad => ad.Category === 'Draft Picks').length > 0 ? ads.filter(ad => ad.Category === 'Draft Picks') : DUMMY_MENU.draft_picks;

  return (
    <div 
      className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/field-bg.png')" }} 
    >
      {/* Navy Blue Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/50 to-blue-950/90 z-0"></div>

      {/* Flash Effect */}
      <StadiumFlashEffect />

      {/* --- DECORATIVE ASSETS --- */}
      
      {/* 🍺 THE KEG (Bottom Left) - USING WEB LINK TO FORCE IT TO SHOW */}
      <motion.img 
        src="https://pngimg.com/d/beer_keg_PNG12.png" 
        alt="Beer Keg" 
        className="absolute bottom-[-20px] left-[-50px] h-[500px] w-auto z-10 drop-shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* 🏈 THE FOOTBALL (Bottom Right) - Moved down slightly */}
      <motion.img 
        src="/football.png" 
        className="absolute bottom-[-20px] right-[50px] h-[350px] w-auto z-10 drop-shadow-2xl"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0], opacity: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- CONTENT GRID --- */}
      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
        
        {/* HEADER */}
        <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-white italic drop-shadow-lg">
            Game Day <span className="text-orange-500">Specials</span>
          </h1>
        </div>

        {/* LEFT COLUMN (Kickoff) */}
        <div className="col-span-4 pl-32 pt-4">
          <div className="bg-orange-600/20 border-l-4 border-orange-500 p-4 mb-6 rounded-r-lg">
            <h2 className="text-4xl font-black text-white uppercase italic">Kickoff</h2>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {kickoff.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600 pb-2">
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-white uppercase">{item.Title}</h3>
                  <span className="text-3xl font-black text-orange-500">{item.Price}</span>
                </div>
                {item.Description && <p className="text-slate-300 text-sm font-bold">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CENTER COLUMN (Main Event) */}
        <div className="col-span-4 pt-4 px-4">
          <div className="bg-white/10 border-l-4 border-white p-4 mb-6 rounded-r-lg">
            <h2 className="text-4xl font-black text-white uppercase italic">The Main Event</h2>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {mains.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600 pb-2">
                <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-bold text-white uppercase">{item.Title}</h3>
                  <span className="text-4xl font-black text-orange-500">{item.Price}</span>
                </div>
                {item.Description && <p className="text-slate-300 text-lg font-bold">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Draft Picks) - FIXED LAYOUT */}
        {/* Removed 'flex-row-reverse' so numbers go to the right */}
        <div className="col-span-4 pr-40 pt-4">
          <div className="bg-orange-600/20 border-r-4 border-orange-500 p-4 mb-6 rounded-l-lg text-right">
            <h2 className="text-4xl font-black text-white uppercase italic">Draft Picks</h2>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {drinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600 pb-2">
                {/* Title Left, Price Right (Standard) */}
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-white uppercase">{item.Title}</h3>
                  <span className="text-3xl font-black text-orange-500">{item.Price}</span>
                </div>
                {item.Description && <p className="text-slate-300 text-sm font-bold text-right">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default BearsTheme;
