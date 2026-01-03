import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. DETECTION: Look for the word in the URL regardless of format
  const fullUrl = window.location.href.toLowerCase();
  const isTony = fullUrl.includes("tonysbar");
  const isTire = fullUrl.includes("tireshop");
  
  const shopId = isTony ? "tonysbar" : (isTire ? "tireshop" : "");
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Touchdown Trigger Logic
        const alertTrigger = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        // Menu Logic
        const filtered = data.filter((row: any) => 
          String(row.status).toLowerCase() === "active" &&
          String(row.category).toUpperCase() !== 'ALERT'
        );
        
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [shopId]);

  if (isTony) {
    if (loading) return <StandbyScreen message="PREPPING THE STATION..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  if (isTire) return <TireShopTheme ads={items} />;

  // This message confirms if your update worked
  return (
    <StandbyScreen 
      message={`FIX INSTALLED. I see URL: ${window.location.href} but no shop name found.`} 
    />
  );
};

export default App;
