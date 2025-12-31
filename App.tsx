import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // URL check: Only show Tire Shop if the URL says ?shop=tireshop
  const queryParams = new URLSearchParams(window.location.search);
  const isTireShop = queryParams.get('shop') === 'tireshop';

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!isTireShop) return; // Don't fetch if it's not the tire shop extension

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_SCRIPT_URL}?shop=tireshop&t=${new Date().getTime()}`);
        const data = await response.json();
        
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
  }, [isTireShop]);

  // If the extension is wrong, show a generic loading or standby screen
  if (!isTireShop) return <StandbyScreen message="WAITING FOR COMMAND..." />;
  if (loading) return <StandbyScreen message="SYNCING WITH HUB..." />;
  
  return <TireShopTheme ads={items} />;
};

export default App;
