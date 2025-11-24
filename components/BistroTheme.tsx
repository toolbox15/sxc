// --- WHISPY SMOKE COMPONENT (New & Improved!) ---
const SteamEffect = () => {
  // Create 15 whispy trails
  const paths = Array.from({ length: 15 });

  return (
    <div className="absolute bottom-0 left-0 w-[500px] h-[800px] pointer-events-none overflow-hidden z-0">
      {/* <svg> is how we draw curly lines */}
      <svg className="w-full h-full" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        {paths.map((_, i) => {
          // Randomize the start position and curve for each trail
          const startX = Math.random() * 200;
          const curveAmount = Math.random() * 100 + 50;
          const duration = Math.random() * 15 + 15; // Very slow (15-30s)
          const delay = Math.random() * 10;

          return (
            <motion.path
              key={i}
              // This draws a curly line (Bezier curve)
              d={`M${startX} 800 C ${startX + curveAmount} 600, ${startX - curveAmount} 400, ${startX + curveAmount / 2} 0`}
              stroke="white"
              strokeWidth={Math.random() * 3 + 1} // Random thickness
              strokeLinecap="round"
              filter="url(#blurMe)" // Apply the blur filter
              initial={{ opacity: 0, pathLength: 0, y: 100 }}
              animate={{ 
                opacity: [0, 0.4, 0], // Fade in slowly, then out
                pathLength: [0, 1], // Draw the line from bottom to top
                y: -200 // Slowly drift up
              }}
              transition={{ 
                duration: duration,
                repeat: Infinity, 
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
        {/* This is the "blur filter" that makes the lines look like smoke */}
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
