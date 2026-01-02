import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Get the 'shop' from the URL and force it to be lowercase
  const queryParams = new URLSearchParams(window.location.search);
  const rawShopName = queryParams.get('shop') || "";
  const shopName = rawShopName.toLowerCase().trim(); 

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // 2. Only fetch if 'tireshop' is found in the URL
    if (shopName === 'tireshop') {
      const fetchData = async () => {
        try {
          const response = await fetch(`${SCRIPT_URL}?shop=tireshop&t=${new Date().getTime()}`);
          const data = await response.json();
          
          // Match "Active" and "Tire Shop"
          const filtered = data.filter((ad: any) => 
            String(ad.target).toLowerCase() === "tire shop" && 
            String(ad.status).toLowerCase() === "active"
          );
          
          setItems(filtered);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [shopName]);

  // 3. FINAL ROUTING:
  // If the URL has 'tireshop', show the theme.
  if (shopName === 'tireshop') {
    if (loading) return <StandbyScreen message="SYNCING WITH HUB..." />;
    return <TireShopTheme ads={items} />;
  }

  // Otherwise, show the blue screen
  return (
    <StandbyScreen 
      message={`WAITING FOR COMMAND... (Detected: "${shopName}")`} 
    />
  );
};

export default App;
