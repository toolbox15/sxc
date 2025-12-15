import React from 'react';
// Adding the .tsx extension to all imports inside the components folder to resolve build errors
import BearsTheme from './BearsTheme.tsx';
import MikesBar from './MikesBar.tsx';
import TonysBar from './TonysBar.tsx'; // Fixed import for the new theme
import ChristmasTheme from './ChristmasTheme.tsx';
import NeonGameDayTheme from './NeonGameDayTheme.tsx';
import BistroTheme from './BistroTheme.tsx';
import CinematicTheme from './CinematicTheme.tsx';
import SpaceMenu from './SpaceMenu.tsx';
import FinalMenu from './FinalMenu.tsx';

function AdDisplay() {
  // For now, use hardcoded values to test
  const ads = []; // Empty array for testing
  const theme = 'TonysBar'; // This is set to display the new theme for testing
  
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
