import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import TonysBarTheme from './components/TonysBarTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  // 1. UNIVERSAL DETECTION: Automatically grabs whatever name is in the URL
  const queryParams = new URLSearchParams(window.location.search);
  // This looks for ?id=... or ?shop=...
  const shopId = (queryParams.get('id') || queryParams.get('shop') || "").toLowerCase().trim();

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // If there is no ID in the URL, stop here
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // 2. DYNAMIC FETCH: Asks the script for the tab matching the URL
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 3. UNIVERSAL ALERT: Works for "Touchdown" or "Tire Specials"
        const alertTrigger = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        // 4. FILTER CONTENT: Only shows "Active" rows
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
    const interval = setInterval(fetchData, 5000); // 5-second "Live" check
    return () => clearInterval(interval);
  }, [shopId]);

  // 5. AUTOMATIC THEME PICKER
  if (shopId === 'tireshop') return <TireShopTheme ads={items} />;
  
  // This will now load Tony's Bar because it matches the ID in your URL
  if (shopId === 'tonysbar') {
    if (loading) return <StandbyScreen message="PREPPING THE KITCHEN..." />;
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  // 6. FALLBACK: If you haven't assigned a theme yet, it shows this
  return (
    <StandbyScreen 
      message={shopId ? `CONNECTED TO "${shopId.toUpperCase()}" - ASSIGNING THEME...` : "WAITING FOR COMMAND..."} 
    />
  );
};

export default App;
