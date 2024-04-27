import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import WISSHMain from './Components/WISSHMain/WISSHMain';
import './App.css';

const App = () => {
  const [sessionID, setSessionID] = useState(null);

  return (
    <div className='app'>
      <Navbar
        sessionID={sessionID}
        setSessionID={(_sessionID) => { setSessionID(_sessionID) }}
      />
      <WISSHMain
        sessionID={sessionID}
      />
    </div>
  );
}

export default App;