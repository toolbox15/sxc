// MikesBar.tsx

import React from 'react';

// --- DATA STRUCTURE (Must match what's in App.tsx) ---
interface AdItem {
  Title: string;
  Price: string;
  Description?: string;
  Category: string;
  Status?: string;
  Color?: string;
  Target_Screen?: string;
}

// --- 1. PLACEHOLDER DATA ---
const defaultKickoffItems: AdItem[] = [
    { 
        Title: "CLASSIC NACHOS", 
        Price: "$9.00", 
        Description: "Loaded with cheese sauce, sour cream, and jalapeños.", 
        Category: "Kickoff" 
    },
    { 
        Title: "BUFFALO WINGS", 
        Price: "$12.99", 
        Description: "6 Crispy wings with your choice of heat level.", 
        Category: "Kickoff" 
    },
];

const defaultMainItems: AdItem[] = [
    { 
        Title: "THE DITKA BURGER", 
        Price: "$14.00", 
        Description: "1/2 lb patty, sharp cheddar, bacon, and onion.", 
        Category: "The Main Event" 
    },
    { 
        Title: "BEEF SLIDERS", 
        Price: "$10.00", 
        Description: "Three mini burgers with pickles and our house sauce.", 
        Category: "The Main Event" 
    },
];

const defaultDrinkItems: AdItem[] = [
    { 
        Title: "DOMESTIC PINT", 
        Price: "$6.00", 
        Description: "Bud Light, Miller Lite, Coors Light.", 
        Category: "Draft Picks" 
    },
    { 
        Title: "LOCAL GOOSE ISLAND", 
        Price: "$7.00", 
        Description: "Ask for today's seasonal tap selection.", 
        Category: "Draft Picks" 
    },
];

// --- ALERT COMPONENT (Assumed structure for the overlay) ---
const AlertOverlay = ({ item }: { item: AdItem }) => (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-red-900/90 backdrop-blur-md animate-fade-in">
        <div className="text-center p-16 bg-white border-8 border-red-600 shadow-alert-glow">
            <h2 className="text-8xl font-black text-red-600 uppercase animate-pulse">{item.Title}</h2>
            <p className="text-4xl mt-6 font-semibold text-gray-800">{item.Description}</p>
            {item.Price && <p className="text-5xl font-black mt-4 text-green-600">{item.Price}</p>}
            <div className="text-xl mt-8 text-gray-500">Valid until half time - see bartender!</div>
        </div>
    </div>
);

// --- MAIN MIKE'S BAR COMPONENT ---
const MikesBar: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
    
    // 2. ALERT FILTERING LOGIC
    const activeAlert = ads.find(ad => 
        ad.Category === 'ALERT' && 
        ad.Status === 'Active' &&
        (ad.Target_Screen === 'MikesBar' || !ad.Target_Screen) 
    );

    // 3. MENU DATA FILTERING WITH FALLBACKS
    // Kickoff (Uses sheet data, falls back to defaults if sheet data is empty)
    const sheetKickoff = ads.filter(ad => ad.Category === 'Kickoff');
    const kickoffItems = sheetKickoff.length > 0 ? sheetKickoff : defaultKickoffItems;

    // The Main Event
    const sheetMains = ads.filter(ad => ad.Category === 'The Main Event');
    const mainItems = sheetMains.length > 0 ? sheetMains : defaultMainItems;
    
    // Draft Picks
    const sheetDrinks = ads.filter(ad => ad.Category === 'Draft Picks');
    const drinkItems = sheetDrinks.length > 0 ? sheetDrinks : defaultDrinkItems;

    // --- RENDER FUNCTION ---
    return (
        <div className="w-full h-screen relative overflow-hidden bg-zinc-900 font-sans" 
             style={{ 
                backgroundImage: "url('/football-field-bg.jpg')", // Ensure this path is correct
                backgroundSize: 'cover' 
             }}>
            
            {/* RENDER THE ALERT OVERLAY FIRST (Highest z-index) */}
            {activeAlert && <AlertOverlay item={activeAlert} />}
            
            {/* Game Day Title Header */}
            <div className="text-center pt-8">
                <h1 className="text-6xl font-black text-white drop-shadow-lg" 
                    style={{ WebkitTextStroke: '2px #ff6600', color: 'transparent' }}>
                    GAME DAY <span style={{ color: '#ff6600', WebkitTextStroke: 'none' }}>SPECIALS</span>
                </h1>
            </div>

            {/* --- MENU SECTIONS --- */}
            <div className="flex justify-center mt-10 space-x-8">
                
                {/* Kickoff Items */}
                <MenuColumn title="KICKOFF" items={kickoffItems} align="left" />
                
                {/* Main Event Items */}
                <MenuColumn title="THE MAIN EVENT" items={mainItems} align="center" />
                
                {/* Draft Picks Items */}
                <MenuColumn title="DRAFT PICKS" items={drinkItems} align="right" />

            </div>
            
            {/* Optional Footer/Branding */}
        </div>
    );
};

// --- HELPER COMPONENT (You may need to adapt this to your actual item rendering logic) ---
const MenuColumn = ({ title, items, align }: { title: string, items: AdItem[], align: string }) => (
    <div className={`w-1/3 p-4 ${align === 'center' ? 'border-x-4 border-orange-500/50' : ''}`}>
        <h2 className={`text-3xl font-bold uppercase mb-4 text-${align} text-orange-400`}>{title}</h2>
        {items.map((item, index) => (
            <div key={index} className="mb-4 p-2 bg-black/50 rounded">
                <div className="flex justify-between items-center text-white">
                    <span className="text-xl font-bold">{item.Title}</span>
                    <span className="text-2xl font-black text-yellow-300">{item.Price}</span>
                </div>
                {item.Description && <p className="text-sm text-gray-400 mt-1">{item.Description}</p>}
            </div>
        ))}
    </div>
);

export default MikesBar;
