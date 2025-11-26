// --- 🏃‍♂️ RUNNING PLAYER (15 Second Loop) ---
const RunningPlayer = () => {
  return (
    <motion.img
      src="/player-run.gif"
      alt="Running Player"
      // BLENDING: mix-blend-overlay + 70% Opacity + Drop Shadow (As requested)
      className="absolute z-30 w-40 h-auto drop-shadow-2xl pointer-events-none opacity-70 mix-blend-overlay"
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
        duration: 5,        // He runs for 5 Seconds
        repeat: Infinity,   
        ease: "linear",     
        repeatDelay: 10     // He waits for 10 Seconds. (Total Cycle = 15s)
      }}
    />
  );
};
