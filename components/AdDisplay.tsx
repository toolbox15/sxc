import React from 'react';
import BearsTheme from './BearsTheme';
import MikesBar from './MikesBar';
import TonysBar from './TonysBar'; // <--- NEW THEME ADDED
import ChristmasTheme from './ChristmasTheme';
import NeonGameDayTheme from './NeonGameDayTheme';
import BistroTheme from './BistroTheme';
import CinematicTheme from './CinematicTheme';
import SpaceMenu from './SpaceMenu';
import FinalMenu from './FinalMenu';

function AdDisplay() {
  // For now, use hardcoded values to test
  const ads = []; // Empty array for testing
  const theme = 'TonysBar'; // <--- ⭐️ SWITCH TO THIS NAME TO DISPLAY THE THEME
  
  // Simple theme router
  switch (theme) {
    case 'Bears':
      return <BearsTheme ads={ads} />;
    case 'MikesBar':
      return <MikesBar ads={ads} />;
    case 'TonysBar': // <--- NEW CASE ADDED
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
