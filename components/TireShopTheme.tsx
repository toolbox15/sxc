import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  const services = ads.filter((ad: any) => ['service', 'tires'].includes(String(ad.category || "").toLowerCase()));
  const promoAd = ads.find((ad: any) => String(ad.category || "").toLowerCase() === 'promo');

  return (
    <div className="w-full h-screen bg-black text-white font-sans flex flex-col overflow-hidden uppercase">
      {/* FLASHING TOP BANNER */}
      <div className="bg-orange-600 overflow-hidden py-2 border-b-4 border-white">
        <motion.div 
          animate={{ x: ["100%", "-100%"] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="whitespace-nowrap text-3xl font-black italic text-white"
        >
          {promoAd?.title || "TIRE SPECIALS DAILY"} • CONTACT US FOR FLEET RATES • FREE ALIGNMENT WITH 4 TIRES • 
        </motion.div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDE: PROMO & QR */}
        <div className="w-1/2 h-full relative border-r-4 border-orange-600 bg-zinc-900">
          {promoAd && (
            <>
              <img src={promoAd.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200"} className="w-full h-full object-cover opacity-40" alt="Promo" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              <div className="absolute bottom-12 left-10 z-20 flex items-end gap-6 w-full pr-20">
                <div className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white flex-1 shadow-2xl">
                  <h2 className="text-6xl font-black italic">{promoAd.title}</h2>
                  <p className="text-2xl font-bold mt-4 text-orange-100">{promoAd.description || "Limited Time Offer"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl flex flex-col items-center shadow-2xl">
                  <QRCodeSVG value={promoAd.link || "https://google.com"} size={120} />
                  <div className="text-[10px] text-black font-black mt-2">SCAN TO CLAIM</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDE: SERVICES & ANIMATED WAIT */}
        <div className="w-1/2 h-full p-12 flex flex-col bg-[#0a0a0a]">
           <div className="border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-8xl font-black italic tracking-tighter leading-none">TIRE</h1>
                <h2 className="text-5xl font-bold text-orange-500 tracking-tighter mt-1">SERVICES</h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Est. Wait</p>
                <motion.p 
                  animate={{ opacity: [1, 0.5, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-4xl font-mono text-green-500 font-bold"
                >
                  ~25 MIN
                </motion.p>
              </div>
           </div>
           <div className="flex-1 flex flex-col gap-4">
              {services.map((service: any, i: number) => (
                <motion.div 
                  initial={{ x: 50, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex justify-between items-center py-4 border-b border-zinc-800/50"
                >
                  <div className="text-left">
                    <p className="text-3xl font-black tracking-tight">{service.title}</p>
                    <p className="text-sm text-zinc-500 lowercase italic">{service.description}</p>
                  </div>
                  <p className="text-4xl font-black text-orange-500 bg-zinc-900 px-5 py-2 rounded">{service.price}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
