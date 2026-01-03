import React, { useState, useEffect } from 'react';

// WE ARE BUILDING THE THEME DIRECTLY INSIDE APP.TSX TO BYPASS THE BUILD ERROR
const TonysBarTheme = ({ ads, alert }: { ads: any[], alert: any }) => (
  <div style={{ backgroundColor: '#003366', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
    {alert ? (
      <div style={{ backgroundColor: 'white', color: '#003366', padding: '50px', textAlign: 'center', fontSize: '5rem', fontWeight: 'bold' }}>
        {alert.title || "TOUCHDOWN!"}
      </div>
    ) : (
      <div>
        <h1 style={{ borderBottom: '4px solid white', paddingBottom: '10px' }}>TONY'S BAR MENU</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          {ads.map((item, i) => (
            <div key={i} style={{ border: '1px solid white', padding: '20px' }}>
              <h2>{item.title} - {item.price}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

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
          String(row.category).toUpperCase() === 'ALERT' && 
          String(row.status).toLowerCase() === 'active'
        );
        setActiveAlert(alertTrigger || null);

        const filtered = data.filter((row: any) => 
          String(row.status).toLowerCase() === "active" &&
          String(row.category).toUpperCase() !== 'ALERT'
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

  if (shopId === 'tonysbar') {
    return <TonysBarTheme ads={items} alert={activeAlert} />;
  }

  return (
    <div style={{ backgroundColor: '#001a33', color: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1>{shopId ? `CONNECTED TO: ${shopId.toUpperCase()}` : "WAITING FOR SHOP ID..."}</h1>
    </div>
  );
};

export default App;
