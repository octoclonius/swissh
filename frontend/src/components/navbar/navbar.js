import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import MachineList from '../MachineList/MachineList';
import './Navbar.css';

const Navbar = () => {
  const [sessionID, setSessionID] = useState('');

  useEffect(() => {
    const intervalID = setInterval(() => {
      setSessionID(localStorage.getItem('sessionID'));
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className='navbar'>

      {/* Required for add-machine Link */}
      <Outlet />

      <div className='machine-list'>
        <MachineList
          machines={[sessionID] || []}
        />
      </div>

      <nav>
        <hr />
        <Link to='/add-machine' className='nav-link'>
          Add Machine
        </Link>
        <hr />
        <Link to='/' className='home'>
          <img src='/logo.png' alt='logoImage' className='logo' />
        </Link>
      </nav>
      
    </div>
  );
};

export default Navbar;