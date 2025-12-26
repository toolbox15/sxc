import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import TonysBar from './components/TonysBar'; 
import FinalMenu from './components/FinalMenu';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. URL IDENTIFIER
  const queryParams = new URLSearchParams(window.location.search);
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 2. THE HEARTBEAT 
        // We pass deviceName to the script. This updates "Last_Seen" in your Devices tab.
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 3. THE TRAFFIC COP FILTER
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // 30-second refresh
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  // ==========================================
  // THE SWITCHER (TRAFFIC COP)
  // ==========================================

  // TONY'S BAR (Demo_Bears)
  if (currentTheme === 'Demo_Bears') {
    return <TonysBar items={items} ads={items} />; 
  }

  // BURGER JOINT (FinalMenu)
  if (currentTheme === 'FinalMenu') {
    return <FinalMenu items={items} ads={items} />;
  }

  // TIRE SHOP
  if (currentTheme === 'TireShop') {
    return <TireShopTheme items={items} ads={items} />; 
  }

  // DEFAULT (MIKE'S BAR)
  return <MikesBar items={items} ads={items} />;
};

export default App;
