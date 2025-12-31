import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TireShopTheme = ({ ads }: any) => {
  // Separate services from the promo row
  const services = ads.filter((ad: any) => ['service', 'tires'].includes(String(ad.category || "").toLowerCase()));
  const promoAd = ads.find((ad: any) => String(ad.category || "").toLowerCase() === 'promo');

  // Mechanic image for the promo area
  const mechanicImage = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="w-full h-screen bg-black text-white font-sans flex flex-col overflow-hidden uppercase">
      {/* FLASHING TOP BANNER */}
      <div className="bg-orange-600 overflow-hidden py-3 border-b-4 border-white">
        <motion.div 
          animate={{ x: ["100%", "-100%"] }} 
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="whitespace-nowrap text-4xl font-black italic text-white"
        >
          TIRE SPECIALS DAILY • {promoAd?.title || "BUY 3 GET 1 FREE"} • FREE ALIGNMENT WITH 4 TIRES • 
        </motion.div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDE: MECHANIC & QR CODE */}
        <div className="w-1/2 h-full relative border-r-8 border-orange-600 bg-zinc-900">
          <img src={mechanicImage} className="w-full h-full object-cover opacity-60" alt="Mechanic" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
          
          <div className="absolute bottom-12 left-8 z-20 flex items-end gap-6 w-full pr-16">
            <div className="bg-orange-600 p-10 rounded-tr-[50px] border-l-[12px] border-white flex-1 shadow-2xl">
              <h2 className="text-7xl font-black italic leading-none mb-2">{promoAd?.title || "SUMMER SALE"}</h2>
              <p className="text-3xl font-bold text-orange-100">{promoAd?.description || "Huge Discounts on All Tires"}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-2xl flex flex-col items-center border-4 border-orange-500 mb-4">
              <QRCodeSVG value={promoAd?.link || "https://google.com"} size={140} />
              <div className="text-xs text-black font-black mt-3">SCAN FOR DEALS</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SERVICES LIST */}
        <div className="w-1/2 h-full p-16 flex flex-col bg-[#080808]">
           <div className="border-b-4 border-zinc-800 pb-10 mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-9xl font-black italic tracking-tighter leading-none">TIRE</h1>
                <h2 className="text-6xl font-black text-orange-500 tracking-tighter mt-2">SERVICES</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500 font-black tracking-widest uppercase">Est. Wait</p>
                <p className="text-6xl font-mono text-green-500 font-bold">~25 MIN</p>
              </div>
           </div>

           <div className="flex-1 flex flex-col gap-6">
              {services.map((service: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-6 border-b-2 border-zinc-900">
                  <div className="text-left">
                    <p className="text-4xl font-black tracking-tight mb-1">{service.title}</p>
                    <p className="text-lg text-zinc-500 italic uppercase">{service.description}</p>
                  </div>
                  <div className="text-5xl font-black text-orange-500 bg-zinc-900 border-2 border-zinc-800 px-8 py-3 rounded-2xl">
                    {service.price}
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TireShopTheme;
