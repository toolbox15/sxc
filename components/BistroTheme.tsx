import React from 'react';
import { motion } from 'framer-motion';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string; // 'Appetizers', 'Entrees', 'Desserts', 'Drinks'
  Color?: string;
}

// --- ANIMATION SETTINGS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

// --- STEAM/SMOKE COMPONENT (New!) ---
const SteamEffect = () => {
  // Create 20 "puffs" of smoke
  const puffs = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {puffs.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full blur-3xl" // blur-3xl makes it look like smoke
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 100 // Start below screen
          }}
          animate={{ 
            opacity: [0, 0.3, 0], // Fade in then out
            scale: [1, 2, 3], // Grow larger
            y: -200, // Float up
            x: (Math.random() * window.innerWidth) + (Math.random() * 200 - 100) // Drift side to side
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, // Slow rise
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          style={{
            width: Math.random() * 200 + 100, // Random puff size
            height: Math.random() * 200 + 100,
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
const BistroTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  // FILTERING THE MENU
  const appetizers = ads.filter(ad => ad.Category === 'Appetizers');
  const entrees = ads.filter(ad => ad.Category === 'Entrees');
  const drinks = ads.filter(ad => ad.Category === 'Drinks');

  return (
    <div 
      className="w-full h-screen relative overflow-hidden bg-cover bg-center text-amber-50 font-serif"
      style={{ backgroundImage: "url('/bistro-bg.png')" }} 
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* 💨 THE STEAM ENGINE (Added Here) */}
      <SteamEffect />

      {/* --- THE LAYOUT GRID --- */}
      <div className="relative z-10 w-full h-full grid grid-cols-12 gap-8 p-16">
        
        {/* LEFT ZONE (Appetizers) */}
        <div className="col-span-4 pt-40 px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {appetizers.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="border-b border-amber-500/30 pb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-3xl font-bold text-amber-100" style={{ color: item.Color }}>{item.Title}</h3>
                  <span className="text-3xl text-amber-400">{item.Price}</span>
                </div>
                {item.Description && <p className="text-xl text-amber-200/70 italic mt-1">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CENTER ZONE (Entrees) */}
        <div className="col-span-4 pt-32 px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {entrees.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="border-b border-amber-500/30 pb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-4xl font-bold text-white" style={{ color: item.Color }}>{item.Title}</h3>
                  <span className="text-4xl text-amber-400">{item.Price}</span>
                </div>
                {item.Description && <p className="text-xl text-amber-200/70 italic mt-1">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ZONE (Drinks/Dessert) */}
        <div className="col-span-4 pt-40 px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {drinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="border-b border-amber-500/30 pb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-3xl font-bold text-amber-100" style={{ color: item.Color }}>{item.Title}</h3>
                  <span className="text-3xl text-amber-400">{item.Price}</span>
                </div>
                {item.Description && <p className="text-xl text-amber-200/70 italic mt-1">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default BistroTheme;
