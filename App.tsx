import React, { useState } from 'react';
import { MenuBoard } from './components/MenuBoard';
import { AIControl } from './components/AIControl';
import { DEFAULT_MENU } from './constants';
import { MenuItem } from './types';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU);
  // Swapped to a new rustic coffee background
  const [bgImage, setBgImage] = useState<string>("https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.65) contrast(1.1)',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <MenuBoard items={menuItems} />
      </div>

      {/* AI Control Panel (Floating) */}
      <div className="fixed bottom-6 right-6 z-20">
        <AIControl onUpdateMenu={setMenuItems} onUpdateBg={setBgImage} />
      </div>
    </div>
  );
}