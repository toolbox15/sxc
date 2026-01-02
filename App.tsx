import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. GET THE EXTENSION FROM THE URL
  const queryParams = new URLSearchParams(window.location.search);
  const shopName = queryParams.get('shop'); 

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // 2. STOP IF NOT TIRESHOP: This prevents it from showing on every extension
    if (shopName !== 'tireshop') {
        setLoading(false);
        return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=tireshop&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Filter for "Active" and "Tire Shop"
        const filtered = data.filter((ad: any) => 
          String(ad.target).toLowerCase() === "tire shop" && 
          String(ad.status).toLowerCase() === "active"
        );
        
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [shopName]);

  // 3. ROUTING LOGIC
  // If no extension is used, show the standby screen
  if (shopName !== 'tireshop') {
    return <StandbyScreen message="WAITING FOR COMMAND..." />;
  }

  if (loading) return <StandbyScreen message="SYNCING WITH HUB..." />;
  
  return <TireShopTheme ads={items} />;
};

export default App;
