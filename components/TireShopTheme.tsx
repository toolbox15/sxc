import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // 1. FILTER LOGIC: Matches Column I (Status) and Column K (Target)
  const activeAds = ads.filter((ad: any) => {
    // Accepts "Active", "active", or "ACTIVE" from Column I
    const isActive = String(ad.status || "").toLowerCase() === "active";
    
    // Converts "Tire Shop" from Column K into "tireshop" to match your URL
    const cleanTarget = String(ad.target || "").toLowerCase().replace(/\s/g, "");
    const isForThisShop = cleanTarget === "tireshop";

    return isActive && isForThisShop;
  });

  // 2. DATA SEGMENTATION
  const services = activeAds.filter((ad: any) => 
    ['service', 'main', 'tires'].includes(String(ad.category || "").toLowerCase())
  );
  
  const promoAd = activeAds.find((ad: any) => 
    String(ad.category || "").toLowerCase() === 'promo'
  );

  // 3. OFFLINE HANDLER: Shows if no ads pass the filter above
  if (activeAds.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
        <motion.h1 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-orange-600 font-black text-7xl mb-4 italic tracking-tighter"
        >
          OFFLINE
        </motion.h1>
        <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm">
          Check Master Hub 'tireshop' tab for Active data
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#050505] text-white font-sans flex overflow-hidden uppercase">
      
      {/* LEFT SIDE: PROMO & QR CODE */}
      <div className="w-1/2 h-full relative border-r-4 border-orange-600 bg-zinc-900">
        {promoAd ? (
          <>
            <img 
              src={promoAd.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200"} 
              className="w-full h-full object-cover opacity-50" 
              alt="Promotion" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            
            <div className="absolute bottom-12 left-10 z-20 flex items-end gap-6 w-full pr-20">
                <div className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white shadow-2xl flex-1">
                    <h2 className="text-6xl font-black italic leading-none">{promoAd.title}</h2>
                    <p className="text-2xl font-bold mt-4 text-orange-100">{promoAd.description || "Special Offer"}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-2xl mb-2 flex flex-col items-center">
                    <QRCodeSVG value={promoAd.link || "https://google.com"} size={130} level="H" />
                    <div className="text-[10px] text-black font-black text-center mt-2 tracking-tighter">SCAN TO CLAIM</div>
                </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-800 font-black text-4xl">PROMO AREA</div>
        )}
      </div>

      {/* RIGHT SIDE: SERVICE MENU */}
      <div className="w-1/2 h-full p-12 flex flex-col relative bg-[#0a0a0a]">
         <div className="relative z-10 border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-end">
            <div>
                <h1 className="text-8xl font-black italic tracking-tighter leading-none">TIRE</h1>
                <h1 className="text-5xl font-bold text-orange-500 tracking-tighter leading-none mt-1">SERVICES</h1>
            </div>
            <div className="text-right pb-2">
                <div className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Est. Wait</div>
                <div className="text-4xl font-mono text-green-500 font-bold tracking-tighter">~25 MIN</div>
            </div>
         </div>

         <div className="flex-1 flex flex-col gap-2 relative z-10">
            {services.map((service: any, i: number) => (
                <motion.div 
                  initial={{ x: 20, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex justify-between items-center py-5 border-b border-zinc-800/50"
                >
                    <div className="text-left">
                        <div className="text-3xl font-black tracking-tight leading-none">{service.title}</div>
                        <div className="text-sm text-zinc-500 lowercase mt-1 italic">{service.description}</div>
                    </div>
                    <div className="text-4xl font-black text-orange-500 px-4 py-2 bg-zinc-900 rounded tabular-nums border border-zinc-800">
                      {service.price}
                    </div>
                </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
