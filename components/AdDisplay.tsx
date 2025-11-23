import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;

// 1. SMART ID LOGIC (Reads the URL)
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1"; // Fallback if no ID

export default function AdDisplay() {
  const [ads, setAds] = useState<any[]>([]);
  const [theme, setTheme] = useState("Corporate"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // 2. THEME LOGIC (Auto-detect BBQ or Pizza clients)
        if (deviceId.includes("JoesPizza") || deviceId.includes("BBQ")) {
            setTheme("BBQ");
        } else {
            setTheme("Corporate");
        }

        // 3. FILTER ADS (Only show ads for THIS device)
        const relevantAds = data.filter((ad:any) => 
            ad.Status === 'Active' && 
            (ad.Target_Screen === 'All' || ad.Target_Screen === deviceId)
        );
        setAds(relevantAds);
      } catch (error) { console.error(error); }
    };

    // 4. HEARTBEAT (Sends the REAL ID now)
    const sendHeartbeat = async () => {
      try {
        if (!API_URL) return;
        await fetch(`${API_URL}?action=heartbeat&device_id=${deviceId}`, { mode: 'no-cors' });
      } catch (e) {}
    };

    fetchData();
    sendHeartbeat();
    setInterval(fetchData, 30000);
    setInterval(sendHeartbeat, 60000);
  }, []);

  // RENDER
  return (
    <div className={`relative min-h-screen overflow-hidden font-sans ${theme === 'BBQ' ? 'bg-stone-900' : 'bg-white'}`}>
      
      {theme === 'BBQ' ? (
         <div className="bg-red-900 text-white py-2 border-b-4 border-yellow-600 shadow-xl z-20 relative">
            <div className="text-center text-xl font-bold tracking-wider">🔥 FRESH OUT OF THE PIT 🔥</div>
         </div>
      ) : (
         <div className="bg-blue-900 text-white py-4 shadow-md z-20 relative">
             {/* Shows Client Name cleanly in header */}
            <div className="text-center text-2xl font-semibold">Welcome to {deviceId.split('_')[0]}</div>
         </div>
      )}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pb-32">
        {ads.map((ad, index) => (
          <div key={index} className={`relative rounded-xl overflow-hidden shadow-lg border-2 ${theme === 'BBQ' ? 'bg-black border-stone-700' : 'bg-gray-100 border-gray-200'}`}>
             <div className="h-64 overflow-hidden">
               <img src={ad.ImageURL} className="w-full h-full object-cover" />
             </div>
             <div className="p-6">
                <h2 className={`text-4xl font-bold mb-2 ${theme === 'BBQ' ? 'text-white' : 'text-gray-800'}`}>{ad.Title}</h2>
                <div className={`text-3xl font-bold ${theme === 'BBQ' ? 'text-yellow-500' : 'text-blue-600'}`}>{ad.Price}</div>
             </div>
          </div>
        ))}
      </div>

      {theme === 'BBQ' && (
        <div className="fixed bottom-0 left-0 w-full h-64 pointer-events-none z-0 opacity-60">
           <div className="w-full h-full bg-gradient-to-t from-orange-600 via-red-900 to-transparent blur-xl animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
