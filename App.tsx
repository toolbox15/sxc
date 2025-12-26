import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import TonysBar from './components/TonysBar'; 
import FinalMenu from './components/FinalMenu';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. GET THE ID
  // If no ID is in the URL, default to 'MikesBar'. 
  // Change 'MikesBar' to 'Demo_Bears' here if you want Tony's to be the default.
  const queryParams = new URLSearchParams(window.location.search);
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  // 2. THE GOOGLE SCRIPT URL
  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We include deviceName so the script knows which TV is checking in (Heartbeat)
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 3. FILTER THE DATA
        // We only keep rows where Target_Screen matches our current ID
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        
        console.log(`Loaded ${filtered.length} items for ${currentTheme}`); // Helpful for debugging
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Connection Error:", err);
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  
  // If the sheet is empty or filtering failed, show standby
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  // ==========================================
  // THE TRAFFIC COP (SWITCHER)
  // ==========================================
  
  // CASE 1: TONY'S BEARS
  if (currentTheme === 'Demo_Bears') {
    // FIX: Passing BOTH 'items' and 'ads' to ensure the component finds the data 
    // and the background image, no matter how TonysBar.tsx is written.
    return <TonysBar items={items} ads={items} />; 
  }

  // CASE 2: BURGER JOINT
  if (currentTheme === 'FinalMenu') {
    return <FinalMenu items={items} />;
  }

  // CASE 3: TIRE SHOP
  if (currentTheme === 'TireShop') {
    return <TireShopTheme ads={items} />; 
  }

  // DEFAULT: MIKE'S BAR
  return <MikesBar ads={items} />;
};

export default App;
