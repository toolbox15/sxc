// inside App.tsx

// 1. Add a ref to store the last good data
const lastValidData = useRef<any[]>([]); 

useEffect(() => {
  const fetchData = async () => {
    try {
      // Your existing fetch URL
      const response = await fetch('YOUR_GOOGLE_SHEET_API_URL');
      const data = await response.json();

      // 2. Only update if we actually got data
      if (data && data.length > 0) {
        setItems(data);
        lastValidData.current = data; // Save as backup
        setError(null); // Clear any errors
      }
    } catch (err) {
      console.error("Fetch failed, using backup data", err);
      // 3. If fetch fails, DO NOT set error. 
      // Instead, check if we have backup data.
      if (lastValidData.current.length > 0) {
        setItems(lastValidData.current);
      } else {
        // Only show red screen if we have NO data at all (first load failed)
        setError("Failed to load menu data. Check API URL."); 
      }
    }
  };

  // ... rest of your interval logic
}, []);
