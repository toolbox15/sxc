import React from 'react';
// import './TonysBar.css'; // Keep this if you have a separate CSS file

// 1. We accept 'backgroundImage' as a prop from App.tsx
const TonysBar = ({ items, ads, backgroundImage }) => {
  
  // 2. Safety Check: Use 'items' or 'ads', whichever isn't empty
  const reliableData = items || ads || [];

  // 3. Logic: If App.tsx sent an image, use it. Otherwise default to white.
  const containerStyle: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundColor: backgroundImage ? 'transparent' : 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100vw',
    padding: '20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <div className="header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: 'white', textShadow: '2px 2px 4px #000' }}>TONY'S BEARS DEN</h1>
      </div>
      
      <div className="menu-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {reliableData.map((item: any, index: number) => (
          <div key={index} className="menu-card" style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '15px', 
            borderRadius: '8px', 
            width: '300px' 
          }}>
            <h2 style={{ margin: '0 0 10px 0', borderBottom: '2px solid orange' }}>{item.Title}</h2>
            <div style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#333' }}>{item.Price}</div>
            <p style={{ fontStyle: 'italic' }}>{item.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TonysBar;
