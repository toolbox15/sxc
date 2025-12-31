import React, { useState, useEffect } from 'react';
import TireShopTheme from './components/TireShopTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // This matches Column K in your sheet exactly
  const forcedId = "Tire Shop"; 
  
  // Your verified Script URL
  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FIXED: We now point specifically to the 'tireshop' tab
        const response = await fetch(`${BASE_SCRIPT_URL}?shop=tireshop&t=${new Date().getTime()}`);
        const data = await response.json();
        
        console.log("Raw Data Received:", data);

        // FIXED: Filter matches the 'target' key from our JSON test
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
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <StandbyScreen message="CONNECTING TO HUB..." />;
  
  return (
    <div style={{ border: "2px solid #ea580c" }}> 
        {/* We pass 'items' to 'ads' so TireShopTheme can read it */}
        <TireShopTheme ads={items} />
    </div>
  );
};

export default App;
