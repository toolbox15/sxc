import { useState, useEffect } from 'react';

// 1. Get the URL you saved in Netlify
const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const DEVICE_NAME = "Lobby_Screen_1"; 

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    // Function A: Get the Ads
    const fetchAds = async () => {
      try {
        if (!API_URL) {
            console.error("API URL is missing!"); 
            return;
        }
        const res = await fetch(API_URL);
        const data = await res.json();
        // Only keep ads that are marked "Active"
        const activeAds = data.filter((ad:any) => ad.Status === 'Active');
        setAds(activeAds);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    // Function B: Send "I am Online" signal
    const sendHeartbeat = async () => {
      try {
        if (!API_URL) return;
        await fetch(`${API_URL}?action=heartbeat&device_id=${DEVICE_NAME}`, {
          mode: 'no-cors' 
        });
        console.log("💓 Ping sent to Google Sheet");
      } catch (error) {
        console.error("Heartbeat error:", error);
      }
    };

    // Run once immediately
    fetchAds();
    sendHeartbeat();

    // Set loops (Poll every 30s, Ping every 60s)
    const adInterval = setInterval(fetchAds, 30000);
    const beatInterval = setInterval(sendHeartbeat, 60000);

    return () => {
      clearInterval(adInterval);
      clearInterval(beatInterval);
    };
  }, []);

  if (ads.length === 0) {
    return <div className="p-10 text-center text-white">Waiting for Ads... (Check Sheet Status)</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-black min-h-screen">
       {ads.map((ad) => (
         <div key={ad.Title} className="border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gray-900">
            {/* Image Area */}
            {ad.ImageURL && (
                <img src={ad.ImageURL} alt={ad.Title} className="w-full h-64 object-cover" />
            )}
            {/* Text Area */}
            <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{ad.Title}</h1>
                {ad.Price && <p className="text-2xl text-green-400 font-bold">{ad.Price}</p>}
            </div>
         </div>
       ))}
    </div>
  );
}
