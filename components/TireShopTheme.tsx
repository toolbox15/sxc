import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  const services = ads.filter((ad: any) => ['service', 'tires'].includes(String(ad.category || "").toLowerCase()));
  const promoAd = ads.find((ad: any) => String(ad.category || "").toLowerCase() === 'promo');
  const mechanicImage = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000";

  return (
    <div className="w-full h-screen bg-black text-white font-sans flex flex-col overflow-hidden uppercase">
      <div className="bg-orange-600 py-3 border-b-4 border-white overflow-hidden">
        <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="whitespace-nowrap text-4xl font-black italic">
          {promoAd?.title || "TIRE SPECIALS DAILY"} • FREE ALIGNMENT WITH 4 TIRES • 
        </motion.div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 h-full relative border-r-8 border-orange-600">
          <img src={mechanicImage} className="w-full h-full object-cover opacity-60" alt="Mechanic" />
          <div className="absolute bottom-12 left-8 z-20 flex items-end gap-6 w-full pr-16">
            <div className="bg-orange-600 p-10 rounded-tr-[50px] border-l-[12px] border-white flex-1 shadow-2xl">
              <h2 className="text-7xl font-black italic">{promoAd?.title || "PRO SERVICE"}</h2>
              <p className="text-2xl font-bold">{promoAd?.description || "Expert Care"}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-orange-500 mb-4">
              <QRCodeSVG value={promoAd?.link || "https://google.com"} size={130} />
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full p-16 flex flex-col bg-[#080808]">
           <div className="border-b-4 border-zinc-800 pb-10 mb-10 flex justify-between items-end">
              <h1 className="text-9xl font-black italic leading-none">TIRE <span className="text-orange-500 block text-6xl">SERVICES</span></h1>
              <div className="text-right"><p className="text-sm text-zinc-500">Wait</p><p className="text-5xl font-mono text-green-500">~25 MIN</p></div>
           </div>
           <div className="flex-1 flex flex-col gap-6">
              {services.map((s: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-6 border-b-2 border-zinc-900">
                  <div className="text-left"><p className="text-4xl font-black">{s.title}</p><p className="text-lg text-zinc-500 italic">{s.description}</p></div>
                  <div className="text-5xl font-black text-orange-500 bg-zinc-900 px-8 py-3 rounded-2xl">{s.price}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
