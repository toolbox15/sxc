import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // 1. DYNAMIC ROUTING FIX
  // We look at the URL bar. If it says ?shop=tireshop, we show data. 
  // If it says ?shop=anythingelse, we show NOTHING.
  const queryParams = new URLSearchParams(window.location.search);
  const currentShopId = queryParams.get('shop') || queryParams.get('screen');

  // 2. DATA MAPPING (Checking for lowercase keys from the API)
  const services = ads.filter((ad: any) => 
    ['service', 'main', 'tires'].includes(String(ad.category || "").toLowerCase())
  );
  
  const promoAd = ads.find((ad: any) => 
    String(ad.category || "").toLowerCase() === 'promo'
  );

  // QR Code Link - Fixed to ensure it finds the data
  const qrLink = promoAd?.link || promoAd?.Link || "https://google.com";
  
  // 3. SECURITY CHECK: If the URL doesn't match, or there's no data, stop the leak.
  if (ads.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <h1 className="text-zinc-800 font-black text-4xl">SYSTEM IDLE // NO DATA FOR: {currentShopId}</h1>
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
              src={promoAd.imageUrl || promoAd.ImageURL} 
              className="w-full h-full object-cover opacity-60" 
              alt="Promotion" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
            
            <div className="absolute bottom-12 left-10 z-20 flex items-end gap-6 w-full pr-20">
                <motion.div className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white shadow-2xl flex-1">
                    <h2 className="text-6xl font-black italic leading-none">{promoAd.title || promoAd.Title}</h2>
                    <p className="text-2xl font-bold mt-4 text-orange-100">{promoAd.description || promoAd.Description}</p>
                </motion.div>

                {/* QR CODE - FIXED VISIBILITY */}
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="bg-white p-4 rounded-xl shadow-2xl mb-2 flex flex-col items-center"
                >
                    <QRCodeSVG value={qrLink} size={120} level="H" />
                    <div className="text-[10px] text-black font-black text-center mt-2 tracking-tighter">SCAN TO CLAIM</div>
                </motion.div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-700 font-bold">NO ACTIVE PROMOTION</div>
        )}
      </div>

      {/* RIGHT SIDE: SERVICE MENU */}
      <div className="w-1/2 h-full p-12 flex flex-col relative bg-[#0a0a0a]">
         <div className="relative z-10 border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-start">
            <div>
                <h1 className="text-8xl font-black italic tracking-tighter leading-none">TIRE</h1>
                <h1 className="text-5xl font-bold text-orange-500 tracking-tighter leading-none mt-1">SERVICES</h1>
            </div>
            <div className="text-right">
                <div className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Est. Wait</div>
                <div className="text-4xl font-mono text-green-500 font-bold">~25 MIN</div>
            </div>
         </div>

         <div className="flex-1 flex flex-col gap-2 relative z-10">
            {services.map((service: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-zinc-800/50">
                    <div className="text-left">
                        <div className="text-2xl font-black tracking-tight">{service.title || service.Title}</div>
                        <div className="text-sm text-zinc-500 lowercase">{service.description || service.Description}</div>
                    </div>
                    <div className="text-3xl font-black text-white px-3 py-1 bg-zinc-900 rounded">{service.price || service.Price}</div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
