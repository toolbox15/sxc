import React from 'react';

// This component handles the "Demo_Bears" layout
const TonysBar = ({ items, ads, publicBackground }) => {
  // Merges both prop names to ensure data is caught
  const menuData = items || ads || [];

  // 1. The main container style using your public folder image
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${publicBackground || '/field-bg.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative'
  };

  // 2. An overlay to make the menu readable against the image
  const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '60px',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            color: '#fff', 
            fontSize: '5.5rem', 
            margin: 0, 
            textShadow: '4px 4px 10px rgba(0,0,0,0.9)',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            Tony's Bears Den
          </h1>
          <div style={{ height: '5px', width: '200px', backgroundColor: '#ffa500', margin: '10px auto' }}></div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '30px',
          padding: '0 20px'
        }}>
          {menuData.map((item: any, index: number) => (
            <div key={index} style={{
              background: 'rgba(0, 0, 0, 0.75)',
              borderLeft: '8px solid #ffa500',
              borderRadius: '4px',
              padding: '25px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '2.2rem', textTransform: 'uppercase' }}>
                  {item.Title}
                </h2>
                <span style={{ color: '#ffa500', fontSize: '2rem', fontWeight: 'bold' }}>
                  {item.Price}
                </span>
              </div>
              <p style={{ color: '#ccc', fontSize: '1.3rem', marginTop: '15px', lineHeight: '1.5' }}>
                {item.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TonysBar;
