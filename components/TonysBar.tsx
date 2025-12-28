import React from 'react';

// This component handles the "Demo_Bears" theme
const TonysBar = ({ items, ads, publicBackground }) => {
  // Combine items and ads props to ensure we don't miss data
  const menuData = items || ads || [];

  const containerStyle: React.CSSProperties = {
    // This pulls 'field-bg.png' from your public folder
    backgroundImage: publicBackground ? `url(${publicBackground})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds contrast so menu text is readable over the field image
    height: '100%',
    width: '100%',
    padding: '40px',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: '#fff', 
            fontSize: '5rem', 
            margin: 0, 
            textShadow: '3px 3px 10px rgba(0,0,0,1)',
            letterSpacing: '2px'
          }}>
            TONY'S BEARS DEN
          </h1>
          <p style={{ color: '#ffa500', fontSize: '1.5rem', fontWeight: 'bold' }}>
            DAILY SPECIALS
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {menuData.map((item: any, index: number) => (
            <div key={index} style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid #ffa500',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '1.8rem' }}>{item.Title}</h2>
                <span style={{ color: '#ffa500', fontSize: '1.6rem', fontWeight: 'bold' }}>{item.Price}</span>
              </div>
              <p style={{ color: '#ddd', fontSize: '1.1rem', marginTop: '10px', lineHeight: '1.4' }}>
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
