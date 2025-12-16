import React, { useState, useEffect } from 'react';
// These must match your file names in the /components folder exactly
import MikesBar from './components/MikesBar';
import PizzaTheme from './components/PizzaTheme'; 
import BearsTheme from './components/BearsTheme'; 
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Gets the ?id= from your URL (e.g., Demo_Bears or MikesBar)
  const queryParams = new URLSearchParams(window.location.search);
  const clientId = queryParams.get('id') || 'MikesBar';

  // THEME MEMORY: Remembers what you picked in the admin menu
  const [theme, setTheme] = useState(localStorage.getItem('saved_theme') || 'beer');

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('saved_theme', newTheme);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the 'Ads' tab specifically
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Filter data to only show items for THIS specific screen
          const filteredData = data.filter((item: any) => 
            item.Target_Screen === clientId && item.Status === 'Active'
          );
          setItems(filteredData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Connection failed", err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [clientId]);

  // --- THEME ROUTER ---
  const renderTheme = () => {
    if (items.length === 0) {
      return <StandbyScreen message={`No active ads for ${clientId}`} />;
    }

    switch (theme) {
      case 'bears': return <BearsTheme ads={items} />;
      case 'pizza': return <PizzaTheme ads={items} />;
      case 'beer': 
      default: return <MikesBar ads={items} />;
    }
  };

  return (
    <div className="App" style={{ cursor: showAdmin ? 'default' : 'none' }}>
      
      {/* SECRET ADMIN TRIGGER (Bottom Right Corner) */}
      <div 
        onClick={() => setShowAdmin(true)}
        style={{ position: 'fixed', bottom: 0, right: 0, width: '40px', height: '40px', zIndex: 9999 }}
      />

      {showAdmin && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 10000, background: '#1a1a1a', padding: '30px', borderRadius: '15px', color: 'white'
        }}>
          <h3>Theme Settings</h3>
          <button onClick={() => handleThemeChange('beer')} style={btnStyle(theme === 'beer')}>Beer Theme</button>
          <button onClick={() => handleThemeChange('pizza')} style={btnStyle(theme === 'pizza')}>Pizza Theme</button>
          <button onClick={() => handleThemeChange('bears')} style={btnStyle(theme === 'bears')}>Bears Theme</button>
          <hr />
          <button onClick={() => setShowAdmin(false)} style={{width:'100%', padding:'10px'}}>Close</button>
        </div>
      )}

      {loading ? <StandbyScreen message="Launching..." /> : renderTheme()}
    </div>
  );
};

const btnStyle = (active: boolean) => ({
  display: 'block', width: '100%', padding: '10px', margin: '5px 0',
  background: active ? '#ff9900' : '#444', color: 'white', border: 'none', borderRadius: '5px'
});

export default App;
