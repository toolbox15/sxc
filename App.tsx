import React, { useState, useEffect } from 'react';
import TonysBarTheme from './components/TonysBarTheme';
import { StandbyScreen } from './components/StandbyScreen';

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggerAlert, setTriggerAlert] = useState<any>(null);
  
  const currentURL = window.location.href.toLowerCase();
  const isTonysBar = currentURL.includes("tonysbar");

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!isTonysBar) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=tonysbar&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 1. LOOK FOR ACTIVE ALERTS (Triggers)
        const activeAlert = data.find((ad: any) => 
          String(ad.category).toUpperCase() === 'ALERT' && 
          String(ad.status).toLowerCase() === 'active'
        );
        setTriggerAlert(activeAlert || null);

        // 2. FILTER MENU ITEMS
        const filtered = data.filter((ad: any) => 
          String(ad.status).toLowerCase() === "active" &&
          String(ad.category).toUpperCase() !== 'ALERT'
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
  }, [isTonysBar]);

  if (isTonysBar) {
    if (loading) return <StandbyScreen message="PREPPING THE STATION..." />;
    return <TonysBarTheme ads={items} alert={triggerAlert} />;
  }

  return <StandbyScreen message="WAITING FOR COMMAND..." />;
};

export default App;
