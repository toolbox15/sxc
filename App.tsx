import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. UNIVERSAL FIX: Search the whole URL for "tonysbar" or "tireshop"
  const fullUrl = window.location.href.toLowerCase();
  const shopId = fullUrl.includes("tonysbar") ? "tonysbar" : (fullUrl.includes("tireshop") ? "tireshop" : "");

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch data based on whatever name was found in the URL
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Check for 'ALERT' + 'Active' (Touchdown Trigger)
        const touchdown = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(touchdown || null);

        // Filter for active menu items
        const menu = data.filter((row: any) => 
          String(row.status).toLowerCase() === "active" &&
          String(row.category).toUpperCase() !== 'ALERT'
        );
        
        setItems(menu);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [shopId]);

  // 2. THEME SELECTOR
  if (shopId === 'tonysbar') {
    if (loading) return <StandbyScreen message="THE BEAR: PREPPING STATION..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  if (shopId === 'tireshop') {
    return <TireShopTheme ads={items} />;
  }

  // 3. DEBUG: If you see this, the word "tonysbar" is missing from your URL
  return (
    <StandbyScreen 
      message={`VER 5.0 LIVE. URL DETECTED: ${window.location.search}`} 
    />
  );
};

export default App;
