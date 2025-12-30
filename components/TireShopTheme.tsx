import React from 'react';
import { motion } from 'framer-motion';

// ... ServiceRow stays the same ...

const TireShopTheme = ({ ads }: any) => {
  const activeAds = ads.filter((ad: any) => {
    const target = String(ad.Target_Screen || "").toLowerCase().replace(/\s/g, "");
    const isActive = ad.Status === true || String(ad.Status).toUpperCase() === "TRUE" || String(ad.Status).toLowerCase() === "active";
    return isActive && target === "tireshop";
  });

  const services = activeAds.filter((ad: any) => ['service', 'main', 'tires'].includes(String(ad.Category || "").toLowerCase()));
  const promoAd = activeAds.find((ad: any) => String(ad.Category || "").toLowerCase() === 'promo');

  // Using your zoomed Unsplash URL as the default
  const defaultTireImage = "https://images.unsplash.com/photo-1642075191572-9992f5f290c2?auto=format&fit=crop&q=80&w=800&h=2000&crop=focalpoint&fp-z=1.5&fp-x=0.5&fp-y=0.5";
  const promoImage = (promoAd && promoAd.ImageURL && String(promoAd.ImageURL).includes("http")) ? promoAd.ImageURL : defaultTireImage;

  return (
    <div className="w-full h-screen bg-zinc-900 text-white font-sans flex overflow-hidden uppercase">
      
      {/* LEFT SIDE: THE AD REVENUE SPACE */}
      <div className="w-1/2 h-full relative border-r-4 border-orange-600">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
        <img src={promoImage} className="w-full h-full object-cover" alt="Ad Space" />
        
        {/* Sponsorship Badge */}
        <div className="absolute top-8 left-8 z-20 bg-white text-black px-4 py-1 font-black text-sm tracking-tighter rounded-sm shadow-xl">
            PARTNER SPOTLIGHT
        </div>

        {promoAd && (
          <div className="absolute bottom-12 left-10 z-20 max-w-[85%]">
              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white shadow-2xl"
              >
                  <h2 className="text-6xl font-black italic leading-none">{promoAd.Title}</h2>
                  <p className="text-2xl font-bold mt-4 text-orange-100">{promoAd.Description}</p>
              </motion.div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: THE OWNER'S FREE MENU */}
      <div className="w-1/2 h-full bg-zinc-950 p-12 flex flex-col relative">
         {/* Carbon Texture */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         
         <div className="relative z-10 border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-start">
            <div>
                <h1 className="text-8xl font-black italic tracking-tighter leading-none">TIRE</h1>
                <h1 className="text-5xl font-bold text-orange-500 tracking-tighter leading-none mt-1">SERVICES</h1>
            </div>
            <div className="text-right bg-zinc-900 border border-zinc-800 p-4 rounded">
                <div className="text-xs text-zinc-500 font-bold tracking-widest">CURRENT WAIT</div>
                <div className="text-4xl font-mono text-green-500 font-bold">~25 MIN</div>
            </div>
         </div>

         <div className="flex-1 flex flex-col gap-2 relative z-10">
            {services.map((service: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-zinc-800/50">
                    <div className="text-left">
                        <div className="text-2xl font-black tracking-tight">{service.Title}</div>
                        <div className="text-sm text-zinc-500 lowercase first-letter:uppercase">{service.Description}</div>
                    </div>
                    <div className="text-3xl font-black text-white px-3 py-1 bg-zinc-900 rounded">{service.Price}</div>
                </div>
            ))}
         </div>

         <div className="relative z-10 mt-auto pt-6 text-zinc-600 text-[10px] tracking-[0.2em] font-bold flex justify-between border-t border-zinc-900">
             <span>ALL WORK ASE CERTIFIED</span>
             <span>POWERED BY AD-NETWORK-V1</span>
         </div>
      </div>

    </div>
  );
};

export default TireShopTheme;
