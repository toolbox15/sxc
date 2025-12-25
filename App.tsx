import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import BearsTheme from './components/BearsTheme'; 
import FinalMenu from './components/FinalMenu';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const queryParams = new URLSearchParams(window.location.search);
  // This looks at the URL (e.g., ?id=Demo_Bears) to decide which screen to show
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // The fetch includes the currentTheme so the "Heartbeat" script knows this screen is alive
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // This filters the master list for only the items belonging to this specific screen
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  // ==========================================
  // THE TRAFFIC COP (SWITCHER)
  // ==========================================
  
  // 1. Logic for Tony's Bears
  if (currentTheme === 'Demo_Bears') {
    return <BearsTheme ads={items} />;
  }

  // 2. Logic for Burger Joint
  if (currentTheme === 'FinalMenu') {
    return <FinalMenu items={items} />;
  }

  // 3. Logic for Tire Shop
  if (currentTheme === 'TireShop') {
    return <TireShopTheme ads={items} />; 
  }

  // Default fallback (Mike's Bar)
  return <MikesBar ads={items} />;
};

export default App;
