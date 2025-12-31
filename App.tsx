import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. URL CHECK: Look for ?shop=tireshop in the address bar
  const queryParams = new URLSearchParams(window.location.search);
  const shopId = queryParams.get('shop');
  const isTireShop = shopId === 'tireshop';

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // Only fetch if we are actually on the tire shop extension
    if (!isTireShop) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_SCRIPT_URL}?shop=tireshop&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 2. DATA FILTER: Match "Active" and "Tire Shop" from your script
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
  }, [isTireShop]);

  // 3. THEME ROUTING: If no extension is used, show the standby screen
  if (!isTireShop) {
    return <StandbyScreen message="WAITING FOR COMMAND..." />;
  }

  if (loading) {
    return <StandbyScreen message="SYNCING WITH HUB..." />;
  }
  
  return <TireShopTheme ads={items} />;
};

export default App;
