/* ... existing imports ... */

const BearsTheme = ({ ads, alert }: { ads: any[], alert: any }) => {
  const kickoff = ads.filter(ad => String(ad.category).toLowerCase() === 'kickoff');
  const mains = ads.filter(ad => String(ad.category).toLowerCase() === 'main event');
  const drinks = ads.filter(ad => String(ad.category).toLowerCase() === 'draft picks');

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center" 
         style={{ backgroundImage: "url('/field-bg.png')" }}>
      
      <div className="absolute inset-0 bg-blue-950/30 z-0"></div>

      {/* 🚨 FLASH SALE OVERLAY */}
      {alert && ( /* ... alert code ... */ )}

      {/* 🍺 BEER GLASS: Flipped (scale-x-[-1]) and Smaller (h-64) */}
      <div className="absolute bottom-4 left-4 z-10">
          <img 
            src="/beer-glass.png" 
            className="h-64 w-auto drop-shadow-2xl" 
            style={{ transform: 'scaleX(-1)' }} 
          />
      </div>

      {/* 🏈 FOOTBALL: Smaller (h-32) in the far bottom-right */}
      <div className="absolute bottom-4 right-4 z-10">
        <motion.img 
          src="/football.png" 
          className="h-32 w-auto drop-shadow-2xl" 
          animate={{ rotate: [0, 5, 0] }} 
          transition={{ duration: 4, repeat: Infinity }} 
        />
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
        {/* ... headers and menu mapping ... */}
      </div>
    </div>
  );
};
