const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const queryParams = new URLSearchParams(window.location.search);
  
  // 1. CLEAN THE THEME NAME: Get it from URL, but make it lowercase for comparison
  const rawTheme = queryParams.get('id') || 'MikesBar'; 
  const currentTheme = rawTheme.trim(); // We keep the space for the API filter

  const BASE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We send the "Clean" name to the Google Script
        const response = await fetch(`${BASE_SCRIPT_URL}?tab=Ads&deviceName=${currentTheme}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        // 2. FILTER: Match the "Target_Screen" from your sheet
        const filtered = data.filter((ad: any) => ad.Target_Screen === currentTheme);
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [currentTheme]);

  if (loading) return <StandbyScreen message="Connecting..." />;
  if (items.length === 0) return <StandbyScreen message={`No Active Ads for ${currentTheme}`} />;

  const commonProps = { items: items, ads: items };

  // ==========================================
  // THE SWITCHER: Using .toLowerCase() to avoid space issues
  // ==========================================
  const themeCheck = currentTheme.toLowerCase().replace(/\s/g, "");

  if (themeCheck === 'demo_bears' || themeCheck === 'tonysbar') {
    return <TonysBar {...commonProps} backgroundImage="/field-bg.png" />; 
  }

  // FIX: This now catches "Tire Shop", "TireShop", and "tireshop"
  if (themeCheck === 'tireshop') {
    return <TireShopTheme {...commonProps} />; 
  }

  if (themeCheck === 'finalmenu') {
    return <FinalMenu {...commonProps} />;
  }

  return <MikesBar {...commonProps} />;
};
