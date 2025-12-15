import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';
import { SlotMachine } from './SlotMachine';

// --- COLOR VARIABLES ---
// Primary: A dark, rich Green (for the 'Blue' elements)
const PRIMARY_COLOR = 'rgb(27, 94, 32)'; // Dark Green
// Secondary: A warm Gold/Yellow (for the 'Orange' elements)
const SECONDARY_COLOR = 'rgb(255, 193, 7)'; // Gold/Yellow

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
    { Title: "Bruschetta Board", Price: "$12", Description: "Toasted bread, tomato, basil, balsamic glaze", Category: "Kickoff" },
    { Title: "Fried Calamari", Price: "$15", Description: "Crispy rings, lemon pepper, marinara", Category: "Kickoff" },
    { Title: "Garlic Knots", Price: "$8", Description: "Tossed in garlic butter, parmesan cheese", Category: "Kickoff" },
    { Title: "Prosciutto-Wrapped Mozza", Price: "$14", Description: "Fresh mozzarella, prosciutto, olive oil", Category: "Kickoff" }
  ],
  main_event: [
    { Title: "Chicken Parmigiana", Price: "$24", Description: "Breaded cutlet, melted mozzarella, spaghetti", Category: "Main Event" },
    { Title: "Linguine with Clams", Price: "$22", Description: "Fresh clams, white wine sauce, parsley", Category: "Main Event" },
    { Title: "Tony's Signature Lasagna", Price: "$25", Description: "Layered pasta, meat sauce, ricotta & mozzarella", Category: "Main Event" },
    { Title: "Steak Pizzaiola", Price: "$30", Description: "Ribeye, tomato sauce, oregano, capers", Category: "Main Event" }
  ],
  draft_picks: [
    { Title: "Peroni Lager", Price: "$8", Description: "Italian Pilsner, 16oz", Category: "Draft Picks" },
    { Title: "Chianti Classico Glass", Price: "$14", Description: "Bold Italian Red", Category: "Draft Picks" },
    { Title: "Espresso Martini", Price: "$13", Description: "Vodka, coffee liqueur, espresso shot", Category: "Draft Picks" },
    { Title: "Limoncello Spritz", Price: "$11", Description: "Limoncello, Prosecco, Soda", Category: "Draft Picks" }
  ]
};

// --- REST OF CODE (Unchanged Siren, Confetti, Bubbles, etc.) ---
// Note: You must keep the rest of the functions (SirenImage, ConfettiEffect, etc.) as is.

// --- 🚨 SIREN IMAGE COMPONENT ---
// (KEEP SirenImage, ConfettiEffect, BubblesEffect, StadiumFlashEffect, RunningPlayer, FlashSaleOverlay functions here)
const SirenImage = () => {
    return (
      <div className="relative z-50">
        <img src="/siren.png" alt="Siren" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl" />
        <motion.div className="absolute inset-0 bg-red-500 mix-blend-hard-light rounded-t-full opacity-0" style={{ clipPath: "inset(10% 20% 40% 20%)" }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-600 blur-3xl rounded-full" animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    );
  };
  
const ConfettiEffect = () => {
    const particles = Array.from({ length: 150 });
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[50]">
        {particles.map((_, i) => (
          <motion.div key={i} className="absolute w-3 h-3 bg-white" initial={{ y: -100, x: `${random(0, 100)}vw`, opacity: 1, scale: random(0.5, 1.2), rotate: random(0, 360) }} animate={{ y: '120vh', x: `calc(${random(0, 100)}vw + ${random(-200, 200)}px)`, opacity: 0, rotate: random(180, 720) }} transition={{ duration: random(2, 5), ease: "easeOut", repeat: Infinity, delay: random(0, 2) }} style={{ backgroundColor: ['#FFD700', '#FFFFFF', '#FF8C00', '#0057B8'][Math.floor(random(0, 4))] }} />
        ))}
      </div>
    );
  };
  
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } } };
  
const BubblesEffect = () => {
    const bubbles = Array.from({ length: 30 }); 
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    // Adjusted container size to match smaller beer mug
    return (
      <div className="absolute bottom-[80px] left-[30px] w-[100px] h-[220px] pointer-events-none overflow-hidden z-20 opacity-50">
        {bubbles.map((_, i) => (
          <motion.div key={i} className="absolute bg-white rounded-full" style={{ width: random(2, 5), height: random(2, 5), left: `${random(5, 95)}%` }} initial={{ y: 220, opacity: 0 }} animate={{ y: -20, opacity: [0, 1, 0], x: random(-3, 3) }} transition={{ duration: random(2, 4), repeat: Infinity, delay: random(0, 5), ease: "linear" }} />
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
          <motion.div key={i} className="absolute bg-white rounded-full blur-xl" style={{ width: random(10, 40), height: random(10, 40), top: random(0, window.innerHeight/2), left: random(0, window.innerWidth) }} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 0.2, repeat: Infinity, repeatDelay: random(1, 8), delay: random(0, 5) }} />
      ))}
      </div>
    );
  };
  
const RunningPlayer = () => {
    return (<motion.img src="/player-run.gif" alt="Running Player" className="absolute z-30 w-40 h-auto pointer-events-none brightness-90 contrast-125 drop-shadow-2xl opacity-100" initial={{ left: '10%', bottom: '50px', opacity: 0, scaleX: 1 }} animate={{ left: ['10%', '85%'], opacity: [0, 1, 1, 0], scale: [0.8, 1.2] }} transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 10 }} />);
  };
  
const FlashSaleOverlay = ({ item }: { item: AdItem }) => {
    return (
      <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md">
        <ConfettiEffect />
        <motion.div className="absolute inset-0" style={{ backgroundColor: `${SECONDARY_COLOR}30` }} animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 0.5, repeat: Infinity }} />
        <motion.div className="relative z-10 w-[90%] max-w-5xl rounded-3xl border-[6px] border-white shadow-[0_0_100px_rgba(234,88,12,0.6)] flex flex-col items-center p-12 mt-10" style={{ backgroundColor: PRIMARY_COLOR }} initial={{ scale: 0, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.5 }}>
          <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20"><div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgb(255,193,7)_20px,rgb(255,193,7)_40px)]"></div></div>
          <div className="absolute -top-16 -left-12 z-50"><SirenImage /></div>
          <div className="absolute -top-16 -right-12 z-50"><SirenImage /></div>
          <div className="absolute -top-10 bg-orange-600 text-white px-10 py-4 rounded-xl border-4 border-white shadow-lg transform -rotate-1 z-20"><h2 className="text-4xl font-black italic uppercase tracking-widest drop-shadow-md">FIELD ALERT</h2></div>
          <h1 className="relative z-10 text-8xl md:text-[10rem] font-black text-white uppercase italic leading-none mt-8 text-center" style={{ textShadow: `6px 6px 0px ${SECONDARY_COLOR}` }}>{item.Title}</h1>
          <div className="relative z-10 mt-8 bg-white px-16 py-4 rounded-full shadow-2xl transform rotate-1"><p className="text-4xl md:text-5xl font-black uppercase tracking-wide text-center" style={{ color: PRIMARY_COLOR }}>{item.Description || "LIMITED TIME ONLY!"}</p></div>
        </motion.div>
      </div>
    );
  };


// --- MAIN COMPONENT ---
const TonysBar: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  
  const kickoff = ads.filter(ad => ad.Category === 'Kickoff').length > 0 ? ads.filter(ad => ad.Category === 'Kickoff') : DUMMY_MENU.kickoff;
  const mains = ads.filter(ad => ad.Category === 'Main Event').length > 0 ? ads.filter(ad => ad.Category === 'Main Event') : DUMMY_MENU.main_event;
  const drinks = ads.filter(ad => ad.Category === 'Draft Picks').length > 0 ? ads.filter(ad => ad.Category === 'Draft Picks') : DUMMY_MENU.draft_picks;

  const alertAd = ads.find(ad => ad.Category === 'ALERT' && ad.Status === 'Active');
  const gameActive = ads.some(ad => ad.Category === 'GAME' && ad.Status === 'Active');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (alertAd && !gameActive) {
      if (!audioRef.current) { audioRef.current = new Audio('/airhorn.mp3'); audioRef.current.loop = true; audioRef.current.volume = 0.7; }
      if (audioRef.current.paused) { audioRef.current.play().catch(e => console.log("Audio blocked:", e)); }
    } else {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    }
    return () => { if (audioRef.current) { audioRef.current.pause(); } };
  }, [alertAd, gameActive]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans" style={{ backgroundImage: `url('/italian-tile-bg.png')`, backgroundColor: PRIMARY_COLOR }}>
      {gameActive && <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"><SlotMachine triggerSpin={true} /></div>}
      {alertAd && !gameActive && <FlashSaleOverlay item={alertAd} />}
      <div className="absolute inset-0 bg-black/40 z-0"></div> {/* Simpler overlay */}
      <StadiumFlashEffect />
      <RunningPlayer />

      {/* --- DECORATIVE ASSETS (REMOVED FOOTBALL/BEER FOR CLEANER LOOK) --- */}
      
      {/* --- CONTENT GRID --- */}
      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
        <div className="col-span-12 text-center mb-4 border-b-4 pb-4" style={{ borderColor: SECONDARY_COLOR }}><h1 className="text-6xl font-black uppercase tracking-tighter text-white italic drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">Tony's Bar <span style={{ color: SECONDARY_COLOR }}>& Grill</span></h1></div>
        
        {/* COLUMN 1 */}
        <div className="col-span-4 pt-4"> 
            <div className="p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm" style={{ backgroundColor: `${SECONDARY_COLOR}30`, borderLeft: `4px solid ${SECONDARY_COLOR}` }}><Flame style={{ color: SECONDARY_COLOR }} className="w-8 h-8" /><h2 className="text-3xl font-black text-white uppercase italic drop-shadow-md">Starters</h2></div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">{kickoff.map((item, i) => (<motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-400/50 pb-2"><div className="flex justify-between items-end w-full"><div className="flex items-center gap-2"><Flame style={{ color: SECONDARY_COLOR }} className="w-5 h-5" /><h3 className="text-xl font-bold text-white uppercase drop-shadow-md">{item.Title}</h3></div><span className="text-2xl font-black drop-shadow-md" style={{ color: SECONDARY_COLOR }}>{item.Price}</span></div>{item.Description && <p className="text-slate-100 text-xs font-bold ml-7 drop-shadow-sm">{item.Description}</p>}</motion.div>))}</motion.div>
        </div>
        
        {/* COLUMN 2 */}
        <div className="col-span-4 pt-4 px-6">
            <div className="p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm" style={{ backgroundColor: `${PRIMARY_COLOR}50`, borderLeft: `4px solid ${SECONDARY_COLOR}` }}><UtensilsCrossed style={{ color: SECONDARY_COLOR }} className="w-8 h-8" /><h2 className="text-3xl font-black text-white uppercase italic drop-shadow-md">Italian Classics</h2></div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">{mains.map((item, i) => (<motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-400/50 pb-2"><div className="flex justify-between items-end w-full"><div className="flex items-center gap-2"><UtensilsCrossed style={{ color: SECONDARY_COLOR }} className="w-6 h-6" /><h3 className="text-2xl font-bold text-white uppercase drop-shadow-md">{item.Title}</h3></div><span className="text-3xl font-black drop-shadow-md" style={{ color: SECONDARY_COLOR }}>{item.Price}</span></div>{item.Description && <p className="text-slate-100 text-sm font-bold ml-8 drop-shadow-sm">{item.Description}</p>}</motion.div>))}</motion.div>
        </div>
        
        {/* COLUMN 3 */}
        <div className="col-span-4 pt-4">
            <div className="p-3 mb-4 rounded-l-lg text-right flex items-center justify-end gap-3 backdrop-blur-sm" style={{ backgroundColor: `${SECONDARY_COLOR}30`, borderRight: `4px solid ${SECONDARY_COLOR}` }}><h2 className="text-3xl font-black text-white uppercase italic drop-shadow-md">Libations</h2><Beer style={{ color: SECONDARY_COLOR }} className="w-8 h-8" /></div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5 pb-32">{drinks.map((item, i) => (<motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-400/50 pb-2"><div className="flex justify-between items-end w-full"><div className="flex items-center gap-2"><Beer style={{ color: SECONDARY_COLOR }} className="w-5 h-5" /><h3 className="text-xl font-bold text-white uppercase drop-shadow-md">{item.Title}</h3></div><span className="text-2xl font-black drop-shadow-md" style={{ color: SECONDARY_COLOR }}>{item.Price}</span></div>{item.Description && <p className="text-slate-100 text-xs font-bold text-right drop-shadow-sm">{item.Description}</p>}</motion.div>))}</motion.div>
        </div>
      </div>
    </div>
  );
};

export default TonysBar;
