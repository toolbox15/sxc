// --- 🚨 BROADCAST OVERLAY (Heads-Up Display) ---
const FlashSaleOverlay = ({ message }: { message: string }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden">
      
      {/* 1. THE TINTED GLASS (Semi-Transparent Background) */}
      {/* bg-blue-950/85 means "Navy Blue at 85% opacity". You can see the menu behind it! */}
      <motion.div 
        className="absolute inset-0 bg-blue-950/85 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* 2. THE PULSING "BREAKING NEWS" STRIPES */}
      <div className="absolute w-full h-[300px] bg-orange-600/20 -skew-y-3"></div>
      <div className="absolute w-full h-[300px] bg-white/5 skew-y-3"></div>

      {/* 3. THE FLOATING CONTENT BOX */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center p-12 border-y-8 border-orange-500 bg-black/60 w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        {/* Flashing Header */}
        <motion.h2 
          className="text-5xl font-black text-white italic uppercase tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          🚨 FIELD ALERT 🚨
        </motion.h2>

        {/* The Deal (From Google Sheet) */}
        <h1 className="text-8xl font-black text-orange-500 uppercase drop-shadow-xl text-center leading-tight">
          {message}
        </h1>

        {/* Subtext */}
        <p className="text-white text-2xl mt-6 font-bold uppercase tracking-widest bg-blue-800 px-6 py-2 rounded-full">
          Limited Time Only!
        </p>
      </motion.div>

      {/* 4. THE RUNNING PLAYER (Runs across the FOREGROUND) */}
      <motion.div
        className="absolute bottom-[50px] w-auto h-auto z-30"
        initial={{ left: '-20%' }}
        animate={{ left: '120%' }} 
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <img 
          src="/player-run.gif"
          alt="Runner"
          className="h-80 w-auto brightness-0 invert drop-shadow-2xl" // Made him white/silhouette to pop against dark overlay
        />
      </motion.div>

    </div>
  );
};
