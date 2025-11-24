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

// --- MAIN COMPONENT ---
const BistroTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  // FILTERING THE MENU
  // Make sure these match your Google Sheet "Category" column exactly!
  const appetizers = ads.filter(ad => ad.Category === 'Appetizers');
  const entrees = ads.filter(ad => ad.Category === 'Entrees');
  const drinks = ads.filter(ad => ad.Category === 'Drinks');

  return (
    <div 
      className="w-full h-full relative overflow-hidden bg-cover bg-center text-amber-50 font-serif"
      style={{ backgroundImage: "url('/bistro-bg.png')" }} 
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* --- THE LAYOUT GRID --- */}
      {/* We use a 3-column grid. You may need to adjust 'pt' (Padding Top) to match your image holes. */}
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
