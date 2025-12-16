// StandbyScreen.tsx
import { motion } from 'framer-motion';

export const StandbyScreen = ({ message, subtext }: { message: string, subtext?: string }) => (
  <div className="h-screen w-screen bg-blue-950 flex flex-col items-center justify-center text-white font-sans overflow-hidden relative">
    {/* Animated background pulse */}
    <motion.div 
      className="absolute w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl"
      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    <div className="relative z-10 flex flex-col items-center">
      {/* Your Logo could go here */}
      <div className="w-32 h-32 border-8 border-t-orange-500 border-blue-900 rounded-full animate-spin mb-8" />
      
      <h1 className="text-4xl font-black italic uppercase tracking-widest">{message}</h1>
      {subtext && <p className="mt-4 text-slate-400 font-bold uppercase tracking-wide">{subtext}</p>}
      
      <div className="mt-12 px-6 py-2 border border-slate-700 rounded-full">
        <p className="text-xs text-slate-500 font-mono tracking-tighter">NETWORK STATUS: CONNECTED // WAITING FOR DATA PACKETS</p>
      </div>
    </div>
  </div>
);
