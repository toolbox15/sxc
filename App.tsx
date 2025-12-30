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
  // We keep the original for the API call, but we will "Clean" it for the Switcher logic
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch using the name exactly as it appears in the URL/Sheet
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // FILTER: Make sure we match the Target_Screen column exactly
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  const commonProps = { items: items, ads: items };

  // ==========================================
  // THE FIX: THE FUZZY SWITCHER
  // ==========================================
  // This turns "Tire Shop" or "Tire%20Shop" into "tireshop" so the 'if' statement works
  const cleanThemeName = currentTheme.toLowerCase().replace(/\s/g, "");

  if (cleanThemeName === 'demo_bears' || cleanThemeName === 'tonysbar') {
    return <TonysBar {...commonProps} backgroundImage="/field-bg.png" />; 
  }

  // This will now catch "Tire Shop" (with space) or "TireShop" (without space)
  if (cleanThemeName === 'tireshop') {
    return <TireShopTheme {...commonProps} />; 
  }

  if (cleanThemeName === 'finalmenu') {
    return <FinalMenu {...commonProps} />;
  }

  return <MikesBar {...commonProps} />;
};

export default App;
