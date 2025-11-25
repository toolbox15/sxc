import React from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
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

// --- 🎉 CONFETTI ENGINE (Chicago Colors) ---
const ConfettiEffect = () => {
  const particles = Array.from({ length: 75 }); // Lots of confetti!
  const colors = ['#C83803', '#0B162A', '#FFFFFF']; // Bears Orange, Navy, White
  
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            style={{ 
              backgroundColor: colors[Math.floor(random(0, 3))],
              left: `${random(0, 100)}%`,
              top: -20
            }}
            animate={{ 
              y: window.innerHeight + 100, 
              rotateX: random(0, 360), 
              rotateY: random(0, 360),
              x: random(-50, 50)
            }}
            transition={{ 
              duration: random(2, 5), 
              repeat: Infinity, 
              ease: "linear",
              delay: random(0, 5)
            }}
          />
        );
      })}
    </div>
  );
};

// --- 🚨 FLASH SALE OVERLAY (WITH CONFETTI) ---
const FlashSaleOverlay = ({ item }: { item: AdItem }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-blue-950/95">
      
      {/* 1. CONFETTI */}
      <ConfettiEffect />

      {/* 2. PULSING BACKGROUND GLOW */}
      <motion.div 
        className="absolute inset-0 bg-orange-600/20"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      {/* 3. MASSIVE TEXT CONTENT */}
      <motion.div 
        className="relative z-10 text-center p-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        {/* "TOUCHDOWN!" OR "FLASH SALE" HEADER */}
        <h2 className="text-4xl font-bold text-white italic tracking-widest mb-4">🚨 FIELD ALERT 🚨</h2>
        
        {/* MAIN DEAL: "30% OFF DRINKS" */}
        <h1 className="text-8xl md:text-9xl font-black text-orange-500 uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,1)] leading-none mb-6">
          {item.Title}
        </h1>

        {/* TIMER/SUBTEXT: "FOR THE NEXT 10 MINS" */}
        <motion.div 
          className="inline-block bg-white text-blue-950 text-4xl font-black uppercase px-8 py-4 rounded-full shadow-2xl"
          animate={{ scale: [1, 1.1, 1] }} // Heartbeat pulse
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {item.Description || "LIMITED TIME ONLY!"}
        </motion.div>
      </motion.div>

    </div>
  );
};

// --- DECORATIVE COMPONENTS ---
const BubblesEffect = () => {
  const bubbles = Array.from({ length: 30 }); 
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  return (
    <div className="absolute bottom-[120px] left-[50px] w-[140px] h-[300px] pointer-events-none overflow-hidden z-20 opacity-50">
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ width: random(2, 5), height: random(2, 5), left: `${random(5, 95)}%` }}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: -20, opacity: [0, 1, 0], x: random(-3, 3) }}
          transition={{ duration: random(2, 4), repeat: Infinity, delay: random(0, 5), ease: "linear" }}
        />
      ))}
    </div>
  );
};

const StadiumFlashEffect = () => {
  const flashes = Array.from({ length: 15 });
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flashes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full blur-xl"
          style={{ width: random(10, 40), height: random(10, 40), top: random(0, window.innerHeight/2), left: random(0, window.innerWidth) }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: random(1, 8), delay: random(0, 5) }}
        />
      ))}
    </div>
  );
};

// --- 🏃‍♂️ RUNNING PLAYER (Always Active) ---
const RunningPlayer = () => {
  return (
    <motion.img
      src="/player-run.gif"
      alt="Running Player"
      className="absolute z-30 w-40 h-auto drop-shadow-lg pointer-events-none brightness-0 opacity-80"
      initial={{ left: '10%', bottom: '50px', opacity: 0, scaleX: 1 }}
      animate={{ left: ['10%', '85%'], opacity: [0, 1, 1, 0], scale: [0.8, 1.2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
    />
  );
};

// --- MAIN COMPONENT ---
const BearsTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  const kickoff = ads.filter(ad => ad.Category === 'Kickoff').length > 0 ? ads.filter(ad => ad.Category === 'Kickoff') : DUMMY_MENU.kickoff;
  const mains = ads.filter(ad => ad.Category === 'Main Event').length > 0 ? ads.filter(ad => ad.Category === 'Main Event') : DUMMY_MENU.main_event;
  const drinks = ads.filter(ad => ad.Category === 'Draft Picks').length > 0 ? ads.filter(ad => ad.Category === 'Draft Picks') : DUMMY_MENU.draft_picks;

  // 🚨 CHECK FOR ACTIVE ALERT
  const alertAd = ads.find(ad => ad.Category === 'ALERT' && ad.Status === 'Active');

  return (
    <div 
      className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/field-bg.png')" }} 
    >
      {/* 🚨 IF ALERT IS ACTIVE, SHOW CONFETTI OVERLAY */}
      {alertAd && <FlashSaleOverlay item={alertAd} />}

      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/50 to-blue-950/90 z-0"></div>
      <StadiumFlashEffect />

      {/* RUNNER */}
      <RunningPlayer />

      {/* DECORATIVE ASSETS */}
      <motion.div 
        className="absolute bottom-[-40px] left-[-60px] z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
          <BubblesEffect />
          <img src="/beer-glass.png" alt="Beer Glass" className="h-[500px] w-auto drop-shadow-2xl" />
      </motion.div>

      <motion.div 
        className="absolute bottom-[10px] right-[30px] z-10"
        animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/football.png" className="h-[350px] w-auto drop-shadow-2xl" />
      </motion.div>

      {/* CONTENT GRID */}
      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
        <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-white italic drop-shadow-lg">
            Game Day <span className="text-orange-500">Specials</span>
          </h1>
        </div>

        {/* LEFT */}
        <div className="col-span-4 pl-60 pt-4">
          <div className="bg-orange-600/20 border-l-4 border-orange-500 p-3 mb-4 rounded-r-lg flex items-center gap-3">
            <Flame className="text-orange-500 w-8 h-8" />
            <h2 className="text-3xl font-black text-white uppercase italic">Kickoff</h2>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
            {kickoff.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600 pb-2">
                <div className="flex justify-between items-end w-full">
                  <div className="flex items-center gap-2">
                    <Flame className="text-orange-600 w-5 h-5" />
                    <h3 className="text-xl font-bold text-white uppercase">{item.Title}</h3>
                  </div>
                  <span className="text-2xl font-black text-orange-500">{item.Price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CENTER */}
        <div className="col-span-4 pt-4 px-6">
          <div className="bg-white/10 border-l-4 border-white p-3 mb-4 rounded-r-lg flex items-center gap-3">
            <UtensilsCrossed className="text-white w-8 h-8" />
            <h2 className="text-3xl font-black text-white uppercase italic">The Main Event</h2>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {mains.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600 pb-2">
                <div className="flex justify-between items-end w-full">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="text-orange-600 w-6 h-6" />
                    <h3 className="text-2xl font-bold text-white uppercase">{item.Title}</h3>
                  </div>
                  <span className="text-3xl font-black text-orange-500">{item.Price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="col-span-4 pr-40 pt-4">
          <div className="bg-orange-600/20 border-r-4 border-orange-500 p-3 mb-4 rounded-l-lg text-right flex items-center justify-end gap-3">
            <h2 className="text-3xl font-black text-white uppercase italic">Draft Picks</h2>
            <Beer className="text-orange-500 w-8 h-8" />
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5 pb-32">
            {drinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600 pb-2">
                <div className="flex justify-between items-end w-full">
                  <div className="flex items-center gap-2">
                    <Beer className="text-orange-600 w-5 h-5" />
                    <h3 className="text-xl font-bold text-white uppercase">{item.Title}</h3>
                  </div>
                  <span className="text-2xl font-black text-orange-500">{item.Price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default BearsTheme;
