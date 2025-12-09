import React from 'react';
import { motion } from 'framer-motion';

const MenuItem = ({ title, price, description, i }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4"
  >
    <div className="flex flex-col">
      <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm font-medium mt-1">{description}</p>
    </div>
    <div className="text-2xl font-bold text-yellow-500">{price}</div>
  </motion.div>
);

const CinematicTheme = ({ ads }: any) => {
  // Filter for "Main" items to list on the right
  const menuItems = ads.filter((ad: any) => ad.Category === 'Main');

  // FALLBACK DATA (If sheet is empty)
  const items = menuItems.length > 0 ? menuItems : [
      { Title: "DOUBLE SMASH BURGER", Price: "$12.50", Description: "Two patties, american cheese, house sauce" },
      { Title: "CRISPY CHICKEN SANDWICH", Price: "$11.00", Description: "Buttermilk fried, spicy mayo, pickles" },
      { Title: "TRUFFLE FRIES", Price: "$6.50", Description: "Parmesan, white truffle oil, parsley" },
      { Title: "VANILLA BEAN SHAKE", Price: "$5.50", Description: "Real madagascar vanilla, whipped cream" },
      { Title: "SPICY CHEESE CURDS", Price: "$7.00", Description: "Wisconsin cheddar, jalapeño ranch" }
  ];

  return (
    <div className="flex w-full h-screen bg-black font-sans overflow-hidden">
      
      {/* LEFT SIDE: THE VIDEO LOOP (50% Width) */}
      <div className="w-1/2 h-full relative overflow-hidden bg-gray-900">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          autoPlay 
          loop 
          muted 
          playsInline
          // FREE STOCK FOOTAGE OF BURGER (Replace with client video later)
          src="https://videos.pexels.com/video-files/2988214/2988214-uhd_2560_1440_30fps.mp4"
        />
        {/* Overlay Text */}
        <div className="absolute bottom-12 left-12 max-w-md">
           <div className="bg-yellow-500 text-black font-black text-xs px-2 py-1 inline-block mb-2 uppercase tracking-widest">Featured</div>
           <h1 className="text-6xl font-black text-white leading-none shadow-black drop-shadow-xl">
             TASTE THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">PREMIUM</span>
           </h1>
        </div>
      </div>

      {/* RIGHT SIDE: THE MENU LIST (50% Width) */}
      <div className="w-1/2 h-full bg-[#111] p-16 flex flex-col justify-center relative">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-gray-500 font-bold tracking-[0.3em] text-sm mb-8 border-b-2 border-yellow-500 inline-block pb-2">SIGNATURE MENU</h2>
          
          <div className="flex flex-col gap-2">
            {items.map((item: any, i: number) => (
              <MenuItem 
                key={i} 
                i={i}
                title={item.Title} 
                price={item.Price} 
                description={item.Description || "Delicious and fresh made to order"} 
              />
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center gap-4">
             <div className="bg-yellow-500 h-12 w-12 rounded-full flex items-center justify-center font-black text-black text-xl">!</div>
             <div>
                <div className="text-white font-bold uppercase">Allergy Notice</div>
                <div className="text-gray-400 text-xs">Please inform staff of any peanut allergies.</div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CinematicTheme;
