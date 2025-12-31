import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // If the API sends an error message or empty array
  if (!ads || ads.length === 0 || ads[0].title.includes("Error")) {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-orange-600 font-black text-6xl mb-4 italic">OFFLINE</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest">
          {ads?.[0]?.title || "Check Master Hub 'tireshop' tab for data"}
        </p>
      </div>
    );
  }

  // Filter ads (Target_Screen in your sheet is column K)
  // We make it case-insensitive to avoid the "Tire Shop" vs "tireshop" bug
  const activeAds = ads.filter((ad: any) => 
    String(ad.status).toLowerCase() === "active"
  );

  const services = activeAds.filter((ad: any) => 
    ['service', 'main', 'tires'].includes(String(ad.category || "").toLowerCase())
  );
  
  const promoAd = activeAds.find((ad: any) => 
    String(ad.category || "").toLowerCase() === 'promo'
  );

  return (
    <div className="w-full h-screen bg-[#050505] text-white font-sans flex overflow-hidden uppercase">
      {/* LEFT: PROMO SECTION */}
      <div className="w-1/2 h-full relative border-r-4 border-orange-600 bg-zinc-900 overflow-hidden">
        {promoAd && (
          <>
            <img src={promoAd.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200"} 
                 className="w-full h-full object-cover opacity-50" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
            <div className="absolute bottom-12 left-10 z-20 flex items-end gap-6 w-full pr-20">
              <div className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white flex-1 shadow-2xl">
                <h2 className="text-6xl font-black italic">{promoAd.title}</h2>
                <p className="text-2xl font-bold mt-4">{promoAd.description || "Limited Time Offer"}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-2xl">
                <QRCodeSVG value={promoAd.link || "https://google.com"} size={120} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* RIGHT: SERVICE MENU */}
      <div className="w-1/2 h-full p-12 flex flex-col bg-[#0a0a0a]">
         <div className="border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-8xl font-black italic tracking-tighter leading-none">TIRE</h1>
              <h2 className="text-5xl font-bold text-orange-500 tracking-tighter mt-1 leading-none">SERVICES</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 font-bold uppercase">Est. Wait</p>
              <p className="text-4xl font-mono text-green-500 font-bold tracking-tighter">~25 MIN</p>
            </div>
         </div>

         <div className="flex-1 flex flex-col gap-2">
            {services.map((service: any, i: number) => (
              <div key={i} className="flex justify-between items-center py-5 border-b border-zinc-800/50">
                <div className="text-left">
                  <p className="text-3xl font-black tracking-tight">{service.title}</p>
                  <p className="text-sm text-zinc-500 lowercase italic">{service.description}</p>
                </div>
                <p className="text-4xl font-black bg-zinc-900 px-5 py-2 rounded text-orange-500">{service.price}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
