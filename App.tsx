import React, { useState, useEffect } from 'react';
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. DETECT TONYSBAR: This matches the "?ID=TONYSBAR" in your screenshot
  const currentURL = window.location.href.toLowerCase();
  const isTonysBar = currentURL.includes("tonysbar");

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!isTonysBar) return;

    const fetchData = async () => {
      try {
        // Fetch from the tonysbar tab
        const response = await fetch(`${SCRIPT_URL}?shop=tonysbar&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 2. TRIGGER LOGIC: Look for 'ALERT' category
        const touchdown = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(touchdown || null);

        // 3. FILTER MENU: Show all other Active items
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
    // Refresh every 5 seconds to catch the Touchdown trigger instantly
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [isTonysBar]);

  // 4. ROUTING LOGIC: If tonysbar is in URL, show it.
  if (isTonysBar) {
    if (loading) return <StandbyScreen message="PREPPING THE STATION..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  // If URL is wrong, show what the app actually sees
  return (
    <StandbyScreen 
      message={`URL NOT RECOGNIZED. Detected: "${window.location.search}"`} 
    />
  );
};

export default App;
