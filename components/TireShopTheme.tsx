import React from 'react';
import { motion } from 'framer-motion';

const ServiceRow = ({ title, price, description, delay }: any) => (
  <motion.div 
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="flex justify-between items-center border-b border-gray-700 py-4"
  >
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-white uppercase tracking-wider">{title}</span>
      <span className="text-sm text-gray-400">{description}</span>
    </div>
    <div className="text-3xl font-black text-orange-500">{price}</div>
  </motion.div>
);

const TireShopTheme = ({ ads }: any) => {
  // 1. Filter for ACTIVE ads only (Handles Checkbox TRUE/false)
  // 2. Filter for THIS specific screen (Target_Screen === 'Tire Shop')
  const activeAds = ads.filter((ad: any) => 
    (ad.Status === true || ad.Status === 'TRUE') && 
    ad.Target_Screen === 'Tire Shop'
  );

  // Filter Categories from the active pool
  const services = activeAds.filter((ad: any) => ad.Category === 'Service' || ad.Category === 'Tires');
  const promos = activeAds.filter((ad: any) => ad.Category === 'Promo' || ad.Category === 'Offer');

  // Dummy Data if Sheet is Empty or nothing is checked
  const item1 = promos[0] || { 
    Title: "BUY 3 TIRES", 
    Description: "GET 1 FREE", 
    ImageURL: "https://images.unsplash.com/photo-1578844251758-2f71da645217?auto=format&fit=crop&w=800&q=80" 
  };

  const serviceList = services.length > 0 ? services : [
      { Title: "Synthetic Oil Change", Description: "Up to 5 Quarts + Filter", Price: "$69.99" },
      { Title: "Tire Rotation", Description: "Free with Brake Inspection", Price: "$29.99" },
      { Title: "Brake Pad Special", Description: "Front or Rear Axle", Price: "$149.99" },
      { Title: "Alignment", Description: "4-Wheel Computerized", Price: "$89.99" }
  ];

  return (
    <div className="w-full h-screen bg-zinc-900 text-white font-sans flex overflow-hidden">
      
      {/* LEFT SIDE: PROMOS (Visuals) */}
      <div className="w-1/2 h-full relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src={item1.ImageURL} className="w-full h-full object-cover" alt="Promo" />
        
        <div className="absolute bottom-10 left-10 z-20 bg-orange-600/90 p-6 rounded-r-xl border-l-8 border-white">
            <h2 className="text-5xl font-black italic uppercase">{item1.Title}</h2>
            <p className="text-2xl font-bold mt-2">{item1.Description}</p>
        </div>

        {/* TRUST BADGE */}
        <div className="absolute top-10 left-10 z-20 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
            <div className="text-orange-500 font-black text-xl">ASE CERTIFIED</div>
            <div className="text-xs text-gray-300">MASTER MECHANICS ON DUTY</div>
        </div>
      </div>

      {/* RIGHT SIDE: SERVICE MENU (List) */}
      <div className="w-1/2 h-full bg-zinc-900 p-10 flex flex-col relative">
         {/* Background pattern */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
         
         <div className="relative z-10 border-b-4 border-orange-500 pb-4 mb-8 flex justify-between items-end">
            <h1 className="text-6xl font-black italic tracking-tighter">SERVICE <span className="text-gray-500">MENU</span></h1>
            <div className="text-right">
                <div className="text-xs text-gray-400 font-bold">EST. WAIT TIME</div>
                <div className="text-2xl font-mono text-green-400">45 MIN</div>
            </div>
         </div>

         <div className="flex-1 flex flex-col gap-2 relative z-10">
            {serviceList.map((service: any, i: number) => (
                <ServiceRow 
                    key={i} 
                    title={service.Title} 
                    price={service.Price} 
                    description={service.Description || "Quality Service Guaranteed"} 
                    delay={i * 0.1} 
                />
            ))}
         </div>

         <div className="relative z-10 mt-auto bg-gray-800 p-4 rounded text-center border border-gray-700">
             <span className="text-orange-500 font-bold">SHOP UPDATE:</span> We are currently hiring technicians. Apply at front desk.
         </div>
      </div>

    </div>
  );
};

export default TireShopTheme;
