import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import BearsTheme from './components/BearsTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // THEME SELECTOR: Set to 'bears' to show your new theme
  const currentTheme = 'bears'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adding the tab=Ads parameter to match your spreadsheet tab name
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // If data is found in the 'Ads' tab of Cafe Signage DB
        if (data && data.length > 0) {
          setItems(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && items.length === 0) {
    return <StandbyScreen message="Connecting to Cafe Signage DB..." />;
  }

  // THEME LOGIC: Launch BearsTheme if currentTheme is 'bears'
  if (currentTheme === 'bears') {
    return <BearsTheme ads={items} />;
  }

  return <MikesBar ads={items} />;
};

export default App;
