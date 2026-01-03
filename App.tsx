import React, { useState, useEffect } from 'react';

// --- THEME 1: TONY'S BAR (The Bear Style) ---
const TonysBarTheme = ({ ads, alert }: { ads: any[], alert: any }) => (
  <div style={{ backgroundColor: '#002a5c', color: 'white', minHeight: '100vh', padding: '60px', fontFamily: '"Arial Black", sans-serif' }}>
    {alert ? (
      <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', color: '#002a5c', borderRadius: '15px', border: '10px solid #002a5c' }}>
        <h1 style={{ fontSize: '10rem', margin: 0, fontWeight: '900' }}>{alert.title}</h1>
        <p style={{ fontSize: '4rem', fontWeight: 'bold' }}>{alert.description}</p>
      </div>
    ) : (
      <>
        <h1 style={{ fontSize: '5rem', borderBottom: '8px solid white', paddingBottom: '20px', marginBottom: '60px', fontWeight: '900', textTransform: 'uppercase' }}>TONY'S BAR MENU</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {ads.map((item, i) => (
            <div key={i} style={{ border: '4px solid white', padding: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{item.title}</h2>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', backgroundColor: 'white', color: '#002a5c', padding: '5px 15px' }}>${item.price}</span>
              </div>
              <p style={{ fontSize: '1.6rem', color: '#ddd', margin: 0, lineHeight: '1.4' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

// --- THEME 2: TIRE SHOP (Original Industrial Style) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '50px', fontFamily: 'Impact, sans-serif' }}>
    <div style={{ borderLeft: '15px solid #ff4d4d', paddingLeft: '30px' }}>
      <h1 style={{ fontSize: '6rem', textTransform: 'uppercase', margin: 0, color: '#ff4d4d', letterSpacing: '4px' }}>Current Tire Specials</h1>
      <p style={{ fontSize: '2rem', color: '#888', marginBottom: '50px' }}>OFFER VALID UNTIL END OF MONTH</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
      {ads.map((item, i) => (
        <div key={i} style={{ backgroundColor: '#1a1a1a', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', margin: 0, textTransform: 'uppercase' }}>{item.title}</h2>
            <p style={{ fontSize: '1.8rem', color: '#aaa', margin: '10px 0 0 0' }}>{item.description}</p>
          </div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ff4d4d' }}>{item.price}</div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP LOGIC ---
const App = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  
  const params = new URLSearchParams(window.location.search);
  const shopId = (params.get('id') || params.get('ID') || params.get('shop') || "").toLowerCase().trim();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKTJKOJjowfs0s0C9lOBbGM1CcajLFvjbi8dVANYeuGI7fIbSr9laHN9VnMjF_d1v0MQ/exec';

  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?shop=${shopId}&t=${new Date().getTime()}`);
        const data = await response.json();
        
        const alertTrigger = data.find((row: any) => 
          String(row.category).toUpperCase() === 'ALERT' && String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        const filtered = data.filter((row: any) => 
          String(row.status).toLowerCase() === "active" && String(row.category).toUpperCase() !== 'ALERT'
        );
        
        setItems(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [shopId]);

  if (shopId === 'tonysbar') return <TonysBarTheme ads={items} alert={activeAlert} />;
  if (shopId === 'tireshop') return <TireShopTheme ads={items} />;

  return (
    <div style={{ backgroundColor: '#000', color: '#333', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>{shopId ? `SYNCING ${shopId.toUpperCase()}...` : "NO SHOP ID PROVIDED"}</h1>
    </div>
  );
};

export default App;
