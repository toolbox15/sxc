import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // --- THE FIX STARTS HERE ---
  // 1. Get the URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  
  // 2. Look for 'shop', 'id', or 'ID' and force it to lowercase
  // This captures "?ID=TONYSBAR" and turns it into "tonysbar"
  const rawId = queryParams.get('shop') || queryParams.get('id') || queryParams.get('ID') || "";
  const shopId = rawId.toLowerCase().trim();
  // --- THE FIX ENDS HERE ---

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // If the ID is empty, stop loading
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch data using the detected shopId (e.g., "tonysbar")
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Check for Touchdown Triggers (ALERT category)
        const alertTrigger = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        // Filter for Menu Items
        const filtered = data.filter((row: any) => 
          String(row.status).toLowerCase() === "active" &&
          String(row.category).toUpperCase() !== 'ALERT'
        );
        
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Data fetch failed", err);
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 5 seconds
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [shopId]);

  // --- ROUTING LOGIC ---
  
  // 1. If ID is "tireshop", show Tire Theme
  if (shopId === 'tireshop') {
    return <TireShopTheme ads={items} />;
  }
  
  // 2. If ID is "tonysbar", show Tony's Bar Theme
  if (shopId === 'tonysbar') {
    if (loading) return <StandbyScreen message="PREPPING THE KITCHEN..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  // 3. If ID is unknown or empty, show this Debug Screen
  return (
    <StandbyScreen 
      message={`URL NOT RECOGNIZED. I received ID: "${shopId}". Check your URL.`} 
    />
  );
};

export default App;
