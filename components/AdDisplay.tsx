import React from 'react';
// Adding the .tsx extension to all imports inside the components folder to resolve build errors
import BearsTheme from './BearsTheme.tsx';
import MikesBar from './MikesBar.tsx';
import TonysBar from './TonysBar.tsx';
import ChristmasTheme from './ChristmasTheme.tsx';
import NeonGameDayTheme from './NeonGameDayTheme.tsx';
import BistroTheme from './BistroTheme.tsx';
import CinematicTheme from './CinematicTheme.tsx';
import SpaceMenu from './SpaceMenu.tsx';
import FinalMenu from './FinalMenu.tsx';

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
  Color?: string;
}

// --- PROPS DEFINITION ---
interface AdDisplayProps {
    themeName?: string; // Optional prop to specify the theme
    ads?: AdItem[];     // Optional prop for the advertisements
}

function AdDisplay({ themeName, ads = [] }: AdDisplayProps) {
  
  // 🔑 CHANGE: Setting the default theme to 'FinalMenu' (your Game Day theme)
  const theme = themeName || 'FinalMenu'; 
  
  // Simple theme router
  switch (theme) {
    case 'Bears':
      return <BearsTheme ads={ads} />;
    case 'MikesBar':
      return <MikesBar ads={ads} />;
    case 'TonysBar': 
      return <TonysBar ads={ads} />;
    case 'Christmas':
      return <ChristmasTheme ads={ads} />;
    case 'Neon':
      return <NeonGameDayTheme ads={ads} />;
    case 'Bistro':
      return <BistroTheme ads={ads} />;
    case 'Cinematic':
      return <CinematicTheme ads={ads} />;
    case 'Space':
      return <SpaceMenu ads={ads} />;
    case 'FinalMenu': // Also check the name explicitly, just in case.
      return <FinalMenu ads={ads} />;
    default:
      // Setting FinalMenu as the ultimate fallback
      return <FinalMenu ads={ads} />; 
  }
}

export default AdDisplay;
