import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Snowflake } from 'lucide-react';

// --- Types for your Google Sheet Data ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Color?: string; // <--- ADDED: This allows Google Sheet to control text color
}

// --- Sub-components ---

const RibbonHeader: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
  <div className={`relative flex items-center justify-center py-4 bg-red-800 shadow-xl border-y-4 border-yellow-500 ${className}`}>
    <div className="absolute inset-0 border-2 border-dashed border-yellow-500/30 m-1"></div>
    <h2 className="text-6xl font-serif font-bold text-white tracking-widest uppercase drop-shadow-md z-10">
      {title}
    </h2>
    <div className="absolute -left-4 top-0 bottom-0 w-4 bg-red-900 skew-y-6 origin-right"></div>
    <div className="absolute -right-4 top-0 bottom-0 w-4 bg-red-900 -skew-y-6 origin-left"></div>
  </div>
);

const MenuListItem: React.FC<{ item: AdItem; large?: boolean }> = ({ item, large = false }) => (
  <div className="flex items-baseline justify-between w-full mb-3 relative group">
    <div className="flex-grow pr-4 relative z-10">
      {/* UPDATED: Logic to use Google Sheet Color 
         If item.Color exists, use it. Otherwise, default to gray-100.
      */}
      <span 
        className={`font-sans font-bold ${large ? 'text-4xl' : 'text-3xl'}`}
        style={{ color: item.Color || '#f3f4f6' }} 
      >
        {item.Title} 
      </span>
      {item.Description && (
        <p className="text-2xl text-gray-400 italic mt-1 font-serif">{item.Description}</p>
      )}
    </div>
    
    {/* Dotted Leader */}
    <div className="absolute left-0 right-0 bottom-2 border-b-2 border-dotted border-gray-600 z-0"></div>

    <div className="relative z-10 pl-4 bg-gradient-to-l from-slate-900 to-slate-900/0">
      <span className={`font-serif font-bold text-yellow-400 ${large ? 'text-5xl' : 'text-4xl'}`}>
        {item.Price}
      </span>
    </div>
  </div>
);

const SnowEffect: React.FC = () => {
  const snowflakes = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 20,
    size: 5 + Math.random() * 10,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{ left: `${flake.x}%`, width: flake.size, height: flake.size }}
          initial={{ y: -50 }}
          animate={{ y: 2200 }} 
          transition={{ duration: flake.duration, repeat: Infinity, delay: flake.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// --- SVGs ---

const PizzaWreathSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="20" opacity="0.6" filter="blur(4px)" />
    <circle cx="100" cy="100" r="85" fill="none" stroke="#d97706" strokeWidth="22" />
    <circle cx="100" cy="100" r="85" fill="none" stroke="#fbbf24" strokeWidth="20" strokeDasharray="10 15" strokeLinecap="round" opacity="0.8" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="#b91c1c" strokeWidth="48" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="#fef3c7" strokeWidth="40" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="#d97706" strokeWidth="40" strokeDasharray="5 45" opacity="0.4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={`pep-${i}`} transform={`rotate(${angle} 100 100)`}>
        <circle cx="100" cy="45" r="7.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
        <circle cx="102" cy="47" r="2" fill="#fca5a5" opacity="0.5" />
        <circle cx="98" cy="44" r="1" fill="#7f1d1d" opacity="0.3" />
      </g>
    ))}
    {[35, 80, 125, 170, 215, 260, 305, 350].map((angle, i) => (
      <g key={`sausage-${i}`} transform={`rotate(${angle} 100 100)`}>
         <path d="M96 52 C 94 48, 104 46, 106 50 C 108 55, 100 58, 96 52" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
         <circle cx="99" cy="51" r="1.2" fill="#8D6E63" opacity="0.4" />
      </g>
    ))}
    {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => (
      <g key={`basil-${i}`} transform={`rotate(${angle} 100 100)`}>
        <path d="M100 48 Q 90 40 95 32 Q 105 32 100 48" fill="#15803d" />
        <path d="M100 48 Q 110 40 105 32 Q 95 32 100 48" fill="#166534" opacity="0.7" />
      </g>
    ))}
    {[10, 100, 190, 280].map((angle, i) => (
      <circle key={`olive-${i}`} cx="100" cy="58" r="3.5" fill="#171717" stroke="#404040" strokeWidth="1" transform={`rotate(${angle} 100 100)`} />
    ))}
    {[55, 145, 235, 325].map((angle, i) => (
      <path key={`mush-${i}`} d="M97 55 Q 100 50 103 55 L 103 60 L 97 60 Z" fill="#a8a29e" transform={`rotate(${angle} 100 100)`} />
    ))}
    <g transform="translate(0, 15)">
      <path d="M100 160 L 80 200 L 100 160 L 120 200" stroke="#dc2626" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 200 L 85 205 M 120 200 L 115 205" stroke="#991b1b" strokeWidth="2" />
      <path d="M100 160 C 80 140, 50 160, 70 180 C 80 190, 100 160, 100 160" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <path d="M100 160 C 120 140, 150 160, 130 180 C 120 190, 100 160, 100 160" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <circle cx="100" cy="160" r="7" fill="#b91c1c" />
    </g>
  </svg>
);

const GlowingTreeSVG: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
        <path d="M100 20 L40 100 H80 L30 180 H70 L20 260 H180 L130 180 H170 L120 100 H160 Z" fill="#14532d" />
        <rect x="85" y="260" width="30" height="40" fill="#3f2c22" />
        <motion.circle cx="100" cy="20" r="8" fill="#fbbf24" animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="60" cy="120" r="5" fill="#ef4444" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
        <motion.circle cx="140" cy="140" r="5" fill="#3b82f6" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="90" cy="190" r="5" fill="#eab308" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.1 }} />
        <motion.circle cx="120" cy="230" r="5" fill="#a855f7" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }} />
        <motion.circle cx="50" cy="240" r="5" fill="#ec4899" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.0, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="150" cy="250" r="5" fill="#ef4444" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.7 }} />
      </svg>
    </div>
  );
};

// --- Main Component ---

const ChristmasTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  // Maps your Google Sheet Categories to the boxes
  const starters = ads.filter(ad => ad.Category === 'Starters'); // Note: "Starters" with 's'
  const sides = ads.filter(ad => ad.Category === 'Sides');
  const pizzas = ads.filter(ad => ad.Category === 'Best Pizza');
  const specials = ads.filter(ad => ad.Category === 'Specials');
  const extras = ads.filter(ad => ad.Category === 'Festive Drinks');

  return (
    // BACKGROUND CONTROL: To change background, edit the "bg-gradient..." classes below
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-gray-100">
      <SnowEffect />
      
      {/* Floating Icons */}
      <motion.div className="absolute top-12 left-12 text-yellow-500/20" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        <Snowflake size={120} />
      </motion.div>
      <motion.div className="absolute bottom-24 left-[35%] text-red-600/20" animate={{ rotate: -10 }} transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}>
        <Gift size={160} />
      </motion.div>

      {/* Main Grid Container - 16:9 4K Layout */}
      <div className="w-full h-full grid grid-cols-12 gap-12 p-16 relative z-10">
        
        {/* --- LEFT COLUMN --- */}
        <div className="col-span-4 flex flex-col gap-12 h-full relative z-10">
          {/* STARTERS */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-red-900/30 p-8 rounded-xl shadow-2xl flex-1 flex flex-col pt-32"> 
            <RibbonHeader title="Starters" className="mb-8 -mx-12" />
            <div className="flex flex-col justify-start gap-2 h-full py-4 overflow-y-auto">
              {starters.map((item, i) => (
                <MenuListItem key={i} item={item} large />
              ))}
            </div>
          </div>

          {/* EXTRAS (Bottom Left) */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-red-900/30 p-8 rounded-xl shadow-2xl h-[40%] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-500 rounded-tl-3xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-500 rounded-br-3xl opacity-50"></div>
            <h3 className="text-5xl font-serif text-yellow-500 text-center mb-8 border-b-2 border-red-800 pb-2">Festive Drinks</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
               {extras.map((item, i) => (
                 <MenuListItem key={i} item={item} />
               ))}
            </div>
          </div>
        </div>

        {/* --- CENTER COLUMN --- */}
        <div className="col-span-4 flex flex-col gap-8 h-full relative z-20">
          {/* Massive Wreath / Title */}
          <div className="flex flex-col items-center justify-start h-[25%] relative -mx-[25vw] z-50 pointer-events-none">
             <div className="absolute top-10 w-[350px] h-[350px] z-0">
                <PizzaWreathSVG className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
             </div>
             <div className="relative z-10 flex flex-col items-center justify-center mt-44">
                <h1 className="font-serif text-[6rem] leading-none text-red-500 italic font-bold drop-shadow-[0_5px_5px_rgba(0,0,0,1)]" style={{ fontFamily: 'serif' }}>Merry</h1>
                <h1 className="font-serif text-[4.5rem] leading-none text-white tracking-[0.2em] font-bold uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,1)] -mt-1">Christmas</h1>
             </div>
          </div>

          {/* SIDES */}
          <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-xl flex-shrink-0 mt-8">
            <RibbonHeader title="Sides" className="mb-8 -mx-12" />
            <div className="flex flex-col gap-6">
              {sides.map((item, i) => (
                <MenuListItem key={i} item={item} large />
              ))}
            </div>
          </div>

          {/* SPECIALS */}
          <div className="flex-grow border-double border-8 border-red-800 bg-red-950/40 relative p-8 flex flex-col items-center justify-center rounded-lg mt-4">
             <div className="absolute -top-6 bg-red-950 p-2 rounded-full border-4 border-yellow-500 shadow-xl">
                <Sparkles size={25} className="text-yellow-400 animate-pulse" />
             </div>
             <h2 className="text-6xl font-serif text-yellow-400 mb-12 mt-4 uppercase tracking-widest border-b-4 border-yellow-600 pb-2">Our Specials</h2>
             <div className="w-full flex flex-col gap-8">
               {specials.map((item, i) => (
                 <MenuListItem key={i} item={item} large />
               ))}
             </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="col-span-4 flex flex-col gap-8 h-full relative z-10">
          {/* BEST PIZZA */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-red-900/30 p-8 rounded-xl shadow-2xl h-full flex flex-col pb-[350px] pt-32"> 
            <RibbonHeader title="Best Pizza" className="mb-10 -mx-12" />
            <div className="flex flex-col justify-start gap-4 h-full overflow-y-auto">
              {pizzas.map((item, i) => (
                 <MenuListItem key={i} item={item} />
              ))}
            </div>
          </div>
          {/* ANIMATED TREE */}
          <div className="absolute bottom-0 right-0 w-full flex justify-center pointer-events-none">
             <GlowingTreeSVG className="w-[400px] h-[500px]" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChristmasTheme;
