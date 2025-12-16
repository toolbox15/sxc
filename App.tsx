import React, { useState, useEffect, useRef } from 'react';
// IMPORTANT: Ensure these filenames match your files in the /components folder exactly!
import MikesBar from './components/MikesBar';
import PizzaTheme from './components/PizzaTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Force a specific theme here for a "Hard Test"
  // Change 'beer' to 'pizza' manually to see if the theme file itself is working
  const [theme, setTheme] = useState(localStorage.getItem('saved_theme') || 'beer');

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        const data = await response.json();
        
        console.log("Data successfully fetched:", data); // Check your browser console for this!

        if (data && data.length > 0) {
          setItems(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Connection to Google Sheet failed:", err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // --- THE CONNECTION CHECK ---
  if (loading) {
    return <StandbyScreen message="Connecting to Database..." />;
  }

  // This logic chooses which file to show
  if (theme === 'pizza') {
    return <PizzaTheme ads={items} />;
  } else {
    return <MikesBar ads={items} />;
  }
};

export default App;
