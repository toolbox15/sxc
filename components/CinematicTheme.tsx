import React from 'react';
import { motion } from 'framer-motion';

// --- NEW COLOR PALETTE ---
// Appealing to women & kids: Soft, bright, and cheerful.
// Backgrounds: Cream (bg-orange-50), Soft Pink (bg-pink-50)
// Accents: Teal (teal-500), Coral (rose-400), Sunny Yellow (yellow-400)
// Text: Soft Charcoal (gray-800) instead of harsh black/white

const MenuItem = ({ title, price, description, i }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    // Changed border from dark gray to soft pink
    className="flex justify-between items-start border-b border-pink-200 pb-4 mb-4"
  >
    <div className="flex flex-col">
      {/* Changed text from white to soft charcoal */}
      <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{title}</h3>
      {/* Changed text from gray-400 to gray-500 for better contrast on light bg */}
      <p className="text-gray-500 text-sm font-medium mt-1">{description}</p>
    </div>
    {/* Changed price from yellow to a fun teal */}
    <div className="text-2xl font-bold text-teal-500">{price}</div>
  </motion.div>
);

const CinematicTheme = ({ ads }: any) => {
  const menuItems = ads.filter((ad: any) => ad.Category === 'Main');

  // FALLBACK DATA (Updated with more appealing items)
  const items = menuItems.length > 0 ? menuItems : [
      { Title: "RAINBOW SMOOTHIE BOWL", Price: "$10.50", Description: "Acai, fresh berries, banana, granola, honey" },
      { Title: "SUNSHINE WAFFLE", Price: "$8.00", Description: "Whipped cream, strawberries, sprinkles" },
      { Title: "UNICORN CUPCAKE", Price: "$4.50", Description: "Funfetti cake, pastel buttercream, glitter" },
      { Title: "PINK LEMONADE SLUSH", Price: "$5.00", Description: "Fresh lemon, strawberry puree, crushed ice" },
      { Title: "FRUIT & YOGURT PARFAIT", Price: "$7.00", Description: "Greek yogurt, seasonal fruit, chia seeds" }
  ];

  return (
    // Changed overall background from black to a soft cream
    <div className="flex w-full h-screen bg-orange-50 font-sans overflow-hidden">
      
      {/* LEFT SIDE: VIDEO (50%) */}
      {/* Changed bg from gray-900 to soft pink */}
      <div className="w-1/2 h-full relative overflow-hidden bg-pink-100">
        
        <video 
          className="absolute inset-0 w-full h-full object-cover" // Removed opacity-80 for brighter image
          autoPlay 
          loop 
          muted 
          playsInline
          // NEW POSTER: Bright, colorful fruit
          poster="https://images.unsplash.com/photo-1490474504059-bfbb02a6b034?q=80&w=800&auto=format&fit=crop"
          // NEW VIDEO: Bright, slow-motion colorful food (e.g., macarons or fruit)
          // This is a placeholder; you'd want a bright video of your actual product.
          src="https://cdn.coverr.co/videos/coverr-colorful-macarons-2630/1080p.mp4"
        />

        {/* OVERLAY TEXT */}
        <div className="absolute bottom-12 left-12 max-w-md z-10">
           {/* Changed badge from yellow to coral */}
           <div className="bg-rose-400 text-white font-black text-xs px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-widest shadow-sm">Sweet Treat</div>
           {/* Changed text color and gradient for a fun, vibrant look */}
           <h1 className="text-6xl font-black text-gray-800 leading-none drop-shadow-sm">
             TREAT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-rose-500">YOURSELF</span>
           </h1>
        </div>
        
        {/* Changed shadow gradient from black to a soft white/pink fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* RIGHT SIDE: MENU LIST (50%) */}
      {/* Changed bg from #111 to clean white */}
      <div className="w-1/2 h-full bg-white p-16 flex flex-col justify-center relative">
        
        <div className="relative z-10">
          {/* Changed heading color and border to teal */}
          <h2 className="text-teal-600 font-bold tracking-[0.3em] text-sm mb-8 border-b-2 border-teal-200 inline-block pb-2">FRESH & FAVORITE</h2>
          
          <div className="flex flex-col gap-2">
            {items.map((item: any, i: number) => (
              <MenuItem 
                key={i} 
                i={i}
                title={item.Title} 
                price={item.Price} 
                description={item.Description || "Made with love and fresh ingredients"} 
              />
            ))}
          </div>

          {/* Changed alert box from dark gray to soft blue/teal */}
          <div className="mt-12 p-6 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-4">
             {/* Changed icon bg to coral */}
             <div className="bg-rose-400 h-12 w-12 rounded-full flex items-center justify-center font-black text-white text-2xl">♥</div>
             <div>
                <div className="text-gray-800 font-bold uppercase">Our Promise</div>
                <div className="text-gray-600 text-sm">No artificial flavors. Just real, yummy food!</div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CinematicTheme;
