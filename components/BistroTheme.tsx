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

// --- PLACEHOLDER DATA ---
const DUMMY_MENU = {
  appetizers: [
    { Title: "Truffle Parmesan Fries", Price: "$12", Description: "Hand-cut fries, truffle oil, shaved parmesan, garlic aioli", Category: "Appetizers" },
    { Title: "Escargot de Bourgogne", Price: "$16", Description: "Garlic herb butter, toasted baguette slices", Category: "Appetizers" },
    { Title: "Beef Carpaccio", Price: "$18", Description: "Thinly sliced raw beef, capers, baby arugula, lemon", Category: "Appetizers" },
    { Title: "French Onion Soup", Price: "$10", Description: "Caramelized onions, rich beef broth, gruyère crouton", Category: "Appetizers" }
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

// --- GOLDEN DUST COMPONENT (Elegant Atmosphere) ---
const GoldenDustEffect = () => {
  const particles = Array.from({ length: 25 });
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        const startX = random(0, window.innerWidth);
        const startY = random(0, window.innerHeight);
        const duration = random(10, 20);

        return (
          <motion.div
            key={i}
            className="absolute bg-amber-400 w-1 h-1 rounded-full opacity-60"
            initial={{ x: startX, y: startY, scale: 0, opacity: 0 }}
            animate={{ 
              y: [startY, startY - 100], 
              x: [startX, startX + random(-20, 20)], 
              opacity: [0, 0.6, 0], 
              scale: [0, 1.5, 0] 
            }}
            transition={{ 
              duration: duration,
              repeat: Infinity, 
              delay: random(0, 10),
              ease: "easeInOut"
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

      {/* ✨ GOLDEN DUST EFFECT ✨ */}
      <GoldenDustEffect />

      {/* --- THE LAYOUT GRID --- */}
      <div className="relative z-10 w-full h-full grid grid-cols-12 gap-4 p-12">
        
        {/* LEFT ZONE (Appetizers) */}
        <div className="col-span-4 pt-44 px-24">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {appetizers.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="flex justify-between items-baseline">
                  {/* Fixed Color: Amber-100 (No Hover) */}
                  <h3 className="text-xl font-bold text-amber-100" style={{ color: item.Color }}>
                    {item.Title}
                  </h3>
                  <span className="text-xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-sm text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* DIVIDER */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-3"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CENTER ZONE (Entrees) */}
        <div className="col-span-4 pt-32 px-10">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {entrees.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="flex justify-between items-baseline">
                  {/* Fixed Color: White (No Hover) */}
                  <h3 className="text-4xl font-bold text-white" style={{ color: item.Color }}>
                    {item.Title}
                  </h3>
                  <span className="text-4xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-xl text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* DIVIDER */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-5"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ZONE (Drinks) */}
        <div className="col-span-4 pt-44 px-24">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {drinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="flex justify-between items-baseline">
                   {/* Fixed Color: Amber-100 (No Hover) */}
                  <h3 className="text-xl font-bold text-amber-100" style={{ color: item.Color }}>
                    {item.Title}
                  </h3>
                  <span className="text-xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-sm text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* DIVIDER */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-3"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* --- FOOTER --- */}
      <div className="absolute bottom-8 w-full text-center z-20 pointer-events-none">
        <p className="text-amber-500 font-serif text-lg tracking-[0.3em] uppercase opacity-80">
          Locally Sourced • Seasonal Ingredients • Established 2025
        </p>
      </div>

    </div>
  );
};

export default BistroTheme;
