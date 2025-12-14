import React from 'react';

// ==============================
// 1. IMPORT YOUR THEMES HERE
// ==============================
// This tells the Traffic Cop where the files are located
import FinalMenu from './components/FinalMenu'; // This is your Bears/Game Day theme
import MikesBar from './components/MikesBar';   // This is your new Mike's Bar theme
// import TonysBar from './components/TonysBar'; // (Keep this hidden until we create the file)

function App() {
  // ==============================
  // 2. TRAFFIC COP CONTROL
  // ==============================
  // Change the name inside the quotes to switch the TV:
  // Options: "GAME_DAY" or "MIKES_BAR"
  const activeTheme = "MIKES_BAR"; 

  return (
    <div className="min-h-screen bg-black">
      
      {/* If the switch is set to GAME_DAY, show the Bears menu */}
      {activeTheme === "GAME_DAY" && <FinalMenu />}

      {/* If the switch is set to MIKES_BAR, show Mike's menu */}
      {activeTheme === "MIKES_BAR" && <MikesBar />}

    </div>
  );
}

export default App;
