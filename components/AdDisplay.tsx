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

// --- DATA STRUCTURE (Moved from theme files for clarity, assuming it's shared) ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
  Color?: string;
}

// 🔑 CRITICAL FIX: Add props to accept the theme name and ads data
// The component should accept props like 'themeName' and 'ads'
interface AdDisplayProps {
    themeName?: string; // Optional prop to specify the theme
    ads?: AdItem[];     // Optional prop for the advertisements
}

// Change the function signature to accept props
function AdDisplay({ themeName, ads = [] }: AdDisplayProps) {
  
  // --- THE FIX ---
  // 1. Remove the hardcoded 'TonysBar' line.
  // 2. Use the 'themeName' prop if provided.
  // 3. Fall back to a default theme (e.g., 'Bears' or 'FinalMenu') if no prop is provided.
  const theme = themeName || 'Bears'; // Default to 'Bears' for safety, but better to be passed in.
  
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
    default:
      return <FinalMenu ads={ads} />;
  }
}

export default AdDisplay;
