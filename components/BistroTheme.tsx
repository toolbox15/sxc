// --- FINAL WHISPY SMOKE COMPONENT (Lighter & Subtler) ---
const SteamEffect = () => {
  // Reduced count slightly for subtlety
  const particles = Array.from({ length: 6 });

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute bottom-0 left-0 w-[300px] h-[40%] pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        const startX = random(50, 200);
        const driftX = random(-30, 30);
        const heightY = random(-150, -300); // Don't go quite as high
        const rotation = random(-90, 90); // Less dramatic twist
        const duration = random(10, 15); // Slower movement
        const delay = random(0, 6);

        return (
          <motion.div
            key={i}
            // CHANGE 1: Thinner width (w-6) and EXTRA blur (blur-2xl)
            // CHANGE 2: Base color is almost invisible (bg-white/5)
            className="absolute bg-white/5 w-6 h-20 rounded-[100%] blur-2xl origin-center"
            initial={{ 
              opacity: 0, 
              scale: 0.4, 
              x: startX, 
              y: 20, 
              rotate: 0 
            }}
            animate={{ 
              // CHANGE 3: Peak opacity is WAY lower (only 0.15) - no more flashlight look
              opacity: [0, 0.15, 0], 
              scale: [0.4, 1.1], // Subtle growth
              y: heightY, 
              x: startX + driftX, 
              rotate: rotation 
            }}
            transition={{ 
              duration: duration,
              repeat: Infinity, 
              delay: delay,
              ease: "easeInOut",
              // CHANGE 4: Fade out very quickly after appearing
              times: [0, 0.3, 0.7] 
            }}
          />
        );
      })}
    </div>
  );
};
