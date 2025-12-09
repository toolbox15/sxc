import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- THEME: "SUNSHINE & SORBET" (Women & Kids) ---
// Colors: Cream, Pink, Teal, Coral.

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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // FORCE PLAY: Bypasses browser autoplay blocking
    if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  const items = menuItems.length > 0 ? menuItems : [
      { Title: "RAINBOW SMOOTHIE BOWL", Price: "$10.50", Description: "Acai, fresh berries, banana, granola, honey" },
      { Title: "SUNSHINE WAFFLE", Price: "$8.00", Description: "Whipped cream, strawberries, sprinkles" },
      { Title: "UNICORN CUPCAKE", Price: "$4.50", Description: "Funfetti cake, pastel buttercream, glitter" },
      { Title: "PINK LEMONADE SLUSH", Price: "$5.00", Description: "Fresh lemon, strawberry puree, crushed ice" },
      { Title: "FRUIT & YOGURT PARFAIT", Price: "$7.00", Description: "Greek yogurt, seasonal fruit, chia seeds" }
  ];

  // --- VIDEO OPTIONS (Swap these URLs if one breaks) ---
  // Option 1: Pink Donuts/Sweets (Matches the theme perfectly)
  const VIDEO_URL = "https://videos.pexels.com/video-files/4947936/4947936-uhd_2560_1440_25fps.mp4";
  
  // Option 2: Ice Cream Scoop (Backup)
  // const VIDEO_URL = "https://videos.pexels.com/video-files/4688176/4688176-uhd_3840_2160_25fps.mp4";

  return (
    <div className="flex w-full h-screen bg-orange-50 font-sans overflow-hidden">
      
      {/* LEFT SIDE: VIDEO */}
      <div className="w-1/2 h-full relative overflow-hidden bg-pink-100">
        
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover" 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1563729768-6af584641071?q=80&w=800&auto=format&fit=crop"
          src={VIDEO_URL} // Using the new reliable link variable
        />

        <div className="absolute bottom-12 left-12 max-w-md z-10">
           <div className="bg-rose-400 text-white font-black text-xs px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-
