import React, { useEffect, useRef } from 'react'; // Added useRef and useEffect
import { motion } from 'framer-motion';

const MenuItem = ({ title, price, description, i }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    className="flex justify-between items-start border-b border-pink-200 pb-4 mb-4"
  >
    <div className="flex flex-col">
      <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm font-medium mt-1">{description}</p>
    </div>
    <div className="text-2xl font-bold text-teal-500">{price}</div>
  </motion.div>
);

const CinematicTheme = ({ ads }: any) => {
  const menuItems = ads.filter((ad: any) => ad.Category === 'Main');
  
  // 1. THIS IS THE FIX: We grab the video element directly
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 2. FORCE IT TO PLAY: When the screen loads, we manually hit "Play"
    if (videoRef.current) {
        videoRef.current.muted = true; // Force mute again to be safe
        videoRef.current.play().catch(error => {
            console.log("Autoplay prevented:", error);
            // If it fails, at least we see the poster image
        });
    }
  }, []);

  const items = menuItems.length > 0 ? menuItems : [
      { Title: "RAINBOW SMOOTHIE BOWL", Price: "$10.50", Description: "Acai, fresh berries, banana, granola, honey" },
      { Title: "SUNSHINE WAFFLE", Price: "$8.00", Description: "Whipped cream, strawberries, sprinkles" },
      { Title: "UNICORN CUPCAKE", Price: "$4.50", Description: "Funfetti cake, pastel buttercream, glitter" },
      { Title: "PINK LEMONADE SLUSH", Price: "$5.00", Description: "Fresh lemon, strawberry puree, crushed ice" },
      { Title: "FRUIT & YOGURT PARFAIT", Price: "$7.00", Description: "Greek yogurt, seasonal fruit, chia seeds" }
  ];

  return (
    <div className="flex w-full h-screen bg-orange-50 font-sans overflow-hidden">
      
      {/* LEFT SIDE */}
      <div className="w-1/2 h-full relative overflow-hidden bg-pink-100">
        
        <video 
          ref={videoRef} // Attached the reference here
          className="absolute inset-0 w-full h-full object-cover" 
          loop 
          muted // Standard mute
          playsInline // Required for iPhones/iPads
          // POSTER: If video fails, this image shows up instantly
          poster="https://images.unsplash.com/photo-1563729768-6af584641071?q=80&w=800&auto=format&fit=crop"
          // THE VIDEO SOURCE
          src="https://cdn.coverr.co/videos/coverr-colorful-macarons-2630/1080p.mp4"
        />

        <div className="absolute bottom-12 left-12 max-w-md z-10">
           <div className="bg-rose-400 text-white font-black text-xs px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-widest shadow-sm">Sweet Treat</div>
           <h1 className="text-6xl font-black text-gray-800 leading-none drop-shadow-sm">
             TREAT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-rose-500">YOURSELF</span>
           </h1>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 h-full bg-white p-16 flex flex-col justify-center relative">
        <div className="relative z-10">
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
          <div className="mt-12 p-6 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-4">
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
