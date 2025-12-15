// AdDisplay.tsx - FINAL CORRECTED VERSION WITH TIRESHOP THEME INTEGRATION

import React from 'react';
// 1. Theme Imports (Make sure these paths match your file structure!)
import BearsTheme from './BearsTheme.tsx'; 
import MikesBar from './MikesBar.tsx';
import TonysBar from './TonysBar.tsx';
import ChristmasTheme from './ChristmasTheme.tsx';
import NeonGameDayTheme from './NeonGameDayTheme.tsx';
import BistroTheme from './BistroTheme.tsx';
import CinematicTheme from './CinematicTheme.tsx';
import SpaceMenu from './SpaceMenu.tsx';
import FinalMenu from './FinalMenu.tsx';
import LiveStreamTheme from './LiveStreamTheme.tsx'; 
import TireShopTheme from './TireShopTheme.tsx'; // <--- NEW TIRE SHOP IMPORT

// --- DATA STRUCTURE ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
  Color?: string;
}

// --- PROPS DEFINITION ---
interface AdDisplayProps {
    themeName?: string; 
    ads?: AdItem[];     
}

// Helper function to safely read the deviceId from the URL query string
const getDeviceIdFromUrl = () => {
    if (typeof window === 'undefined') return '';
    
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || ''; 
};


function AdDisplay({ ads = [] }: AdDisplayProps) { 
  
    const deviceId = getDeviceIdFromUrl().toLowerCase();
    let theme = 'Corporate'; 

    // 2. Keyword Routing (The Traffic Cop Logic)
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
    } else if (deviceId.includes('livestream')) {
      theme = 'LiveStream';
    } else if (deviceId.includes('tire')) { // <--- TIRE SHOP KEYWORD
      theme = 'TireShop';
    }
    // If no match is found, theme remains 'Corporate'.

    // 3. Theme Rendering Switch
    switch (theme) {
      case 'Bears':
        return <BearsTheme ads={ads} />;
      case 'MikesBar':
        return <MikesBar ads={ads} />;
      case 'TonysBar': 
        return <TonysBar ads={ads} />;
      case 'Christmas':
        return <ChristmasTheme ads={ads} />;
      case 'Neon':
        return <NeonGameDayTheme ads={ads} />;
      case 'Bistro':
        return <BistroTheme ads={ads} />;
      case 'Cinematic':
        return <CinematicTheme ads={ads} />;
      case 'Space':
        return <SpaceMenu ads={ads} />;
      case 'LiveStream': 
        return <LiveStreamTheme ads={ads} />;
      
      case 'TireShop': // <--- TIRE SHOP RENDER CASE
        return <TireShopTheme ads={ads} />;
        
      case 'Corporate':
      default:
        // Default fallback
        return <BearsTheme ads={ads} />; 
    }
}

export default AdDisplay;
