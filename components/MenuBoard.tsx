import React, { useEffect, useState } from 'react';
import { MenuItem } from '../types';

interface MenuBoardProps {
  items: MenuItem[];
}

export const MenuBoard: React.FC<MenuBoardProps> = ({ items }) => {
  // Key to reset animations when items change or timer fires
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Reset animation immediately when items change
    setAnimationKey(prev => prev + 1);

    // Set up a loop to replay animation every 10 seconds
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl backdrop-blur-md transition-all duration-500">
      {/* Dark Overlay Container */}
      <div className="relative flex flex-col items-center bg-black/40 p-8 md:p-16 text-center border border-white/10">
        
        {/* Header Section */}
        <div className="mb-12 animate-subtle-pulse">
          <h1 className="font-serif text-5xl md:text-7xl font-light italic tracking-wide text-amber-50 drop-shadow-lg">
            Today&rsquo;s Specials
          </h1>
          <div className="mt-6 mx-auto h-1 w-24 bg-amber-200/80 rounded-full shadow-[0_0_10px_rgba(253,230,138,0.5)]" />
        </div>

        {/* Menu Items List */}
        <div className="w-full max-w-2xl space-y-8" key={animationKey}>
          {items.map((item, index) => (
            <div 
              key={`${item.name}-${index}`}
              className="animate-fade-in-up group relative flex items-end justify-between border-b border-white/20 pb-2"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-2xl md:text-3xl font-medium tracking-wider text-white uppercase group-hover:text-amber-100 transition-colors">
                  {item.name}
                </span>
                {/* Optional description if available (mostly for AI generated ones) */}
                {item.description && (
                  <span className="text-sm text-gray-300 font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-md">
                    {item.description}
                  </span>
                )}
              </div>
              
              <span className="text-2xl md:text-3xl font-bold text-amber-100 tracking-wide">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Decor */}
        <div className="mt-16 opacity-60">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-100">
             <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
             <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
             <line x1="6" y1="1" x2="6" y2="4" />
             <line x1="10" y1="1" x2="10" y2="4" />
             <line x1="14" y1="1" x2="14" y2="4" />
           </svg>
        </div>

      </div>
    </div>
  );
};