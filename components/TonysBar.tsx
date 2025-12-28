import React from 'react';

interface AdItem {
  Title: string;
  Price: string;
  Description: string;
  ImageURL?: string;
}

interface TonysBarProps {
  items?: AdItem[];
  ads?: AdItem[];
  publicBackground?: string;
}

const TonysBar: React.FC<TonysBarProps> = ({ items, ads, publicBackground }) => {
  // Use whichever data prop contains the info
  const menuItems = items || ads || [];

  // This style object applies your public folder image as a full-screen background
  const containerStyle: React.CSSProperties = {
    backgroundImage: publicBackground ? `url(${publicBackground})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden'
  };

  const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darkens the background so text is easy to read
    width: '100%',
    height: '100%',
    padding: '40px',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '4rem', textShadow: '4px 4px 8px rgba(0,0,0,0.8)', margin: 0 }}>
            TONY'S BEARS DEN
          </h1>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {menuItems.map((item, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}>
              <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0', borderBottom: '2px solid #ffa500' }}>
                {item.Title}
              </h2>
              <div style={{ fontSize: '1.8rem', color: '#ffa500', fontWeight: 'bold' }}>
                {item.Price}
              </div>
              <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
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
