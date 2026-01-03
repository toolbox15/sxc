// Update this section in your App.tsx
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  const shopIdFromURL = (params.get('id') || "tonysbar").toLowerCase().trim();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?t=${new Date().getTime()}`);
        const allData = await response.json();

        // 🛡️ STRICT FILTERING BASED ON YOUR LATEST SCREENSHOT
        const filtered = allData.filter((row: any) => {
          // We look at the 'Target_Screen' column from your sheet
          const target = String(row.target_screen || row.targetScreen || "").toLowerCase().trim();
          const status = String(row.status).toLowerCase().trim();
          
          return target === shopIdFromURL && status === "active";
        });
        
        setItems(filtered);
      } catch (err) { console.error("Fetch Error:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopIdFromURL]);

  // Theme Switcher
  if (shopIdFromURL === 'tonysbar') {
    return <BearsTheme ads={items} />;
  } else {
    return <TireShopTheme ads={items} />;
  }
};
