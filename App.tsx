import React, { useState, useEffect } from 'react';
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. DETECT TONYSBAR: This looks for "tonysbar" anywhere in the URL
  const currentURL = window.location.href.toLowerCase();
  const isTonysBar = currentURL.includes("tonysbar");

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!isTonysBar) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch data specifically from the tonysbar tab
        const response = await fetch(`${SCRIPT_URL}?shop=tonysbar&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 2. TRIGGER LOGIC: Look for 'ALERT' in Category (Col D) and 'Active' in Status (Col I)
        const touchdown = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(touchdown || null);

        // 3. MENU ITEMS: Everything else that is Active
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
  }, [isTonysBar]);

  // 4. ROUTING: If URL has tonysbar, show the theme. Otherwise, standby.
  if (isTonysBar) {
    if (loading) return <StandbyScreen message="GETTING THE LINE READY..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  return (
    <StandbyScreen 
      message={`URL NOT RECOGNIZED. Looking for "tonysbar" in: ${window.location.search}`} 
    />
  );
};

export default App;
