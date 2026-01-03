import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. BRUTE FORCE DETECTION: convert entire URL to lowercase
  const fullUrl = window.location.href.toLowerCase();
  
  // 2. Simple "Yes/No" Checks
  const isTony = fullUrl.indexOf('tonysbar') > -1;
  const isTire = fullUrl.indexOf('tireshop') > -1;

  // 3. Determine active shop ID
  const shopId = isTony ? 'tonysbar' : (isTire ? 'tireshop' : '');

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
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [shopId]);

  // --- ROUTING ---
  if (isTony) {
    if (loading) return <StandbyScreen message="PREPPING THE STATION..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  if (isTire) return <TireShopTheme ads={items} />;

  // --- DEBUG SCREEN (UPDATED) ---
  // If you don't see "v3.0" on your screen, the code hasn't updated!
  return (
    <StandbyScreen 
      message={`v3.0 ERROR: URL NOT RECOGNIZED. I see: ${window.location.href}`} 
    />
  );
};

export default App;
