import React from 'react';
import { motion } from 'framer-motion';

const NeonBorder = ({ children, color1 = "#ff0000", color2 = "#0088ff" }: any) => {
  return (
    <div className="relative w-full h-full p-[6px]"> {/* p-6 makes room for the thick border */}
      
      {/* 1. THE CONTENT (Food Photo) */}
      <div className="relative z-10 w-full h-full bg-black/50 overflow-hidden">
        {children}
      </div>

      {/* 2. THE GRADIENT TUBE (Static Base) */}
      {/* This draws the thick gradient line behind the dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id={`grad-${color1}-${color2}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect 
          x="3" y="3" width="99%" height="98%" 
          fill="none" 
          stroke={`url(#grad-${color1}-${color2})`} 
          strokeWidth="6" 
          rx="0" ry="0" 
          filter="url(#glow)"
        />
      </svg>

      {/* 3. THE RUNNING DOTS (Animation) */}
      {/* This is the white dotted line that chases around the box */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <motion.rect 
          x="3" y="3" width="99%" height="98%" 
          fill="none" 
          stroke="white" 
          strokeWidth="3" 
          strokeDasharray="10 20" /* 10px Dot, 20px Gap */
          strokeLinecap="round"
          rx="0" ry="0" 
          animate={{ strokeDashoffset: [0, -30] }} /* This makes it RUN */
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
    </div>
  );
};

export default NeonBorder;
