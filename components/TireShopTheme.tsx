import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // 1. If no data, show the "System Idle" screen
  if (!ads || ads.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <h1 className="text-zinc-800 font-black text-4xl">SYSTEM IDLE // NO DATA FOUND</h1>
      </div>
    );
  }

  // 2. Map data (using lowercase keys from the API)
  const services = ads.filter((ad: any) => 
    ['service', 'main', 'tires'].includes(String(ad.category || "").toLowerCase())
  );
  
  const promoAd = ads.find((ad: any) => 
    String(ad.category || "").toLowerCase() === 'promo'
  );

  const qrLink = promoAd?.link || "https://google.com";
  const promoImage = promoAd?.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="w-full h-screen bg-[#050505] text-white font-sans flex overflow-hidden uppercase">
      {/* LEFT SIDE: PROMO */}
      <div className="w-1/2 h-full relative border-r-4 border-orange-600 bg-zinc-900">
        <img src={promoImage} className="w-full h-full object-cover opacity-40" alt="Promo" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        {promoAd && (
          <div className="absolute bottom-12 left-10 z-20 flex items-end gap-6 w-full pr-20">
            <div className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white flex-1">
              <h2 className="text-6xl font-black italic">{promoAd.title}</h2>
              <p className="text-2xl font-bold mt-4">{promoAd.description}</p>
            </div>
            <div className="bg-white p-4 rounded-xl flex flex-col items-center">
              <QRCodeSVG value={qrLink} size={120} />
              <div className="text-[10px] text-black font-black mt-2">SCAN TO CLAIM</div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: SERVICES */}
      <div className="w-1/2 h-full p-12 flex flex-col bg-[#0a0a0a]">
         <div className="border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-8xl font-black italic tracking-tighter">TIRE</h1>
              <h2 className="text-5xl font-bold text-orange-500 tracking-tighter mt-1">SERVICES</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Est. Wait</p>
              <p className="text-4xl font-mono text-green-500 font-bold">~25 MIN</p>
            </div>
         </div>
         <div className="flex-1 flex flex-col gap-4">
            {services.map((service: any, i: number) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-zinc-800/50">
                <div className="text-left">
                  <p className="text-2xl font-black">{service.title}</p>
                  <p className="text-sm text-zinc-500">{service.description}</p>
                </div>
                <p className="text-3xl font-black">{service.price}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
