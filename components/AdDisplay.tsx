import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT YOUR THEMES
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';
import SpaceMenu from './SpaceMenu'; // <--- NEW FILE IMPORT

const AdDisplay = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); 

  // 2. HARDCODED BACKUP DATA
  const backupAds = [
    { Category: 'Main', Title: 'TEST NACHOS', Price: '$14.99', ImageURL: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d' },
    { Category: 'Main', Title: 'TEST WINGS', Price: '$12.99', ImageURL: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f' },
    { Category: 'Main', Title: 'TEST BURGER', Price: '$16.99', ImageURL: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' }
  ];

  console.log("Current Theme requested:", theme);

  // 3. ROUTER LOGIC
  
  // If URL is .../?id=Static -> Load the NEW SpaceMenu file
  if (theme === 'Static') {
    return <SpaceMenu ads={backupAds} />;
  }
  
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={backupAds} />;
  }

  return <CinematicTheme ads={backupAds} />;
};

export default AdDisplay;
