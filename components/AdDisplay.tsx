import React from 'react';
import { useSearchParams } from 'react-router-dom';

// Import your themes
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';
import StaticGameDayTheme from './StaticGameDayTheme';

const AdDisplay = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id');

  // 1. HARDCODED DATA (No Fetching, No API Errors)
  const backupAds = [
    { Category: 'Main', Title: 'TEST NACHOS', Price: '$10.00', ImageURL: '' },
    { Category: 'Main', Title: 'TEST WINGS', Price: '$12.00', ImageURL: '' },
    { Category: 'Main', Title: 'TEST BURGER', Price: '$15.00', ImageURL: '' }
  ];

  console.log("Current Theme:", theme); // This prints to the console for debugging

  // 2. FORCE THE THEME LOAD
  if (theme === 'Static') {
    return <StaticGameDayTheme ads={backupAds} />;
  }
  
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={backupAds} />;
  }

  // Default
  return <CinematicTheme ads={backupAds} />;
};

export default AdDisplay;
