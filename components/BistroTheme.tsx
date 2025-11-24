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
  appetizers: [
    { Title: "Truffle Fries", Price: "$12", Description: "Hand-cut, truffle oil, parmesan", Category: "Appetizers" },
    { Title: "Escargot", Price: "$16", Description: "Garlic herb butter, baguette", Category: "Appetizers" },
    { Title: "Beef Carpaccio", Price: "$18", Description: "Raw beef, capers, arugula", Category: "Appetizers" },
    { Title: "Onion Soup", Price: "$10", Description: "Caramelized onions, gruyère", Category: "Appetizers" }
  ],
  entrees: [
    { Title: "Steak Frites", Price: "$34", Description: "10oz NY Strip, peppercorn sauce, crispy shoestring fries", Category: "Entrees" },
    { Title: "Duck Confit", Price: "$28", Description: "Slow-cooked duck leg, puy lentils, roasted heirloom carrots", Category: "Entrees" },
    { Title: "Pan Seared Scallops", Price: "$30", Description: "Cauliflower purée, brown butter, capers, golden raisins", Category: "Entrees" },
    { Title: "Wild Mushroom Risotto", Price: "$24", Description: "Arborio rice, porcini mushrooms, truffle oil, parmesan reggiano", Category: "Entrees" }
  ],
  drinks: [
    { Title: "Old Fashioned", Price: "$14", Description: "Bourbon, bitters, orange peel", Category: "Drinks" },
    { Title: "French 75", Price: "$13", Description: "Gin, champagne, lemon", Category: "Drinks" },
    { Title: "House Cabernet", Price: "$11", Description: "Napa Valley, 2021", Category: "Drinks" },
    { Title: "Artisan Coffee", Price: "$5", Description: "Locally roasted", Category: "Drinks" }
  ]
};

// --- ANIMATION SETTINGS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

// --- SMOKE COMPONENT (Low & Subtle) ---
const SteamEffect = () => {
  const particles = Array.from({ length: 15 });
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none overflow-hidden z-10">
      {particles.map((_, i) => {
        const startX = random(50, 300); 
        const driftX = random(-50, 50); 
        const heightY = random(-50, -150); 
        const rotation = random(-45, 45); 
        const duration = random(8, 12); 
        const delay = random(0, 5);

        return (
          <motion.div
            key={i}
            className="absolute bg-white/10 w-16 h-16 rounded-[100%] blur-2xl origin-center"
            initial={{ opacity: 0, scale: 0.5, x: startX, y: 100, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [0.5, 2], 
              y: heightY, 
              x: startX + driftX, 
              rotate: rotation 
            }}
            transition={{ 
              duration: duration,
              repeat: Infinity, 
              delay: delay,
              ease: "easeInOut",
              times: [0, 0.2, 1] 
            }}
          />
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
const BistroTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  const realAppetizers = ads.filter(ad => ad.Category === 'Appetizers');
  const appetizers = realAppetizers.length > 0 ? realAppetizers : DUMMY_MENU.appetizers;

  const realEntrees = ads.filter(ad => ad.Category === 'Entrees');
  const entrees = realEntrees.length > 0 ? realEntrees : DUMMY_MENU.entrees;

  const realDrinks = ads.filter(ad => ad.Category === 'Drinks');
  const drinks = realDrinks.length > 0 ? realDrinks : DUMMY_MENU.drinks;

  return (
    <div 
      className="w-full h-screen relative overflow-hidden bg-cover bg-center text-amber-50 font-serif"
      style={{ backgroundImage: "url('/bistro-bg.png')" }} 
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Steam Effect */}
      <SteamEffect />

      {/* --- NEW IMAGES (Wine & Dish) --- */}
      {/* Note: These will be invisible/broken until you upload the PNGs to /public */}
      
      {/* 🍷 Wine Bottle (Bottom Right) */}
      <motion.img 
        src="/wine-bottle.png" 
        className="absolute bottom-0 right-[-50px] h-[600px] w-auto z-20 opacity-90 drop-shadow-2xl pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* 🍲 Signature Dish (Bottom Center/Left) */}
      <motion.img 
        src="/signature-dish.png" 
        className="absolute bottom-[-50px] left-[35%] h-[400px] w-auto z-20 opacity-90 drop-shadow-2xl pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />


      {/* --- THE LAYOUT GRID --- */}
      <div className="relative z-30 w-full h-full grid grid-cols-12 gap-4 p-12">
        
        {/* LEFT ZONE - SQUEEZED HARDER (px-32) */}
        <div className="col-span-4 pt-44 px-32">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {appetizers.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-amber-100" style={{ color: item.Color }}>{item.Title}</h3>
                  <span className="text-xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-sm text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* 3px DIVIDER */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-3"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CENTER ZONE - SQUEEZED SLIGHTLY (px-16) */}
        <div className="col-span-4 pt-32 px-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {entrees.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-4xl font-bold text-white" style={{ color: item.Color }}>{item.Title}</h3>
                  <span className="text-4xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-xl text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* 3px DIVIDER */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-5"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ZONE - SQUEEZED HARDER (px-32) - This brings price "IN" */}
        <div className="col-span-4 pt-44 px-32">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {drinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-amber-100" style={{ color: item.Color }}>{item.Title}</h3>
                  <span className="text-xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-sm text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* 3px DIVIDER */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-3"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* --- FOOTER --- */}
      <div className="absolute bottom-8 w-full text-center z-10 pointer-events-none">
        <p className="text-amber-500 font-serif text-lg tracking-[0.3em] uppercase opacity-80">
          Locally Sourced • Seasonal Ingredients • Established 2025
        </p>
      </div>

    </div>
  );
};

export default BistroTheme;
