import React, { useState, useEffect } from 'react';

// --- THEME 1: TONY'S BAR (The Bear Style) ---
const TonysBarTheme = ({ ads, alert }: { ads: any[], alert: any }) => (
  <div style={{ backgroundColor: '#002a5c', color: 'white', minHeight: '100vh', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
    {alert ? (
      <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', color: '#002a5c', borderRadius: '20px' }}>
        <h1 style={{ fontSize: '8rem', margin: 0 }}>{alert.title}</h1>
        <p style={{ fontSize: '3rem' }}>{alert.description}</p>
      </div>
    ) : (
      <>
        <h1 style={{ fontSize: '3.5rem', borderBottom: '5px solid white', paddingBottom: '20px', marginBottom: '40px' }}>TONY'S BAR MENU</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {ads.map((item, i) => (
            <div key={i} style={{ border: '2px solid rgba(255,255,255,0.3)', padding: '30px', borderRadius: '10px' }}>
              <h2>{item.title} — ${item.price}</h2>
              <p style={{ color: '#ccc' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

// --- THEME 2: TIRE SHOP (Original Style) ---
const TireShopTheme = ({ ads }: { ads: any[] }) => (
  <div style={{ backgroundColor: '#050505', color: '#f1f1f1', minHeight: '100vh', padding: '40px', fontFamily: 'Impact, sans-serif' }}>
    <h1 style={{ color: '#ff4d4d', fontSize: '4rem', textTransform: 'uppercase' }}>Current Tire Specials</h1>
    <div style={{ marginTop: '40px' }}>
      {ads.map((item, i) => (
        <div key={i} style={{ borderLeft: '10px solid #ff4d4d', padding: '20px', marginBottom: '20px', backgroundColor: '#1a1a1a' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{item.title}</h2>
          <p style={{ fontSize: '1.5rem', color: '#aaa' }}>{item.description} — <span style={{ color: '#fff' }}>{item.price}</span></p>
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
    <div style={{ backgroundColor: '#001a33', color: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>WAITING FOR SHOP ID (tireshop or tonysbar)</h1>
    </div>
  );
};

export default App;
