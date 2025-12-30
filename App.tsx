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
  // 1. GET RAW ID: Keep the space so we can find it in the Google Sheet
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch using the name EXACTLY as it is in the URL (with spaces)
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // FILTER: Check specifically for "Tire Shop" in the data
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
  
  // 2. THE CLEANER: Create a version with NO spaces and lowercase for the "Switch" below
  // "Tire Shop" becomes "tireshop"
  // "TireShop" becomes "tireshop"
  const themeId = currentTheme.toLowerCase().replace(/\s/g, "");

  const commonProps = { items: items, ads: items };

  // ==========================================
  // THE SWITCHER (Now ignores spaces)
  // ==========================================

  if (themeId === 'demo_bears' || themeId === 'tonysbar') {
    return <TonysBar {...commonProps} backgroundImage="/field-bg.png" />; 
  }

  // This will now work for BOTH "?id=TireShop" and "?id=Tire Shop"
  if (themeId === 'tireshop') {
    return <TireShopTheme {...commonProps} />; 
  }

  if (themeId === 'finalmenu') {
    return <FinalMenu {...commonProps} />;
  }

  return <MikesBar {...commonProps} />;
};

export default App;
