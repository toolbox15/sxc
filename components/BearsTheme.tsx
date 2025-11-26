// --- 🏃‍♂️ RUNNING PLAYER (Blended & 7s Loop) ---
const RunningPlayer = () => {
  return (
    <motion.img
      src="/player-run.gif"
      alt="Running Player"
      // BLENDING MAGIC:
      // 1. mix-blend-overlay: Makes the grass texture show through him (Cinematic look)
      // 2. opacity-70: Makes him subtle/ghostly.
      // 3. drop-shadow-2xl: Keeps his outline visible so he doesn't vanish.
      className="absolute z-30 w-40 h-auto drop-shadow-2xl pointer-events-none opacity-70 mix-blend-overlay"
      initial={{
        left: '10%',   
        bottom: '50px', 
        opacity: 0,
        scaleX: 1 
      }}
      animate={{
        left: ['10%', '85%'], 
        opacity: [0, 1, 1, 0], // Fades in -> Runs -> Fades Out
        scale: [0.8, 1.2] 
      }}
      transition={{
        duration: 5,        // 5 Seconds of Running
        repeat: Infinity,   
        ease: "linear",     
        repeatDelay: 2      // 2 Seconds Wait. Total Loop = 7 Seconds.
      }}
    />
  );
};
