import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. IMPROVED DETECTION: Search the entire URL string for "tire"
  const currentURL = window.location.href.toLowerCase();
  const isTireShop = currentURL.includes("tireshop") || currentURL.includes("tire%20shop");

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (isTireShop) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${SCRIPT_URL}?shop=tireshop&t=${new Date().getTime()}`);
          const data = await response.json();
          
          // Filter data from your Google Script
          const filtered = data.filter((ad: any) => 
            String(ad.target).toLowerCase().includes("tire") && 
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
    }
  }, [isTireShop]);

  // 2. ROUTING LOGIC
  // If "tire" is anywhere in the URL, show the theme
  if (isTireShop) {
    if (loading) return <StandbyScreen message="CONNECTING TO TIRE HUB..." />;
    return <TireShopTheme ads={items} />;
  }

  // 3. DEBUG MODE: If it stays blue, this will tell us exactly what is wrong
  return (
    <StandbyScreen 
      message={`URL NOT RECOGNIZED. Looking for "tireshop" in: ${window.location.search || "Empty URL"}`} 
    />
  );
};

export default App;
