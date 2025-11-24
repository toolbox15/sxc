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
    { Title: "The Old Fashioned", Price: "$14", Description: "Bourbon, angostura bitters, orange peel, luxardo cherry", Category: "Drinks" },
    { Title: "French 75", Price: "$13", Description: "Gin, champagne, lemon juice, sugar", Category: "Drinks" },
    { Title: "House Cabernet", Price: "$11", Description: "Napa Valley, 2021", Category: "Drinks" },
    { Title: "Artisan Coffee", Price: "$5", Description: "Locally roasted, french press", Category: "Drinks" }
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

// --- SMOKE COMPONENT (FIXED: Visible & Bottom Left) ---
const SteamEffect = () => {
  const particles = Array.from({ length: 12 }); // Increased count slightly
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    // Locked to Bottom Left, 400px wide
    <div className="absolute bottom-0 left-0 w-[400px] h-[500px] pointer-events-none overflow-hidden z-10">
      {particles.map((_, i) => {
        const startX = random(50, 250); // Start in the left corner
        const driftX = random(-50, 50); // Drift left/right
        const heightY = random(-200, -400); // Float up
        const rotation = random(-90, 90); // Twist
        const duration = random(8, 12); // Speed
        const delay = random(0, 5);

        return (
          <motion.div
            key={i}
            // Increased opacity (bg-white/10) and blur (blur-xl) so it's visible
            className="absolute bg-white/10 w-12 h-24 rounded-[100%] blur-2xl origin-center"
            initial={{ opacity: 0, scale: 0.5, x: startX, y: 100, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0], // Peak opacity 0.4 (Visible but not a flashlight)
              scale: [0.5, 1.5], 
              y: heightY, 
              x: startX + driftX, 
              rotate: rotation 
            }}
            transition={{ 
              duration: duration,
              repeat: Infinity, 
              delay: delay,
              ease: "easeInOut",
              times: [0, 0.2, 0.8] 
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

      {/* Steam Effect (Now visible!) */}
      <SteamEffect />

      {/* --- THE LAYOUT GRID --- */}
      <div className="relative z-10 w-full h-full grid grid-cols-12 gap-4 p-12">
        
        {/* LEFT ZONE (Appetizers) */}
        <div className="col-span-4 pt-40 px-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {appetizers.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-3xl font-bold text-amber-100 group-hover:text-white transition-colors" style={{ color: item.Color }}>
                    {item.Title}
                  </h3>
                  <span className="text-3xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-lg text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* DIVIDER: 3px height */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-4"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CENTER ZONE (Entrees) */}
        <div className="col-span-4 pt-32 px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {entrees.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-4xl font-bold text-white group-hover:text-amber-200 transition-colors" style={{ color: item.Color }}>
                    {item.Title}
                  </h3>
                  <span className="text-4xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-xl text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* DIVIDER: 3px height */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-4"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ZONE (Drinks) */}
        <div className="col-span-4 pt-40 px-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {drinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-3xl font-bold text-amber-100 group-hover:text-white transition-colors" style={{ color: item.Color }}>
                    {item.Title}
                  </h3>
                  <span className="text-3xl text-amber-400 font-bold">{item.Price}</span>
                </div>
                {item.Description && <p className="text-lg text-amber-200/60 italic mt-1">{item.Description}</p>}
                
                {/* DIVIDER: 3px height */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent my-4"></div>
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
