import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT YOUR THEMES
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';
// 🚨 LINE 8 FIX: This import requires the file to be named "StaticGameDayTheme.tsx"
import StaticGameDayTheme from './StaticGameDayTheme'; 

const AdDisplay = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); // Reads the "?id=Static" from URL

  // 2. HARDCODED BACKUP DATA
  // This ensures the menu works even if Google Sheets is disconnected.
  const backupAds = [
    { Category: 'Main', Title: 'TEST NACHOS', Price: '$14.99', ImageURL: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d' },
    { Category: 'Main', Title: 'TEST WINGS', Price: '$12.99', ImageURL: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f' },
    { Category: 'Main', Title: 'TEST BURGER', Price: '$16.99', ImageURL: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' }
  ];

  // 3. THE ROUTER LOGIC
  console.log("Current Theme requested:", theme);

  // If URL is .../?id=Static
  if (theme === 'Static') {
    return <StaticGameDayTheme ads={backupAds} />;
  }
  
  // If URL is .../?id=Neon (The animated one)
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={backupAds} />;
  }

  // Default Fallback (Cinematic)
  return <CinematicTheme ads={backupAds} />;
};

export default AdDisplay;
