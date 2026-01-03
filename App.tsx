import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. THE FIX: Detect both 'shop' or 'ID' and handle 'tonysbar'
  const queryParams = new URLSearchParams(window.location.search);
  const shopId = (queryParams.get('id') || queryParams.get('shop') || "").toLowerCase().trim();

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // Stop if no valid shop is in the URL
    if (shopId !== 'tireshop' && shopId !== 'tonysbar') {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch data from the Google Sheet tab matching the shopId
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Check for 'ALERT' + 'Active' (The Touchdown Trigger)
        const alertTrigger = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        // Filter for active menu items
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
    const interval = setInterval(fetchData, 5000); // Poll for touchdown triggers
    return () => clearInterval(interval);
  }, [shopId]);

  // 2. ROUTING LOGIC
  if (shopId === 'tireshop') return <TireShopTheme ads={items} />;
  
  if (shopId === 'tonysbar') {
    if (loading) return <StandbyScreen message="PREPPING THE KITCHEN..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  // 3. ERROR SCREEN: Shows exactly what the URL is sending
  return (
    <StandbyScreen 
      message={`URL NOT RECOGNIZED. Detected: "${shopId || "Nothing"}"`} 
    />
  );
};

export default App;
