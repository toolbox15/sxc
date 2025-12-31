import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // 1. FILTER: We match your specific data: "Active" and "Tire Shop"
  const activeAds = ads.filter((ad: any) => {
    const statusValue = String(ad.status || "").toLowerCase();
    const targetValue = String(ad.target || "").toLowerCase();
    
    // This accepts "Active" AND "Tire Shop" (even with the space)
    return statusValue === "active" && targetValue === "tire shop";
  });

  // 2. DATA SEGMENTATION
  const services = activeAds.filter((ad: any) => 
    ['service', 'tires'].includes(String(ad.category || "").toLowerCase())
  );
  
  const promoAd = activeAds.find((ad: any) => 
    String(ad.category || "").toLowerCase() === 'promo'
  );

  // 3. OFFLINE SCREEN (Matches Snag_ccc40d)
  if (activeAds.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-orange-600 font-black text-7xl italic">OFFLINE</h1>
        <p className="text-zinc-500 font-bold uppercase mt-4">No 'Active' rows for 'Tire Shop' found</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#050505] text-white font-sans flex overflow-hidden uppercase">
      {/* LEFT SIDE: PROMO */}
      <div className="w-1/2 h-full relative border-r-4 border-orange-600 bg-zinc-900">
        {promoAd && (
          <>
            <img src={promoAd.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200"} className="w-full h-full object-cover opacity-40" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
            <div className="absolute bottom-12 left-10 z-20 flex items-end gap-6 w-full pr-20">
              <div className="bg-orange-600 p-8 rounded-tr-3xl border-l-8 border-white flex-1">
                <h2 className="text-6xl font-black italic">{promoAd.title}</h2>
                <p className="text-2xl font-bold mt-4">{promoAd.description || "Limited Time"}</p>
              </div>
              <div className="bg-white p-4 rounded-xl flex flex-col items-center">
                <QRCodeSVG value={promoAd.link || "https://google.com"} size={120} />
                <div className="text-[10px] text-black font-black mt-2">SCAN TO CLAIM</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDE: SERVICES */}
      <div className="w-1/2 h-full p-12 flex flex-col bg-[#0a0a0a]">
         <div className="border-b-2 border-zinc-800 pb-8 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-8xl font-black italic tracking-tighter leading-none">TIRE</h1>
              <h2 className="text-5xl font-bold text-orange-500 tracking-tighter">SERVICES</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 font-bold">EST. WAIT</p>
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
                <p className="text-3xl font-black text-orange-500 bg-zinc-900 px-4 py-1 rounded">{service.price}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
