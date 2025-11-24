// --- FINAL WHISPY SMOKE COMPONENT ---
const SteamEffect = () => {
  // Only 8 particles for a "small amount"
  const particles = Array.from({ length: 8 });

  // Helper to get random numbers easily
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    // Container: Constrained to bottom-left, only 40% height of screen
    <div className="absolute bottom-0 left-0 w-[300px] h-[40%] pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        // Generate unique random values for each particle
        const startX = random(50, 200); // Start somewhere in the left corner
        const driftX = random(-50, 50); // Drift left or right slightly
        const heightY = random(-200, -350); // How high it goes (negative is up)
        const rotation = random(-180, 180); // Twist left or right
        const duration = random(8, 12); // Slow rise
        const delay = random(0, 5);

        return (
          <motion.div
            key={i}
            // The Look: Elongated oval, very subtle white, medium blur
            className="absolute bg-white/20 w-8 h-16 rounded-full blur-lg origin-center"
            initial={{ 
              opacity: 0, 
              scale: 0.2, 
              x: startX, 
              y: 50, // Start just below view
              rotate: 0 
            }}
            animate={{ 
              opacity: [0, 0.4, 0], // Fade in then OUT quickly
              scale: [0.5, 1.5], // Grow wispy
              y: heightY, // Move up to the dissipation point
              x: startX + driftX, // Drift sideways
              rotate: rotation // <-- THE SECRET SAUCE: Slow twisting creates the "curl" look
            }}
            transition={{ 
              duration: duration,
              repeat: Infinity, 
              delay: delay,
              ease: "easeInOut",
              times: [0, 0.4, 1] // Fade out way before it finishes moving up
            }}
          />
        );
      })}
    </div>
  );
};
