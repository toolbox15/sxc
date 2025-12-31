import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // 1. Data Processing
  const services = ads.filter((ad: any) => 
    ['service', 'main', 'tires'].includes(String(ad.category || "").toLowerCase())
  );
  
  const promoAd = ads.find((ad: any) => 
    String(ad.category || "").toLowerCase() === 'promo'
  );

  const qrLink = promoAd?.link || "https://yourshop.com/deals";
  const promoImage = promoAd?.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200";

  // Dynamic Wait Time Logic
  const waitTimeAd = ads.find((ad: any) => String(ad.title).toUpperCase().includes("WAIT"));
  const displayWaitTime = waitTimeAd ? waitTimeAd.price : "25 MIN";

  return (
    <div className="w-full h-screen bg-[#050505] text-white font-sans flex overflow-hidden selection:bg-orange-500">
      
      {/* LEFT SIDE: HERO AD AREA (60% Width for impact) */}
      <div className="w-[60%] h-full relative overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src={promoImage} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Featured Promotion" 
        />
        
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

        {/* Content Over Image */}
        <div className="absolute inset-0 z-20 p-16 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-orange-600" />
            <span className="text-sm font-black tracking-[0.3em] text-orange-500">EXCLUSIVE OFFER</span>
          </div>

          {promoAd && (
            <div className="max-w-xl">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-8xl font-black italic leading-[0.9] tracking-tighter mb-6"
              >
                {promoAd.title}
              </motion.h2>
              <p className="text-2xl text-zinc-300 font-medium leading-relaxed mb-8 border-l-4 border-orange-600 pl-6">
                {promoAd.description}
              </p>
              
              <div className="flex items-center gap-8">
                <div className="bg-white p-3 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <QRCodeSVG value={qrLink} size={120} level="H" />
                </div>
                <div className="text-left">
                  <p className="text-orange-500 font-black text-xl italic">SCAN TO CLAIM</p>
                  <p className="text-zinc-500 text-sm font-bold tracking-widest mt-1">LIMITED TIME REMAINING</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: PREMIUM SERVICE MENU (40% Width) */}
      <div className="w-[40%] h-full bg-[#0a0a0a] border-l border-zinc-800 p-12 flex flex-col relative">
        {/* Subtle Carbon Fiber Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

        {/* Header with Live Wait Time */}
        <div className="relative z-10 flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-black italic tracking-tighter text-white">SERVICE</h1>
            <h2 className="text-3xl font-bold text-orange-600 -mt-2 tracking-tighter">PRICING</h2>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl backdrop-blur-md text-right min-w-[140px]">
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">Live Wait</span>
            </div>
            <div className="text-3xl font-mono font-bold text-green-500 tabular-nums leading-none">
              {displayWaitTime}
            </div>
          </div>
        </div>

        {/* Service Rows */}
        <div className="flex-1 space-y-4 relative z-10">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 p-5 rounded-2xl transition-all duration-300 flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="text-xl font-black tracking-tight group-hover:text-orange-500 transition-colors uppercase">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 font-medium italic mt-0.5">
                  {service.description || "In-shop professional grade service"}
                </p>
              </div>
              <div className="text-3xl font-black text-white ml-6 tabular-nums">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="relative z-10 mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-zinc-600">
          <div className="flex flex-col gap-1">
            <span>MASTER TECHNICIANS ON SITE</span>
            <span>ASE CERTIFIED REPAIR CENTER</span>
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <span className="text-orange-600">SYSTEM V4.0 // LIVE SYNC</span>
            <span className="opacity-50">REFRESHING IN 60S</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
