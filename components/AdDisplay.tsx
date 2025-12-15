// AdDisplay.tsx - UPDATED with LiveStreamTheme

import React from 'react';
// ... (Your existing imports) ...
import BearsTheme from './BearsTheme.tsx'; 
// ...
import FinalMenu from './FinalMenu.tsx';
// 1. ✅ IMPORT THE NEW THEME
import LiveStreamTheme from './LiveStreamTheme.tsx'; 

// ... (Data Structure and Props definitions remain the same) ...

// Helper function to safely read the deviceId from the URL query string
const getDeviceIdFromUrl = () => {
    // ... (This function remains unchanged) ...
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || ''; 
};


function AdDisplay({ ads = [] }: AdDisplayProps) { 
  
    const deviceId = getDeviceIdFromUrl().toLowerCase();
    let theme = 'Corporate'; 

    // 2. ✅ ADD THE NEW ROUTING LOGIC
    if (deviceId.includes('bears')) {
      theme = 'Bears';
    } else if (deviceId.includes('mikesbar')) {
      theme = 'MikesBar';
    } else if (deviceId.includes('tonysbar')) {
      theme = 'TonysBar';
    } else if (deviceId.includes('christmas')) {
      theme = 'Christmas';
    } else if (deviceId.includes('neon')) {
      theme = 'Neon';
    } else if (deviceId.includes('bistro')) {
      theme = 'Bistro';
    } else if (deviceId.includes('cinematic')) {
      theme = 'Cinematic';
    } else if (deviceId.includes('space')) {
      theme = 'Space';
    } else if (deviceId.includes('livestream')) { // <-- NEW KEYWORD CHECK
      theme = 'LiveStream';
    }
    // If no match is found, theme remains 'Corporate'.

    // 3. ✅ ADD THE NEW CASE IN THE SWITCH STATEMENT
    switch (theme) {
      case 'Bears':
        return <BearsTheme ads={ads} />;
      case 'MikesBar':
        return <MikesBar ads={ads} />;
      // ... (All other existing cases) ...
      case 'Space':
        return <SpaceMenu ads={ads} />;
      
      case 'LiveStream': // <-- NEW RENDER CASE
        return <LiveStreamTheme ads={ads} />;
        
      case 'Corporate':
      default:
        // Default fallback
        return <BearsTheme ads={ads} />; 
    }
}

export default AdDisplay;
