import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>

      <div className='machine-list-outlet'>
        <Outlet />
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