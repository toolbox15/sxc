import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Get the extension and make it lowercase to avoid errors
  const queryParams = new URLSearchParams(window.location.search);
  const shopName = (queryParams.get('shop') || "").toLowerCase().trim(); 

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    // 2. Gatekeeper: Only run if the URL says 'tireshop'
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
        setLoading(false);
      }
    };
    fetchData();
  }, [shopName]);

  // 3. Routing Logic
  if (shopName === 'tireshop') {
    if (loading) return <StandbyScreen message="SYNCING WITH HUB..." />;
    return <TireShopTheme ads={items} />;
  }

  // DEFAULT: If no 'shop=tireshop' is found, show this
  return <StandbyScreen message="WAITING FOR COMMAND..." />;
};

export default App;
