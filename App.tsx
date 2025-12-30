import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. HARDCODED SETTINGS FOR TESTING
  // We force the name to match your Google Sheet exactly (with the space)
  const forcedId = "Tire Shop"; 
  
  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for:", forcedId);
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${forcedId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Filter specifically for "Tire Shop"
        const filtered = data.filter((ad: any) => ad.Target_Screen === forcedId);
        console.log("Found items:", filtered.length);
        
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <StandbyScreen message="Loading Test..." />;
  
  // 2. FORCE THE TIRE SHOP COMPONENT
  // We skip the "if" statements and just return the Tire Shop directly.
  return (
    <div style={{ border: "5px solid red" }}> {/* Red border proves this is the new code */}
        <TireShopTheme items={items} ads={items} />
    </div>
  );
};

export default App;
