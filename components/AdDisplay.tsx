import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. IMPORT ALL YOUR THEMES
import CinematicTheme from './CinematicTheme';
import GameDayTheme from './GameDayTheme';
import StaticGameDayTheme from './StaticGameDayTheme';

const AdDisplay = () => {
  // Initialize with an empty array to prevent crashes
  const [ads, setAds] = useState([]); 
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('id'); 

  useEffect(() => {
    // ⚠️ REPLACE THIS WITH YOUR REAL ID IF YOU HAVE IT
    // If you don't have it right now, this fake one will fail gracefully 
    // and show your hard-coded "backup" menu items (Nachos/Wings) instead of a white screen.
    const SHEET_ID = 'YOUR_SHEET_ID_HERE'; 

    fetch(`https://sheetdb.io/api/v1/${SHEET_ID}`) 
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // SAFETY CHECK: Only set ads if we actually got a list (Array)
        if (Array.isArray(data)) {
          setAds(data);
        } else {
          console.warn("API returned invalid data, using backup items.");
        }
      })
      .catch((error) => console.log('Using backup data (API Error or Invalid ID)'));
  }, []);

  // 2. THE ROUTER LOGIC
  
  // Pass the "ads" data to the themes. 
  // If "ads" is empty, the themes will automatically use their own backup data.

  if (theme === 'Static') {
    return <StaticGameDayTheme ads={ads} />;
  }
  
  if (theme === 'Neon' || theme === 'Sports') {
    return <GameDayTheme ads={ads} />;
  }

  return <CinematicTheme ads={ads} />;
};

export default AdDisplay;
