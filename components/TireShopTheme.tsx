const TireShopTheme = ({ ads }: any) => {
  // --- BULLETPROOF FILTERING ---
  const activeAds = ads.filter((ad: any) => {
    // 1. Convert everything to lowercase and remove spaces for a "fuzzy" match
    // This makes 'Tire Shop' match 'tireshop' and 'Tire%20Shop'
    const target = String(ad.Target_Screen || "").toLowerCase().replace(/\s/g, "");
    
    // 2. Boolean Check for Checkboxes (TRUE/false)
    const isActive = 
      ad.Status === true || 
      String(ad.Status).toUpperCase() === "TRUE" || 
      String(ad.Status).toLowerCase() === "active";

    // 3. Match against 'tireshop'
    return isActive && target === "tireshop";
  });

  // --- CATEGORY FILTERING ---
  // Using .toLowerCase() here too so 'Tires' matches 'tires'
  const services = activeAds.filter((ad: any) => {
    const cat = String(ad.Category || "").toLowerCase();
    return cat === 'service' || cat === 'main' || cat === 'tires';
  });

  const promos = activeAds.filter((ad: any) => {
    const cat = String(ad.Category || "").toLowerCase();
    return cat === 'promo' || cat === 'offer';
  });

  // --- DUMMY DATA FALLBACK ---
  const item1 = promos[0] || { 
    Title: "TIRE SHOP SPECIAL", 
    Description: "Check back soon for offers", 
    ImageURL: "https://images.unsplash.com/photo-1578844251758-2f71da645217?auto=format&fit=crop&w=800&q=80" 
  };

  const serviceList = services.length > 0 ? services : [
      { Title: "Synthetic Oil Change", Description: "Up to 5 Quarts + Filter", Price: "$69.99" },
      { Title: "Tire Rotation", Description: "Free with Brake Inspection", Price: "$29.99" },
      { Title: "Brake Pad Special", Description: "Front or Rear Axle", Price: "$149.99" },
      { Title: "Alignment", Description: "4-Wheel Computerized", Price: "$89.99" }
  ];

  // ... rest of your return() code stays the same
