import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TonysBarTheme = ({ ads, alert }: any) => {
  return (
    <div className="w-full h-screen bg-black text-white font-sans flex flex-col overflow-hidden uppercase">
      
      {/* FULL SCREEN TRIGGER OVERLAY */}
      <AnimatePresence>
        {alert && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-blue-700 flex flex-col items-center justify-center border-[40px] border-white text-center p-10"
          >
            <motion.h1 
              animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.4 }}
              className="text-[12rem] font-black italic leading-none"
            >
              {alert.title}
            </motion.h1>
            <p className="text-6xl font-bold mt-10 bg-white text-blue-700 px-12 py-4">
              {alert.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER: THE BEAR STYLE */}
      <div className="bg-white text-black p-8 border-b-[12px] border-blue-700 flex justify-between items-center">
        <div>
          <h1 className="text-8xl font-black italic tracking-tighter leading-none">TONY'S</h1>
          <p className="text-2xl font-bold tracking-[0.4em] ml-1">CHICAGO • ORIGINAL BEEF</p>
        </div>
        <div className="text-right font-black italic">
          <p className="text-xl text-blue-700">EVERY SECOND COUNTS</p>
          <p className="text-5xl">KITCHEN OPEN</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* MENU LISTING */}
        <div className="w-full h-full p-20 flex flex-col gap-10 bg-[#0a0a0a]">
          {ads.map((item: any, i: number) => (
            <motion.div 
              initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
              key={i} className="flex justify-between items-end border-b-4 border-zinc-900 pb-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-6">
                   <span className="text-blue-700 font-black text-2xl tracking-widest">{item.category}</span>
                   <h2 className="text-6xl font-black italic tracking-tighter">{item.title}</h2>
                </div>
                <p className="text-2xl text-zinc-500 font-bold mt-2 lowercase italic">{item.description}</p>
              </div>
              <div className="text-7xl font-black text-blue-600 ml-10">
                {item.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER TICKER */}
      <div className="bg-zinc-900 py-6 border-t-4 border-white overflow-hidden">
        <motion.div 
          animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap text-4xl font-black italic text-white"
        >
          YES CHEF • CLEAN YOUR STATION • COLLECT THE TICKET • NO GOSSIP • FAMILY MEAL AT 4PM • 
        </motion.div>
      </div>
    </div>
  );
};

export default TonysBarTheme;
