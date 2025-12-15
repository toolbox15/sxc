import React from 'react';
// ✅ CORRECT - This gives you ALL features

// 1. IMPORT THE CENTRAL ROUTING COMPONENT
// This component (AdDisplay) handles the logic for switching between FinalMenu, MikesBar, TonysBar, etc.
import AdDisplay from './AdDisplay'; 

function App() {
  // 2. RENDER ONLY THE ROUTING COMPONENT
  // This tells React: "Just show the AdDisplay, and let it figure out which theme to display."
  return <AdDisplay />;
}

export default App;
