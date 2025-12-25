import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import BearsTheme from './components/BearsTheme'; 
import FinalMenu from './components/FinalMenu';
import TireShopTheme from './components/TireShopTheme'; // <--- 1. Import your new component
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
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // This filters for "TireShop" when you are on the TireShop URL
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

  // ==========================================
  // THE SWITCHER
  // ==========================================
  if (currentTheme === 'Demo_Bears') {
    return <BearsTheme ads={items} />;
  }

  if (currentTheme === 'FinalMenu') {
    return <FinalMenu items={items} />;
  }

  // 2. This activates your Tire Shop Component
  if (currentTheme === 'TireShop') {
    return <TireShopTheme ads={items} />; 
  }

  // Default fallback
  return <MikesBar ads={items} />;
};

export default App;
