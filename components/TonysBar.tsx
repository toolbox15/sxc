import React from 'react';

const TonysBar = ({ items, ads, publicBackground }) => {
  // Catch data from either prop name to ensure the menu isn't empty
  const menuData = items || ads || [];

  // Main container using the public folder image (/field-bg.png)
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

  // Dark overlay for text legibility
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
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            color: '#fff', 
            fontSize: '5.5rem', 
            margin: 0, 
            textShadow: '4px 4px 12px rgba(0,0,0,0.9)',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Tony's Bears Den
          </h1>
          {/* Orange accent line */}
          <div style={{ height: '6px', width: '240px', backgroundColor: '#ffa500', margin: '15px auto' }}></div>
        </header>

        {/* Menu Grid Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '30px',
          padding: '0 20px',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {menuData.map((item: any, index: number) => (
            <div key={index} style={{
              background: 'rgba(0, 0, 0, 0.75)',
              borderLeft: '10px solid #ffa500',
              borderRadius: '6px',
              padding: '25px',
              boxShadow: '0 12px 24px rgba(0,0,0,0.6)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ 
                  color: '#fff', 
                  margin: 0, 
                  fontSize: '2.4rem', 
                  textTransform: 'uppercase',
                  fontWeight: '700' 
                }}>
                  {item.Title}
                </h2>
                <span style={{ 
                  color: '#ffa500', 
                  fontSize: '2.2rem', 
                  fontWeight: '900',
                  marginLeft: '15px' 
                }}>
                  {item.Price}
                </span>
              </div>
              <p style={{ 
                color: '#ddd', 
                fontSize: '1.4rem', 
                marginTop: '15px', 
                lineHeight: '1.6',
                fontWeight: '400' 
              }}>
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
