import React from 'react';
import { motion } from 'framer-motion';

const ServiceRow = ({ title, price, description, delay }: any) => (
  <motion.div 
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="flex justify-between items-center border-b border-gray-700 py-4"
  >
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-white uppercase tracking-wider">{title}</span>
      <span className="text-sm text-gray-400">{description}</span>
    </div>
    <div className="text-3xl font-black text-orange-500">{price}</div>
  </motion.div>
);

const TireShopTheme = ({ ads }: any) => {
  // 1. CLEANING THE DATA: Ignore spaces and caps to match "Tire Shop" vs "TireShop"
  const activeAds = ads.filter((ad: any) => {
    const target = String(ad.Target_Screen || "").toLowerCase().replace(/\s/g, "");
    const isActive = ad.Status === true || String(ad.Status).toUpperCase() === "TRUE" || String(ad.Status).toLowerCase() === "active";
    return isActive && target === "tireshop";
  });

  const services = activeAds.filter((ad: any) => {
    const cat = String(ad.Category || "").toLowerCase();
    return cat === 'service' || cat === 'main' || cat === 'tires';
  });

  const promos = activeAds.filter((ad: any) => {
    const cat = String(ad.Category || "").toLowerCase();
    return cat === 'promo' || cat === 'offer';
  });

  // 2. FALLBACK IMAGE LOGIC: If Column F is empty, use the professional tire photo
  const defaultTireImage = "https://images.unsplash.com/photo-1549175296-48384cead208?q=80&w=1000&auto=format&fit=crop";
  
  const item1 = promos[0] || { 
    Title: "TIRE SHOP SPECIAL", 
    Description: "Check back soon for offers", 
    ImageURL: defaultTireImage 
  };

  const promoImage = item1.ImageURL && item1.ImageURL.trim() !== "" ? item1.ImageURL : defaultTireImage;

  return (
    <div className="w-full h-screen bg-zinc-900 text-white font-sans flex overflow-hidden">
      
      {/* LEFT SIDE: PROMOS */}
      <div className="w-1/2 h-full relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
            src={promoImage} 
            className="w-full h-full object-cover" 
            alt="Promo" 
            onError={(e: any) => e.target.src = defaultTireImage} // Final safety net
        />
        
        <div className="absolute bottom-10 left-10 z-20 bg-orange-600/90 p-6 rounded-r-xl border-l-8 border-white">
            <h2 className="text-5xl font-black italic uppercase">{item1.Title}</h2>
            <p className="text-2xl font-bold mt-2">{item1.Description}</p>
        </div>
      </div>

      {/* RIGHT SIDE: SERVICE MENU */}
      <div className="w-1/2 h-full bg-zinc-900 p-10 flex flex-col relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
         
         <div className="relative z-10 border-b-4 border-orange-500 pb-4 mb-8 flex justify-between items-end">
            <h1 className="text-6xl font-black italic tracking-tighter">SERVICE <span className="text-gray-500">MENU</span></h1>
            <div className="text-right">
                <div className="text-xs text-gray-400 font-bold">EST. WAIT TIME</div>
                <div className="text-2xl font-mono text-green-400">45 MIN</div>
            </div>
         </div>

         <div className="flex-1 flex flex-col gap-2 relative z-10 overflow-y-auto">
            {services.map((service: any, i: number) => (
                <ServiceRow 
                    key={i} 
                    title={service.Title} 
                    price={service.Price} 
                    description={service.Description || "Quality Service Guaranteed"} 
                    delay={i * 0.1} 
                />
            ))}
         </div>

         <div className="relative z-10 mt-auto bg-gray-800 p-4 rounded text-center border border-gray-700">
             <span className="text-orange-500 font-bold">SHOP UPDATE:</span> Master Mechanics on duty.
         </div>
      </div>

    </div>
  );
};

export default TireShopTheme;
