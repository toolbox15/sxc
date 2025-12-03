import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';
import { SlotMachine } from './SlotMachine';

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

// --- 🚨 FLASHING STROBE LIGHT (ATTACHED TO BANNER) ---
const FlashingSirenLight = ({ side }: { side: 'left' | 'right' }) => {
  // Position: Bolted to the sides of the box
  const positionClass = side === 'left' ? '-left-16' : '-right-16';
  const rotation = side === 'left' ? 1 : -1; // Spin opposite directions

  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${positionClass} z-50 flex items-center justify-center`}>
      
      {/* 1. THE SPINNING BEAM (The Light Throw) */}
      <motion.div 
        className="absolute w-[800px] h-[800px] bg-gradient-conic from-red-600/90 via-transparent to-transparent rounded-full mix-blend-screen pointer-events-none"
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ rotate: 360 * rotation }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* 2. THE PHYSICAL BULB (The Hardware) */}
      <motion.div
        className="relative z-20 w-32 h-32 rounded-full border-8 border-gray-900 bg-red-600 shadow-[0_0_50px_rgba(255,0,0,1)] overflow-hidden"
        animate={{
          backgroundColor: ['#7f1d1d', '#ff0000', '#7f1d1d'], // Flash bright/dark
          scale: [1, 1.05, 1] // Pulse size
        }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner Bulb Highlight */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-white/50 rounded-full blur-sm" />
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/50 to-transparent" />
      </motion.div>

    </div>
  );
};

// --- 🎉 CONFETTI ENGINE ---
const ConfettiEffect = () => {
  const particles = Array.from({ length: 150 });
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[40]">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white"
          initial={{ y: -100, x: `${random(0, 100)}vw`, opacity: 1, scale: random(0.5, 1.2), rotate: random(0, 360) }}
          animate={{ y: '120vh', x: `calc(${random(0, 100)}vw + ${random(-200, 200)}px)`, opacity: 0, rotate: random(180, 720) }}
          transition={{ duration: random(2, 5), ease: "easeOut", repeat: Infinity, delay: random(0, 2) }}
          style={{ backgroundColor: ['#FFD700', '#FFFFFF', '#FF8C00', '#0057B8'][Math.floor(random(0, 4))] }}
        />
      ))}
    </div>
  );
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

// --- 🏃‍♂️ RUNNING PLAYER (BACKGROUND) ---
const RunningPlayer = () => {
  return (
    <motion.img
      src="/player-run.gif"
      alt="Running Player"
      className="absolute z-30 w-40 h-auto pointer-events-none brightness-90 contrast-125 drop-shadow-2xl opacity-100"
      initial={{ left: '10%', bottom: '50px', opacity: 0, scaleX: 1 }}
      animate={{ left: ['10%', '85%'], opacity: [0, 1, 1, 0], scale: [0.8, 1.2] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 10 }}
    />
  );
};

// --- 🚨 FLASH SALE OVERLAY (WITH ATTACHED STROBES) ---
const FlashSaleOverlay = ({ item }: { item: AdItem }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-blue-950/95">
      
      <ConfettiEffect />
      <motion.div className="absolute inset-0 bg-orange-600/30" animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 0.5, repeat: Infinity }} />
      
      {/* MAIN TEXT CONTENT BOX */}
      <motion.div 
        className="relative z-50 text-center p-8 w-full max-w-4xl bg-blue-950 border-y-8 border-orange-500 shadow-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale
