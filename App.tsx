import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // FIXED URL: Using the exact script that gave us data in your browser test
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec?shop=tireshop';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Match "Active" and "Tire Shop" exactly from your sheet
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
  }, []);

  if (loading) return <StandbyScreen message="FORCING CONNECTION..." />;
  
  // This removes the "Waiting for Command" logic entirely to get you back online
  return <TireShopTheme ads={items} />;
};

export default App;
