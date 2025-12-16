import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import PizzaTheme from './components/PizzaTheme'; 
import BearsTheme from './components/BearsTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // CHANGE THIS TO 'beer' OR 'pizza' TO SWITCH THEMES MANUALLY
  const currentTheme = 'bears'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // NO FILTERS: If it's in the sheet, it's going to the screen
        if (data && data.length > 0) {
          setItems(data);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && items.length === 0) {
    return <StandbyScreen message="Restoring Connection..." />;
  }

  // DIRECT THEME LAUNCHER
  if (currentTheme === 'bears') return <BearsTheme ads={items} />;
  if (currentTheme === 'pizza') return <PizzaTheme ads={items} />;
  return <MikesBar ads={items} />;
};

export default App;
