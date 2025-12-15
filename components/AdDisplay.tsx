// AdDisplay.tsx - Implementing the Traffic Cop Logic

// ... (Imports remain the same) ...

// Helper function to read the query parameter (Needs to be added)
const getDeviceIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  // Retrieves the deviceId from the URL query string (e.g., ?id=ClientName_Location).
  return params.get('id') || ''; 
};

function AdDisplay({ ads = [] }: AdDisplayProps) { 
  // We no longer use themeName prop, we determine theme internally
  
  const deviceId = getDeviceIdFromUrl().toLowerCase();
  
  // 1. Initialization: The component initializes the theme state as "Corporate".
  let theme = 'Corporate'; 

  // 2. Keyword Routing (Step 3.1)
  if (deviceId.includes('bears')) {
    theme = 'Bears';
  } else if (deviceId.includes('mikesbar')) {
    theme = 'MikesBar';
  } else if (deviceId.includes('tonysbar')) {
    theme = 'TonysBar';
  } else if (deviceId.includes('christmas')) {
    theme = 'Christmas';
  } else if (deviceId.includes('neon')) {
    theme = 'Neon';
  } else if (deviceId.includes('bistro')) { // Keyword Routing
    theme = 'Bistro';
  } else if (deviceId.includes('cinematic')) {
    theme = 'Cinematic';
  } else if (deviceId.includes('space')) {
    theme = 'Space';
  }
  // If no match is found, the theme remains "Corporate".

  // 3. Simple theme router (based on the determined theme)
  switch (theme) {
    case 'Bears':
      return <BearsTheme ads={ads} />;
    case 'MikesBar':
      return <MikesBar ads={ads} />;
    case 'TonysBar': 
      return <TonysBar ads={ads} />;
    case 'Christmas':
      return <ChristmasTheme ads={ads} />;
    case 'Neon':
      return <NeonGameDayTheme ads={ads} />;
    case 'Bistro':
      return <BistroTheme ads={ads} />;
    case 'Cinematic':
      return <CinematicTheme ads={ads} />;
    case 'Space':
      return <SpaceMenu ads={ads} />;
      
    // 4. Rendering the Default View (Step 3.2)
    case 'Corporate':
    default:
      // This will render the corporate view when the deviceId does not match specialized keywords.
      // We will use FinalMenu as the Corporate Default, or return a simple message.
      // e.g., return <FinalMenu ads={ads} />; 
      // or return (<div>Welcome to {deviceId} Waiting for content...</div>);
      return <FinalMenu ads={ads} />; // Assuming FinalMenu is your Corporate White/Default view
  }
}

export default AdDisplay;
