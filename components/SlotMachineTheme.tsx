// components/SlotMachineTheme.tsx

import React, { useState, useEffect } from 'react';
// ⚠️ We need to import the SlotMachine component you provided
import { SlotMachine } from './SlotMachine'; 

// --- Data Structure (Matches the one used in App.tsx/AdDisplay.tsx) ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
}

const SlotMachineTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
    
    // Logic to determine if the slot machine should spin
    // 1. Look for an item in the sheet that has Category='SLOT_TRIGGER' and Status='Active'
    // 2. We use a local state to toggle the spin, ensuring the animation only runs once 
    //    when the trigger status is first detected as 'Active'.
    const [shouldSpin, setShouldSpin] = useState(false);

    useEffect(() => {
        const triggerAd = ads.find(ad => ad.Category === 'SLOT_TRIGGER' && ad.Status === 'Active');

        if (triggerAd && !shouldSpin) {
            // Found an active trigger in the sheet, start the spin
            setShouldSpin(true);
        } else if (!triggerAd && shouldSpin) {
            // Trigger was removed from the sheet, reset for next time
            setShouldSpin(false);
        }
    }, [ads, shouldSpin]); // Re-run whenever new data (ads) arrives

    return (
        <div 
            className="w-full h-screen flex items-center justify-center"
            // Full-screen background for the theme
            style={{ 
                backgroundColor: '#000033', 
                backgroundImage: 'radial-gradient(circle, #000066 1px, transparent 1px)',
                fontFamily: 'sans-serif' 
            }}
        >
            <SlotMachine triggerSpin={shouldSpin} />
            
            {/* Display instructions or default info */}
            <div className="absolute top-10 right-10 text-white text-lg font-bold">
                Enter 'SLOT_TRIGGER' as a Category in the Google Sheet to start the game!
            </div>
        </div>
    );
};

export default SlotMachineTheme;
