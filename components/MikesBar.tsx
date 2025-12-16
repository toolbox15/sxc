// MikesBar.tsx - Giant Confetti + Live Stream + Stability

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Beer } from 'lucide-react';
// Assuming SlotMachine is in the same component directory
import { SlotMachine } from './SlotMachine'; 

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
  Color?: string;
  Target_Screen?: string; 
  Video_URL?: string; 
}

// --- 1. DEFAULT DATA FALLBACKS ---
const defaultKickoffItems: AdItem[] = [
    { Title: "CLASSIC SLIDERS", Price: "$9.00", Description: "Three juicy mini burgers with cheese.", Category: "Kickoff" },
    { Title: "PREMIUM NACHOS", Price: "$12.00", Description: "Loaded with cheese, jalapenos, and sour cream.", Category: "Kickoff" },
    { Title: "PRETZEL BITES", Price: "$8.50", Description: "Served with warm cheese sauce and spicy mustard.", Category: "Kickoff" },
    { Title: "LOADED FRIES", Price: "$7.00", Description: "Crispy fries topped with bacon and cheddar.", Category: "Kickoff" },
];

const defaultMainItems: AdItem[] = [
    { Title: "THE ALL-STAR BURGER", Price: "$15.00", Description: "1/2 lb patty, fried onions, signature sauce.", Category: "The Main Event" },
    { Title: "CHICKEN CAESAR WRAP", Price: "$11.00", Description: "Grilled chicken, crisp romaine, house dressing.", Category: "The Main Event" },
    { Title: "PHILLY CHEESESTEAK", Price: "$13.50", Description: "Shaved steak, peppers, onions, provolone on a hoagie.", Category: "The Main Event" },
    { Title: "PULLED PORK SANDWICH", Price: "$12.00", Description: "Smoked pork with BBQ sauce and coleslaw.", Category: "The Main Event" },
];

const defaultDrinkItems: AdItem[] = [
    { Title: "IPA DRAFT", Price: "$7.50", Description: "Ask your server for today's selection.", Category: "Draft Picks" },
    { Title: "DOMESTIC BOTTLE", Price: "$5.00", Description: "Bud Light, Miller Lite, Coors Light.", Category: "Draft Picks" },
    { Title: "BLOODY MARY", Price: "$8.00", Description: "Spicy mix with a celery stick and lime.", Category: "Draft Picks" },
    { Title: "HOUSE MARGARITA", Price: "$9.50", Description: "Classic lime, served on the rocks.", Category: "Draft Picks" },
    { Title: "PREMIUM LAGER", Price: "$7.00", Description: "Imported or craft lager selection.", Category: "Draft Picks" },
];

// --- 🎥 LIVE STREAM OVERLAY COMPONENT ---
const LiveStreamOverlay = ({ item }: { item: AdItem }) => {
  const getYoutubeId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(item.Video_URL || "");
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&mute=1` 
    : item.Video_URL; 

  return (
    <div className="absolute inset-0 z-[150] bg-black flex flex-col">
      {/* Broadcast Header */}
      <div className="h-20 bg-blue-950 border-b-4 border-orange-600 flex items-center justify-between px-8 shadow-lg z-10">
        <div className="flex items-center gap-4 animate-pulse">
            <div className="w-5 h-5 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444]"></div>
            <h2 className="text-white text-3xl font-black tracking-widest uppercase italic">LIVE BROADCAST</h2>
        </div>
        <h3 className="text-orange-500 font-bold text-2xl uppercase tracking-wide">{item.Title}</h3>
      </div>

      {/* Video Container */}
      <div className="flex-grow relative w-full h-full bg-black">
        {videoId ? (
            <iframe 
                width="100%" 
                height="100%" 
                src={embedUrl} 
                title="Live Stream" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-white gap-4">
                <p className="text-3xl font-bold text-orange-600">WAITING FOR SIGNAL...</p>
                <p className="text-xl text-slate-400">Please check the URL in Google Sheets</p>
            </div>
        )}
      </div>
      
      {/* Ticker */}
      <div className="h-14 bg-orange-600 flex items-center overflow-hidden whitespace-nowrap border-t-4 border-white">
        <motion.div 
            className="text-white text-xl font-black uppercase tracking-widest italic"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            {item.Description || "Welcome to Mike's Bar - Enjoy the game! - Ask your server about our drink specials - TOUCHDOWN! -"}
        </motion.div>
      </div>
    </div>
  );
};

// --- 🚨 SIREN IMAGE COMPONENT ---
const SirenImage = () => {
  return (
    <div className="relative z-50">
      <img src="/siren.png" alt="Siren" className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl" />
      <motion.div className="absolute inset-0 bg-red-500 mix-blend-hard-light rounded-t-full opacity-0" style={{ clipPath: "inset(10% 20% 40% 20%)" }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-600 blur-3xl rounded-full" animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
};

// --- 🎉 CONFETTI ENGINE (UPDATED: GIANT SIZE) ---
const ConfettiEffect = () => {
  const particles = Array.from({ length: 120 }); // Slightly fewer particles to prevent lag with larger size
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[50]">
      {particles.map((_, i) => (
        <motion.div 
          key={i} 
          // UPDATED: Changed w-6 h-6 to w-10 h-10 and added md:w-14 md:h-14 for big screens
          className="absolute w-10 h-10 md:w-14 md:h-14 bg-white opacity-90 shadow-lg" 
          initial={{ 
            y: -150, 
            x: `${random(0, 100)}vw`, 
            opacity: 1, 
            // UPDATED: Scale range increased (0.5 to 2.5) for depth perception
            scale: random(0.5, 2.5), 
            rotate: random(0, 360) 
          }} 
          animate={{ 
            y: '120vh', 
            x: `calc(${random(0, 100)}vw + ${random(-300, 300)}px)`, 
            opacity: 0, 
            rotate: random(180, 720) 
          }} 
          transition={{ 
            duration: random(2.5, 6), // Slower fall for larger "paper" feel
            ease: "easeOut", 
            repeat: Infinity, 
            delay: random(0, 2) 
          }} 
          style={{ backgroundColor: ['#FFD700', '#FFFFFF', '#FF8C00', '#0057B8'][Math.floor(random(0, 4))] }} 
        />
      ))}
    </div>
  );
};

// --- ANIMATION SETTINGS ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } } };

// --- 🍺 BUBBLES EFFECT ---
const BubblesEffect = () => {
  const bubbles = Array.from({ length: 30 }); 
  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  return (
    <div className="absolute bottom-[80px] left-[30px] w-[100px] h-[220px] pointer-events-none overflow-hidden z-20 opacity-50">
      {bubbles.map((_, i) => (
        <motion.div key={i} className="absolute bg-white rounded-full" style={{ width: random(2, 5), height: random(2, 5), left: `${random(5, 95)}%` }} initial={{ y: 220, opacity: 0 }} animate={{ y: -20, opacity: [0, 1, 0], x: random(-3, 3) }} transition={{ duration: random(2, 4), repeat: Infinity, delay: random(0, 5), ease: "linear" }} />
      ))}
    </div>
  );
};

// --- STADIUM FLASH EFFECT ---
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

// --- 🏃‍♂️ RUNNING PLAYER ---
const RunningPlayer = () => {
  return (<motion.img src="/player-run.gif" alt="Running Player" className="absolute z-30 w-40 h-auto pointer-events-none brightness-90 contrast-125 drop-shadow-2xl opacity-100" initial={{ left: '10%', bottom: '50px', opacity: 0, scaleX: 1 }} animate={{ left: ['10%', '85%'], opacity: [0, 1, 1, 0], scale: [0.8, 1.2] }} transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 10 }} />);
};

// --- 🚨 FLASH SALE OVERLAY ---
const FlashSaleOverlay = ({ item }: { item: AdItem }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md">
      {/* Confetti added here */}
      <ConfettiEffect />
      <motion.div className="absolute inset-0 bg-orange-600/30 blur-3xl" animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 0.5, repeat: Infinity }} />
      
      <motion.div 
        className="relative z-10 w-[90%] max-w-5xl bg-blue-950 rounded-3xl border-[6px] border-white flex flex-col items-center p-12 mt-10" 
        initial={{ scale: 0, rotate: -5, boxShadow: '0 0 20px rgba(234, 88, 12, 0.8)' }} 
        animate={{ 
            scale: 1, 
            rotate: 0,
            boxShadow: [ '0 0 100px rgba(234, 88, 12, 0.8)', '0 0 80px rgba(0, 87, 184, 0.7)', '0 0 100px rgba(234, 88, 12, 0.8)' ] 
        }} 
        transition={{ type: "spring", bounce: 0.5, boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20"><div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#ea580c_20px,#ea580c_40px)]"></div></div>
        <div className="absolute -top-16 -left-12 z-50"><SirenImage /></div>
        <div className="absolute -top-16 -right-12 z-50"><SirenImage /></div>
        <div className="absolute -top-10 bg-orange-600 text-white px-10 py-4 rounded-xl border-4 border-white shadow-lg transform -rotate-1 z-20"><h2 className="text-4xl font-black italic uppercase tracking-widest drop-shadow-md">FIELD ALERT</h2></div>
        
        <motion.h1 
          className="relative z-10 text-9xl md:text-[12rem] font-extrabold text-white uppercase leading-none mt-8 text-center tracking-tighter"
          animate={{ 
            textShadow: [
              '8px 8px 0px #0057B8, 12px 12px 0px #ea580c', 
              '8px 8px 0px #0057B8, 12px 12px 20px #FFFFFF', 
              '8px 8px 0px #0057B8, 12px 12px 0px #ea580c', 
            ] 
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.Title}
        </motion.h1>
        
        <div className="relative z-10 mt-8 bg-white px-16 py-4 rounded-full shadow-2xl transform rotate-1"><p className="text-blue-950 text-4xl md:text-5xl font-black uppercase tracking-wide text-center">{item.Description || "LIMITED TIME ONLY!"}</p></div>
      </motion.div>
    </div>
  );
};


// --- MAIN MIKE'S BAR COMPONENT ---
const MikesBar: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
    
    // 1. ALERT LOGIC
    const alertAd = ads.find(ad => 
        ad.Category === 'ALERT' && 
        ad.Status === 'Active' &&
        (ad.Target_Screen === 'MikesBar' || !ad.Target_Screen) 
    );

    // 2. GAME LOGIC
    const gameActive = ads.some(ad => 
        ad.Category === 'GAME' && 
        ad.Status === 'Active' &&
        (ad.Target_Screen === 'MikesBar' || !ad.Target_Screen)
    );

    // 3. LIVE BROADCAST LOGIC
    const liveAd = ads.find(ad => 
        (ad.Category === 'LIVE' || ad.Category === 'BROADCAST') && 
        ad.Status === 'Active' &&
        (ad.Target_Screen === 'MikesBar' || !ad.Target_Screen)
    );

    // --- 4. MENU FILTERING ---
    const menuAds = ads.filter(ad => !['ALERT', 'GAME', 'LIVE', 'BROADCAST'].includes(ad.Category));

    // Kickoff
    const sheetKickoff = menuAds.filter(ad => ad.Category === 'Kickoff');
    const kickoffItems = sheetKickoff.length > 0 ? sheetKickoff : defaultKickoffItems;

    // The Main Event
    const sheetMains = menuAds.filter(ad => ad.Category === 'The Main Event');
    const mainItems = sheetMains.length > 0 ? sheetMains : defaultMainItems;
    
    // Draft Picks
    const sheetDrinks = menuAds.filter(ad => ad.Category === 'Draft Picks');
    const drinkItems = sheetDrinks.length > 0 ? sheetDrinks : defaultDrinkItems;

    // --- 5. AUDIO LOGIC ---
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Only play siren if Alert is active, AND Game is not active, AND Live Stream is not active
        if (alertAd && !gameActive && !liveAd) {
            if (!audioRef.current) { audioRef.current = new Audio('/airhorn.mp3'); audioRef.current.loop = true; audioRef.current.volume = 0.7; }
            if (audioRef.current.paused) { audioRef.current.play().catch(e => console.log("Audio blocked:", e)); }
        } else {
            if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
        }
        return () => { if (audioRef.current) { audioRef.current.pause(); } };
    }, [alertAd, gameActive, liveAd]);

    // --- RENDER FUNCTION ---
    return (
        <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans" style={{ backgroundImage: "url('/field-bg.png')" }}>
            
            {/* PRIORITY 1: Slot Machine Overlay */}
            {gameActive && <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"><SlotMachine triggerSpin={true} /></div>}
            
            {/* PRIORITY 2: Alert Overlay */}
            {alertAd && !gameActive && !liveAd && <FlashSaleOverlay item={alertAd} />}

            {/* PRIORITY 3: Live Broadcast Overlay */}
            {liveAd && !gameActive && !alertAd && <LiveStreamOverlay item={liveAd} />}
            
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-blue-950/10 to-blue-950/20 z-0"></div>
            <StadiumFlashEffect />
            <RunningPlayer />

            {/* --- DECORATIVE ASSETS --- */}
            <div className="absolute bottom-[-30px] left-[-5px] z-10">
                <div className="absolute bottom-[40px] left-[50px] w-[150px] h-[30px] bg-black/60 blur-xl rounded-full pointer-events-none"></div>
                <BubblesEffect />
                <img src="/beer-glass.png" alt="Beer Glass" className="h-[350px] w-auto drop-shadow-2xl" />
            </div>

            <div className="absolute bottom-[10px] right-[20px] z-10">
                <div className="absolute bottom-[15px] left-[20px] w-[120px] h-[25px] bg-black/60 blur-xl rounded-full pointer-events-none"></div>
                <motion.img src="/football.png" className="h-[250px] w-auto drop-shadow-2xl" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
                <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
                    <h1 className="text-6xl font-black uppercase tracking-tighter text-white italic drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
                        Game Day <span className="text-orange-500">Specials</span>
                    </h1>
                </div>
                
                {/* Kickoff Items */}
                <div className="col-span-4 pl-40 pt-4">
                    <div className="bg-orange-600/30 border-l-4 border-orange-500 p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm">
                        <Flame className="text-orange-500 w-8 h-8" />
                        <h2 className="text-3xl font-black text-white uppercase italic drop-shadow-md">Kickoff</h2>
                    </div>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
                        {kickoffItems.map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600/50 pb-2">
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-2">
                                        <Flame className="text-orange-600 w-5 h-5" />
                                        <h3 className="text-xl font-bold text-white uppercase drop-shadow-md">{item.Title}</h3>
                                    </div>
                                    <span className="text-2xl font-black text-orange-500 drop-shadow-md">{item.Price}</span>
                                </div>
                                {item.Description && <p className="text-slate-100 text-xs font-bold ml-7 drop-shadow-sm">{item.Description}</p>}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                
                {/* Main Event Items */}
                <div className="col-span-4 pt-4 px-6">
                    <div className="bg-blue-950/40 border-l-4 border-white p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm">
                        <UtensilsCrossed className="text-white w-8 h-8" />
                        <h2 className="text-3xl font-black text-white uppercase italic drop-shadow-md">The Main Event</h2>
                    </div>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
                        {mainItems.map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600/50 pb-2">
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-2">
                                        <UtensilsCrossed className="text-orange-600 w-6 h-6" />
                                        <h3 className="text-2xl font-bold text-white uppercase drop-shadow-md">{item.Title}</h3>
                                    </div>
                                    <span className="text-3xl font-black text-orange-500 drop-shadow-md">{item.Price}</span>
                                </div>
                                {item.Description && <p className="text-slate-100 text-sm font-bold ml-8 drop-shadow-sm">{item.Description}</p>}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                
                {/* Draft Picks Items */}
                <div className="col-span-4 pr-32 pt-4">
                    <div className="bg-orange-600/30 border-r-4 border-orange-500 p-3 mb-4 rounded-l-lg text-right flex items-center justify-end gap-3 backdrop-blur-sm">
                        <h2 className="text-3xl font-black text-white uppercase italic drop-shadow-md">Draft Picks</h2>
                        <Beer className="text-orange-500 w-8 h-8" />
                    </div>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5 pb-32">
                        {drinkItems.map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600/50 pb-2">
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-2">
                                        <Beer className="text-orange-600 w-5 h-5" />
                                        <h3 className="text-xl font-bold text-white uppercase drop-shadow-md">{item.Title}</h3>
                                    </div>
                                    <span className="text-2xl font-black text-orange-500 drop-shadow-md">{item.Price}</span>
                                </div>
                                {item.Description && <p className="text-slate-100 text-xs font-bold text-right drop-shadow-sm">{item.Description}</p>}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MikesBar;
