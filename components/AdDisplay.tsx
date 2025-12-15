// AdDisplay.tsx - FINAL CORRECTED VERSION WITH TRAFFIC COP LOGIC

import React from 'react';
// 1. ALL IMPORTS MUST BE PRESENT AND CORRECT
import BearsTheme from './BearsTheme.tsx'; 
import MikesBar from './MikesBar.tsx';
import TonysBar from './TonysBar.tsx';
import ChristmasTheme from './ChristmasTheme.tsx';
import NeonGameDayTheme from './NeonGameDayTheme.tsx';
import BistroTheme from './BistroTheme.tsx';
import CinematicTheme from './CinematicTheme.tsx';
import SpaceMenu from './SpaceMenu.tsx';
import FinalMenu from './FinalMenu.tsx';

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
    // We no longer rely on themeName prop, but keep it defined for compatibility
    themeName?: string; 
    ads?: AdItem[];     
}

// Helper function to safely read the deviceId from the URL query string
const getDeviceIdFromUrl = () => {
    // Safely access window.location only if running in a browser environment
    if (typeof window === 'undefined') return '';
    
    const params = new URLSearchParams(window.location.search);
    // Retrieves the deviceId from the URL query string (e.g., ?id=ClientName_Location).
    return params.get('id') || ''; 
};


function AdDisplay({ ads = [] }: AdDisplayProps) { 
  
    const deviceId = getDeviceIdFromUrl().toLowerCase();
    
    // 1. Initialization: Default theme is 'Corporate'
    let theme = 'Corporate'; 

    // 2. Keyword Routing (Your Traffic Cop Logic)
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
        
      case 'Corporate':
      default:
        // The default fallback for your Corporate view when no ID is present
        // or no keyword matches. Using BearsTheme as a solid default.
        return <BearsTheme ads={ads} />; 
    }
}

export default AdDisplay;
