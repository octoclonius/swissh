import React, { useState } from 'react';
import MachineList from '../MachineList/MachineList';
import AddMachine from '../AddMachine/AddMachine';
import './Navbar.css';

const Navbar = ({ sessionID, setSessionID }) => {
  const [hostname, setHostname] = useState(null);
  const [addMachineVisible, setAddMachineVisible] = useState(false);

  return (
    <div className='navbar'>
      {
        addMachineVisible
        &&
        <AddMachine
          _hostname={hostname}
          _sessionID={sessionID}
          onCloseHandler={(_hostname, _sessionID) => {
            setAddMachineVisible(false);
            setHostname(_hostname);
            setSessionID(_sessionID);
          }}
        />
      }

      <div className='machine-list'>
        <MachineList
          machines={[{
            hostname: hostname,
            sessionID: sessionID
          }]}
        />
      </div>

      <nav>
        <hr />
        <span className='nav-link' onClick={() => { setAddMachineVisible(true) }}>
          Add Machine
        </span>
        <hr />
        <span className='home'>
          <img src='/logo.png' alt='logoImage' className='logo' />
        </span>
      </nav>
      
    </div>
  );
};

export default Navbar;