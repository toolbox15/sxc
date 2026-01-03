import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. DYNAMIC DETECTION: This catches ?ID=TONYSBAR from your screenshot
  const currentURL = window.location.href.toLowerCase();
  const isTireShop = currentURL.includes("tireshop");
  const isTonysBar = currentURL.includes("tonysbar");

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // Determine which tab name to send to the Google Script
    const shopTab = isTireShop ? "tireshop" : isTonysBar ? "tonysbar" : null;

    if (!shopTab) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=${shopTab}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 2. THE TRIGGER: Check for 'ALERT' + 'Active' status
        const alert = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alert || null);

        // 3. THE MENU: Everything else marked 'Active'
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
    // 5-second pulse to check for the Touchdown trigger
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [isTireShop, isTonysBar]);

  // 4. THE THEME SWITCHER
  if (isTireShop) return <TireShopTheme ads={items} />;
  
  if (isTonysBar) {
    if (loading) return <StandbyScreen message="PREPPING THE STATION..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  // 5. THE ERROR SCREEN: Now shows exactly what it sees in the URL
  return (
    <StandbyScreen 
      message={`URL NOT RECOGNIZED. Detected: "${window.location.search}"`} 
    />
  );
};

export default App;
