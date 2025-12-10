import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT ALL YOUR THEMES
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';
import StaticGameDayTheme from './StaticGameDayTheme'; // <--- The new one!

const AdDisplay = () => {
  const [ads, setAds] = useState([]);
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); // This reads the "?id=" part of the URL

  useEffect(() => {
    // ⚠️ IMPORTANT: Make sure this URL matches your actual Google Sheet API
    fetch('https://sheetdb.io/api/v1/YOUR_SHEET_ID_HERE') 
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // 2. THE ROUTER LOGIC
  
  // If URL is ?id=Static -> Show the new "No Animation" theme
  if (theme === 'Static') {
    return <StaticGameDayTheme ads={ads} />;
  }
  
  // If URL is ?id=Neon -> Show the animated Sports theme
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={ads} />;
  }

  // If URL is empty or anything else -> Show the Cinematic Theme
  return <CinematicTheme ads={ads} />;
};

export default AdDisplay;
