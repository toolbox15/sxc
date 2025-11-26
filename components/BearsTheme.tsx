// --- 🏃‍♂️ RUNNING PLAYER (15s Loop + "Halo" Fix) ---
const RunningPlayer = () => {
  return (
    <motion.img
      src="/player-run.gif"
      alt="Running Player"
      // FIXING THE WHITE EDGE:
      // 1. brightness-75 contrast-200: This is the key combination. It crushes mid-tones (the white halo) 
      //    into darkness, making the edge disappear against the dark background.
      // 2. drop-shadow-xl: A slightly tighter shadow than 2xl to help hide edges.
      // 3. mix-blend-overlay + opacity-70: Keeps the "ghostly" blended look.
      className="absolute z-30 w-40 h-auto pointer-events-none brightness-75 contrast-200 drop-shadow-xl opacity-70 mix-blend-overlay"
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
        duration: 5,        // Runs for 5 seconds
        repeat: Infinity,   
        ease: "linear",     
        repeatDelay: 10     // Waits 10 seconds (Total cycle: 15s)
      }}
    />
  );
};
