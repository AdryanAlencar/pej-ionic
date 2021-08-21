import React from 'react';
import { Home } from './pages/home';
import { PlayerContextProvider } from './services/PlayerContext';

function App() { 
  
  return (
    <PlayerContextProvider>
      <Home />
    </PlayerContextProvider>
  );
}

export default App;

