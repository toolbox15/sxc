import React from 'react';

export default function SuspendedTheme() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-center p-10 font-sans">
      
      {/* Warning Icon */}
      <div className="mb-6 text-red-600 text-9xl">⚠️</div>
      
      <h1 className="text-red-600 text-7xl font-black uppercase mb-6 tracking-tighter">
        Service Suspended
      </h1>
      
      <p className="text-white text-3xl mb-12 max-w-4xl leading-relaxed">
        This display unit has been temporarily disabled due to a billing issue. 
        Please contact your administrator to restore service immediately.
      </p>
      
      <div className="bg-gray-900 p-8 rounded-2xl border-2 border-red-900 shadow-2xl">
        <p className="text-gray-400 uppercase tracking-[0.5em] text-sm mb-4">Support Hotline</p>
        <p className="text-white text-5xl font-black tracking-widest">555-0199</p>
      </div>

    </div>
  );
}
