// MikesBar.tsx - UPDATED WITH EXPANDED DEFAULT DATA

// --- 1. Define the Placeholder Data ---

// Items for the 'Kickoff' section (Appetizers/Starters)
const defaultKickoffItems: AdItem[] = [
    { 
        Title: "CLASSIC SLIDERS", 
        Price: "$9.00", 
        Description: "Three juicy mini burgers with cheese.", 
        Category: "Kickoff" 
    },
    { 
        Title: "PREMIUM NACHOS", 
        Price: "$12.00", 
        Description: "Loaded with cheese, jalapenos, and sour cream.", 
        Category: "Kickoff" 
    },
    { 
        Title: "PRETZEL BITES", 
        Price: "$8.50", 
        Description: "Served with warm cheese sauce and spicy mustard.", 
        Category: "Kickoff" 
    },
    { 
        Title: "LOADED FRIES", 
        Price: "$7.00", 
        Description: "Crispy fries topped with bacon and cheddar.", 
        Category: "Kickoff" 
    },
];

// Items for the 'The Main Event' section (Entrees)
const defaultMainItems: AdItem[] = [
    { 
        Title: "THE ALL-STAR BURGER", 
        Price: "$15.00", 
        Description: "1/2 lb patty, fried onions, signature sauce.", 
        Category: "The Main Event" 
    },
    { 
        Title: "CHICKEN CAESAR WRAP", 
        Price: "$11.00", 
        Description: "Grilled chicken, crisp romaine, house dressing.", 
        Category: "The Main Event" 
    },
    { 
        Title: "PHILLY CHEESESTEAK", 
        Price: "$13.50", 
        Description: "Shaved steak, peppers, onions, provolone on a hoagie.", 
        Category: "The Main Event" 
    },
    { 
        Title: "PULLED PORK SANDWICH", 
        Price: "$12.00", 
        Description: "Smoked pork with BBQ sauce and coleslaw.", 
        Category: "The Main Event" 
    },
];

// Items for the 'Draft Picks' section (Drinks)
const defaultDrinkItems: AdItem[] = [
    { 
        Title: "IPA DRAFT", 
        Price: "$7.50", 
        Description: "Ask your server for today's selection.", 
        Category: "Draft Picks" 
    },
    { 
        Title: "DOMESTIC BOTTLE", 
        Price: "$5.00", 
        Description: "Bud Light, Miller Lite, Coors Light.", 
        Category: "Draft Picks" 
    },
    { 
        Title: "BLOODY MARY", 
        Price: "$8.00", 
        Description: "Spicy mix with a celery stick and lime.", 
        Category: "Draft Picks" 
    },
    { 
        Title: "HOUSE MARGARITA", 
        Price: "$9.50", 
        Description: "Classic lime, served on the rocks.", 
        Category: "Draft Picks" 
    },
    { 
        Title: "PREMIUM LAGER", 
        Price: "$7.00", 
        Description: "Imported or craft lager selection.", 
        Category: "Draft Picks" 
    },
];

const MikesBar: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
    // ... rest of your component logic remains the same ...
    
    // Kickoff (Uses sheet data, but falls back to defaultFood if sheet is empty)
    const sheetKickoff = ads.filter(ad => ad.Category === 'Kickoff');
    const kickoffItems = sheetKickoff.length > 0 ? sheetKickoff : defaultKickoffItems;

    // The Main Event
    const sheetMains = ads.filter(ad => ad.Category === 'The Main Event');
    const mainItems = sheetMains.length > 0 ? sheetMains : defaultMainItems;
    
    // Draft Picks
    const sheetDrinks = ads.filter(ad => ad.Category === 'Draft Picks');
    const drinkItems = sheetDrinks.length > 0 ? sheetDrinks : defaultDrinkItems;
    
    // ... return statement remains the same ...
    return (
        // ...
    );
};
