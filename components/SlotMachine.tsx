import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// THE ASSETS (Level 1: Emojis)
// You can replace these with <img src="/burger.png" /> later!
const ITEMS = [
  { id: 'beer', icon: '🍺', label: '$3 DRAFTS' },
  { id: 'wings', icon: '🍗', label: '50¢ WINGS' },
  { id: 'shot', icon: '🥃', label: '$4 SHOTS' },
  { id: 'nachos', icon: '🌮', label: 'HALF OFF NACHOS' },
  { id: 'burger', icon: '🍔', label: '$5 BURGERS' },
];

const REEL_HEIGHT = 120; // Height of one item

export const SlotMachine = ({ triggerSpin }: { triggerSpin: boolean }) => {
  const [winner, setWinner] = useState<string | null>(null);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  useEffect(() => {
    if (triggerSpin) {
      spinReels();
    }
  }, [triggerSpin]);

  const spinReels = async () => {
    setWinner(null);
    playSound('spin');

    // 1. Determine the Result BEFORE we spin (The "Rigged" Logic)
    // This allows you to force "Wings" if you need to dump inventory
    const randomIndex = Math.floor(Math.random() * ITEMS.length);
    const targetItem = ITEMS[randomIndex];
    
    // 2. Calculate the pixel distance to land on that item
    // We spin "50 full loops" plus the distance to the target
    const targetY = -(randomIndex * REEL_HEIGHT) - (ITEMS.length * REEL_HEIGHT * 20);

    // 3. Animate Reels (Staggered stopping for dramatic effect)
    await Promise.all([
      controls1.start({ y: targetY, transition: { duration: 2, ease: "easeInOut" } }),
      controls2.start({ y: targetY, transition: { duration: 2.5, ease: "easeInOut" } }),
      controls3.start({ y: targetY, transition: { duration: 3, ease: "easeInOut" } })
    ]);

    // 4. Winner!
    playSound('jackpot');
    setWinner(targetItem.label);
  };

  const playSound = (type: 'spin' | 'jackpot') => {
    // Make sure these files exist in your public/ folder!
    const audio = new Audio(type === 'spin' ? '/spin-loop.mp3' : '/jackpot.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Browser blocked audio:", e));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/80 rounded-xl border-4 border-yellow-500 shadow-2xl animate-pulse-border">
      
      {/* HEADER */}
      <h2 className="text-4xl font-black text-yellow-400 mb-6 drop-shadow-md tracking-widest">
        MYSTERY SPECIAL
      </h2>

      {/* THE MACHINE WINDOW */}
      <div className="flex gap-4 p-4 bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden relative" style={{ height: '140px' }}>
        
        {/* REEL 1 */}
        <Reel controls={controls1} />
        {/* REEL 2 */}
        <Reel controls={controls2} />
        {/* REEL 3 */}
        <Reel controls={controls3} />
        
        {/* The "Win Line" Indicator */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/50 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* WINNER TEXT */}
      {winner && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          className="mt-6 text-center"
        >
          <div className="text-white text-xl font-bold">WINNER:</div>
          <div className="text-5xl font-black text-green-400 animate-bounce">
            {winner}
          </div>
          <div className="text-sm text-gray-400 mt-2">Show this screen to bartender!</div>
        </motion.div>
      )}
    </div>
  );
};

// Sub-Component for the scrolling strip
const Reel = ({ controls }: { controls: any }) => {
  // We duplicate the list 40 times to create a "loop" illusion
  const hugeList = [...Array(40)].flatMap(() => ITEMS);

  return (
    <div className="w-24 h-full bg-white rounded border-2 border-gray-400 overflow-hidden relative">
      <motion.div className="flex flex-col items-center" animate={controls} initial={{ y: 0 }}>
        {hugeList.map((item, i) => (
          <div key={i} className="flex items-center justify-center text-6xl" style={{ height: REEL_HEIGHT }}>
            {item.icon}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
