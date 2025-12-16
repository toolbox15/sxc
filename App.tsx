import React, { useState, useEffect, useRef } from 'react';
import MikesBar from './components/MikesBar';
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastValidData = useRef<any[]>([]); 

  // --- CONFIGURATION ---
  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';
  const REFRESH_RATE = 30000; 

  const queryParams = new URLSearchParams(window.location.search);
  const clientId = queryParams.get('id') || 'unknown_device';

  useEffect(() => {
    const sendHeartbeat = async () => {
      try {
        // Updated to use the 'id' parameter your script expects
        await fetch(`${BASE_SCRIPT_URL}?action=heartbeat&id=${clientId}`, { mode: 'no-cors' });
        console.log("💓 Heartbeat sent for:", clientId);
      } catch (e) {
        console.warn("Heartbeat failed - signal weak");
      }
    };

    const fetchData = async () => {
      try {
        // Added a timestamp to the URL to prevent the browser from showing "old" data (Cache Busting)
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&t=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        console.log("📡 Data Received from Sheets:", data);

        if (data && data.length > 0) {
          setItems(data);
          lastValidData.current = data; 
          setError(null);
          setLoading(false);
        } else {
          // If the sheet is empty or the tab name is wrong
          throw new Error("Sheet returned empty. Check tab name 'Ads'");
        }
      } catch (err: any) {
        console.error("❌ Mission Control Error:", err.message);
        
        if (lastValidData.current.length > 0) {
          setItems(lastValidData.current);
          setLoading(false);
        } else {
          setError(`Signal Lost: ${err.message}`);
          setLoading(false);
        }
      }
    };

    fetchData();
    sendHeartbeat();

    const dataInterval = setInterval(fetchData, REFRESH_RATE);
    const heartbeatInterval = setInterval(sendHeartbeat, 60000); 

    return () => {
      clearInterval(dataInterval);
      clearInterval(heartbeatInterval);
    };
  }, [clientId]); 

  if (loading && items.length === 0) {
    return <StandbyScreen message="Initializing Mission Control..." subtext={`Client: ${clientId}`} />;
  }

  // This replaces the "Failed to load menu data" red screen with your professional standby screen
  if (error && items.length === 0) {
    return <StandbyScreen message="Searching for Signal" subtext={error} />;
  }

  return (
    <div className="App">
      <MikesBar ads={items} />
    </div>
  );
};

export default App;
