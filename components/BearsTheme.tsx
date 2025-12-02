// --- 🎉 SUPER-SIZED CONFETTI ENGINE (RESTORED) ---
const ConfettiEffect = () => {
  // Create 150 particles
  const particles = Array.from({ length: 150 });
  
  // Randomizer helper
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[50]">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white"
          // Initial position: Start above the screen (-10% top), random left position (0-100%)
          initial={{ 
            y: -100, 
            x: `${random(0, 100)}vw`, 
            opacity: 1, 
            scale: random(0.5, 1.2),
            rotate: random(0, 360) 
          }}
          // Animate to: Fall down (120vh), drift left/right, fade out
          animate={{ 
            y: '120vh', 
            x: `calc(${random(0, 100)}vw + ${random(-200, 200)}px)`,
            opacity: 0,
            rotate: random(180, 720) 
          }}
          // Physics: Random duration (2-5s) so they don't fall all at once
          transition={{ 
            duration: random(2, 5), 
            ease: "easeOut", 
            repeat: Infinity, // Loop it so it never stops raining during the sale
            delay: random(0, 2) 
          }}
          // Random Colors: Gold, White, Orange, Blue (Mike's Colors)
          style={{
            backgroundColor: ['#FFD700', '#FFFFFF', '#FF8C00', '#0057B8'][Math.floor(random(0, 4))]
          }}
        />
      ))}
    </div>
  );
};
