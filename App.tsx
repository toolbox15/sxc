import React, { useState, useEffect, useRef } from 'react';
import MikesBar from './components/MikesBar';
import { StandbyScreen } from './components/StandbyScreen'; 

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. Backup storage to prevent red screens during Google Sheet updates
  const lastValidData = useRef<any[]>([]); 

  // --- CONFIGURATION ---
  // Using your provided Apps Script URL for both Data and Heartbeat
  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';
  const REFRESH_RATE = 30000; // 30 seconds

  // Get Client ID from URL (?id=mikes_bar)
  const queryParams = new URLSearchParams(window.location.search);
  const clientId = queryParams.get('id') || 'unknown_device';

  useEffect(() => {
    // --- 2. THE HEARTBEAT FUNCTION ---
    // Sends a 'pong' to your Devices tab every minute
    const sendHeartbeat = async () => {
      try {
        await fetch(`${BASE_SCRIPT_URL}?action=heartbeat&id=${clientId}`, { mode: 'no-cors' });
      } catch (e) {
        console.warn("Heartbeat failed - checking connection...");
      }
    };

    // --- 3. THE IMPROVED FETCH LOGIC ---
    const fetchData = async () => {
      try {
        // Fetches your menu data from the 'Ads' tab
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();

        if (data && data.length > 0) {
          setItems(data);
          lastValidData.current = data; // Update backup
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch failed, using backup data", err);
        
        // Anti-Red-Screen Logic: Use backup if fetch fails
        if (lastValidData.current.length > 0) {
          setItems(lastValidData.current);
          setLoading(false);
        } else {
          setError("Failed to connect to Mission Control. Retrying...");
          setLoading(false);
        }
      }
    };

    // Initial triggers
    fetchData();
    sendHeartbeat();

    // Set up intervals
    const dataInterval = setInterval(fetchData, REFRESH_RATE);
    const heartbeatInterval = setInterval(sendHeartbeat, 60000); 

    return () => {
      clearInterval(dataInterval);
      clearInterval(heartbeatInterval);
    };
  }, [clientId]); // Effect runs once on mount

  // --- 4. THE SMART RENDER LAYER ---

  // Show professional Standby Screen instead of raw text/errors
  if (loading && items.length === 0) {
    return <StandbyScreen message="Initializing Mission Control..." subtext={`Connecting to: ${clientId}`} />;
  }

  if (error && items.length === 0) {
    return <StandbyScreen message="Signal Interrupted" subtext={error} />;
  }

  return (
    <div className="App">
      <MikesBar ads={items} />
    </div>
  );
};

export default App;
