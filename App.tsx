import React, { useState, useEffect, useRef } from 'react';
import MikesBar from './components/MikesBar';
import { StandbyScreen } from './components/StandbyScreen'; // The new component we discussed

const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. YOUR UPDATE: Backup storage to prevent red screens
  const lastValidData = useRef<any[]>([]); 

  // --- CONFIGURATION ---
  const API_URL = 'YOUR_GOOGLE_SHEET_API_URL';
  const HEARTBEAT_URL = 'YOUR_DEPLOYED_GAS_URL';
  const REFRESH_RATE = 30000; // 30 seconds

  // Get Client ID from URL (?id=mikes_bar)
  const queryParams = new URLSearchParams(window.location.search);
  const clientId = queryParams.get('id') || 'unknown_device';

  useEffect(() => {
    // --- 2. THE HEARTBEAT FUNCTION ---
    const sendHeartbeat = async () => {
      try {
        // mode: 'no-cors' is used because we don't need a response from the script
        await fetch(`${HEARTBEAT_URL}?id=${clientId}`, { mode: 'no-cors' });
      } catch (e) {
        console.warn("Heartbeat failed - internet may be flickering");
      }
    };

    // --- 3. THE IMPROVED FETCH LOGIC ---
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
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
        
        // If we have backup data, use it and don't show error
        if (lastValidData.current.length > 0) {
          setItems(lastValidData.current);
          setLoading(false);
        } else {
          // Only show error if it's the VERY FIRST load and it failed
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
    const heartbeatInterval = setInterval(sendHeartbeat, 60000); // Pulse once a minute

    return () => {
      clearInterval(dataInterval);
      clearInterval(heartbeatInterval);
    };
  }, [API_URL, clientId, HEARTBEAT_URL]);

  // --- 4. THE SMART RENDER LAYER ---

  // Show Standby Screen if still loading for the first time
  if (loading && items.length === 0) {
    return <StandbyScreen message="Initializing Mission Control..." subtext={`Connecting to: ${clientId}`} />;
  }

  // Show Standby Screen if there is a hard error (no data and fetch failed)
  if (error && items.length === 0) {
    return <StandbyScreen message="Signal Interrupted" subtext={error} />;
  }

  // If we have items (live or backup), show the bar
  return (
    <div className="App">
      <MikesBar ads={items} />
    </div>
  );
};

export default App;
