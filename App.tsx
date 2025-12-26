import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import TonysBar from './components/TonysBar'; 
import FinalMenu from './components/FinalMenu';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const queryParams = new URLSearchParams(window.location.search);
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Updated fetch to include deviceName for the Health Monitor heartbeat
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Traffic Cop Logic: Filter items for this specific screen
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  
  // If no items are found, the background won't load because there's no data to pull from
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  // ==========================================
  // THE SWITCHER (TRAFFIC COP)
  // ==========================================
  
  if (currentTheme === 'Demo_Bears') {
    // PASSING THE THEME NAME: This allows the component to know which CSS or background to load
    return <TonysBar ads={items} theme={currentTheme} />; 
  }

  if (currentTheme === 'FinalMenu') {
    return <FinalMenu items={items} />;
  }

  if (currentTheme === 'TireShop') {
    return <TireShopTheme ads={items} />; 
  }

  return <MikesBar ads={items} />;
};

export default App;
