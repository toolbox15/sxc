import React, { useState, useEffect } from 'react';
import MikesBar from './components/MikesBar';
import BearsTheme from './components/BearsTheme'; 
import FinalMenu from './components/FinalMenu'; // <--- 1. Added this import
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // This detects if the URL has ?id=Demo_Bears, ?id=MikesBar, or ?id=FinalMenu
  const queryParams = new URLSearchParams(window.location.search);
  const currentTheme = queryParams.get('id') || 'MikesBar'; 

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // Filters data to match the ID in your URL (e.g., "FinalMenu")
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  // ==========================================
  // THE SWITCHER
  // ==========================================
  if (currentTheme === 'Demo_Bears') {
    return <BearsTheme ads={items} />;
  }

  if (currentTheme === 'FinalMenu') {
    return <FinalMenu items={items} />; // <--- 2. Added this logic
  }

  // Default fallback
  return <MikesBar ads={items} />;
};

export default App;
