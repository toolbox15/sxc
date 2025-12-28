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
        // HEARTBEAT: Updates the health monitor in your spreadsheet
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // TRAFFIC COP: Filters for the specific screen
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  // These props ensure data is passed as both 'items' and 'ads' to prevent breaking backgrounds
  const commonProps = { items: items, ads: items };

  // ==========================================
  // THE SWITCHER
  // ==========================================

  if (currentTheme === 'Demo_Bears') {
    // If Column G is empty, this tells the component to look in the /public folder
    return <TonysBar {...commonProps} publicBackground="/bears-bg.jpg" />; 
  }

  if (currentTheme === 'FinalMenu') {
    return <FinalMenu {...commonProps} />;
  }

  if (currentTheme === 'TireShop') {
    return <TireShopTheme {...commonProps} />; 
  }

  return <MikesBar {...commonProps} />;
};

export default App;
