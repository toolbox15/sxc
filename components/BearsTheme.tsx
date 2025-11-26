// --- 🏃‍♂️ RUNNING PLAYER (Blended & 7s Loop) ---
const RunningPlayer = () => {
  return (
    <motion.img
      src="/player-run.gif"
      alt="Running Player"
      // BLENDING FIXES:
      // 1. brightness-75: Darkens the player to match the night stadium lighting.
      // 2. drop-shadow: Adds a heavy black shadow to hide the sharp edges.
      // 3. opacity-90: Slight transparency to let grass texture show through.
      className="absolute z-30 w-40 h-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] pointer-events-none brightness-75 opacity-90"
      initial={{
        left: '10%',   
        bottom: '50px', 
        opacity: 0,
        scaleX: 1 
      }}
      animate={{
        left: ['10%', '85%'], 
        opacity: [0, 1, 1, 0], 
        scale: [0.8, 1.2] 
      }}
      transition={{
        duration: 5,        // The run itself takes 5 seconds (Natural speed)
        repeat: Infinity,   
        ease: "linear",     
        repeatDelay: 2      // Wait 2 seconds. Total Cycle = 7 Seconds.
      }}
    />
  );
};
