// Inside your App component in src/App.tsx
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  
  // 1. Get the Shop ID from the URL (e.g., tonysbar or tireshop)
  const shopId = (params.get('id') || "tonysbar").toLowerCase().trim();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SCRIPT_URL);
        const allData = await response.json();

        // 2. STRICT FILTER: Only keep items where 'Client' matches our 'shopId'
        // We compare "Tony's Bar" from the sheet to "tonysbar" from the URL
        const filteredMenu = allData.filter((row: any) => {
          const clientInSheet = String(row.client).toLowerCase().replace(/['\s]/g, '');
          return clientInSheet === shopId && String(row.status).toLowerCase() === "active";
        });

        setItems(filteredMenu);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, [shopId]);

  // 3. Conditional Theme: Only show the football field if it's Tony's Bar
  if (shopId === 'tonysbar') {
    return <BearsTheme ads={items} alert={null} />;
  }

  return <TireShopTheme ads={items} />; // Or your default theme
};
