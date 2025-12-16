// Add this new state inside your App component
const [showAdmin, setShowAdmin] = useState(false);

return (
  <div className="App" style={{ cursor: 'none' }}> {/* Hides cursor for viewers */}
    
    {/* 1. THE SECRET TRIGGER AREA (Bottom Right) */}
    <div 
      onClick={() => setShowAdmin(true)}
      onMouseEnter={(e) => (e.currentTarget.style.cursor = 'default')}
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '40px', // Small enough to be hidden, big enough to click
        height: '40px',
        zIndex: 9999,
        background: 'transparent', // Change to 'rgba(255,0,0,0.1)' to see it while testing
      }}
    />

    {/* 2. THE ADMIN MODAL */}
    {showAdmin && (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        background: '#1a1a1a',
        padding: '30px',
        borderRadius: '15px',
        border: '2px solid #333',
        boxShadow: '0 0 50px rgba(0,0,0,0.8)',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Agency Admin Mode</h3>
        
        <select 
          value={theme} 
          onChange={handleThemeChange} 
          style={{ 
            padding: '12px', 
            fontSize: '18px', 
            borderRadius: '5px',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          <option value="beer">🍺 Beer Theme</option>
          <option value="pizza">🍕 Pizza Theme</option>
          <option value="luxury">🍷 Luxury Theme</option>
        </select>

        <button 
          onClick={() => setShowAdmin(false)}
          style={{
            background: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Close & Save
        </button>
      </div>
    )}

    {/* Render the actual menu */}
    {loading && items.length === 0 ? <StandbyScreen message="Loading..." /> : renderTheme()}
  </div>
);
