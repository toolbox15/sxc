import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. PROFESSIONAL URL PARSING
  // This looks for 'id' or 'ID' or 'shop' and converts to lowercase
  const params = new URLSearchParams(window.location.search);
  const shopId = (params.get('id') || params.get('ID') || params.get('shop') || "").toLowerCase().trim();

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // If no ID is provided, don't attempt to fetch
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch from the tab named in the URL (e.g., tonysbar)
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // DYNAMIC ALERT: Works for "Touchdown" or "Tire Sales"
        const alertTrigger = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        // DYNAMIC MENU: Only shows Active items for this shop
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
    const interval = setInterval(fetchData, 5000); // 5-second polling for live alerts
    return () => clearInterval(interval);
  }, [shopId]);

  // 2. THEME ROUTER
  // Loads the correct UI based on the shopId
  if (shopId === 'tireshop') return <TireShopTheme ads={items} />;
  
  if (shopId === 'tonysbar') {
    if (loading) return <StandbyScreen message="THE BEAR: PREPPING STATION..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  // 3. FAIL-SAFE DEBUG SCREEN
  // This tells you EXACTLY what the app is reading from your URL
  return (
    <StandbyScreen 
      message={shopId ? `SYSTEM LIVE. CONNECTED TO: ${shopId.toUpperCase()}` : "WAITING FOR SHOP ID..."} 
    />
  );
};

export default App;
