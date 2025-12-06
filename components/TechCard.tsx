import React from 'react';
import { motion } from 'framer-motion';

interface TechCardProps {
  children: React.ReactNode;
  title: string;
  price: string;
  color?: 'blue' | 'red' | 'orange';
  delay?: number;
}

const TechCard: React.FC<TechCardProps> = ({ children, title, price, color = 'blue', delay = 0 }) => {
  
  // Color Palettes (Outer Glow / Inner Border)
  const colors: any = {
    blue: {
      outer: 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]',
      inner: 'border-blue-300',
      text: 'text-blue-400'
    },
    red: {
      outer: 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]',
      inner: 'border-red-400',
      text: 'text-red-500'
    },
    orange: {
      outer: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]',
      inner: 'border-orange-300',
      text: 'text-orange-400'
    }
  };

  const c = colors[color];

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative h-full w-full bg-black/80 flex flex-col p-1`}
    >
      {/* 1. THE TECH CORNERS (The L-Shapes) */}
      {/* These absolute divs draw the thick corners over the main border */}
      <div className={`absolute -top-[2px] -left-[2px] w-8 h-8 border-t-4 border-l-4 ${c.outer} z-20 rounded-tl-sm`} />
      <div className={`absolute -top-[2px] -right-[2px] w-8 h-8 border-t-4 border-r-4 ${c.outer} z-20 rounded-tr-sm`} />
      <div className={`absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-4 border-l-4 ${c.outer} z-20 rounded-bl-sm`} />
      <div className={`absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-4 border-r-4 ${c.outer} z-20 rounded-br-sm`} />

      {/* 2. THE MAIN FRAME (Thin Outer Line) */}
      <div className={`absolute inset-0 border border-white/20 z-10`} />
      
      {/* 3. THE INNER GLOW FRAME (Double Stroke Effect) */}
      <div className={`relative h-full w-full border ${c.inner} border-opacity-50 flex flex-col z-0`}>
        
        {/* IMAGE CONTAINER */}
        <div className="h-3/4 w-full overflow-hidden relative group">
           {children}
           {/* Scanline Effect Overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
        </div>

        {/* TEXT CONTAINER */}
        <div className="h-1/4 bg-gray-900/90 border-t border-white/10 flex flex-col items-center justify-center">
            <h3 className="text-white font-black text-xl uppercase tracking-wider drop-shadow-md">{title}</h3>
            <span className={`text-3xl font-black ${c.text} drop-shadow-[0_0_10px_currentColor]`}>{price}</span>
        </div>

      </div>
    </motion.div>
  );
};

export default TechCard;
