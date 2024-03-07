import React from 'react';
import { Link } from "react-router-dom";
import "./navbar.css"
import File from "../File/file"
import star from './star.png';

const Navbar = () =>{
  return (
    <div className= "outer-container">
    <div className="flex-container1">
      <nav>
      <div className = "inner-flex-container">
        <div>
          <img src={star} alt="starImage" className='star' />
        </div>
        <div>
          <Link to="/machine" className='link'>Machine</Link>
          <hr className='line' />
        </div>
        <div>
          <Link to="/" className='link'>Terminal</Link>
          <hr className='line' />
        </div>
      </div>
      </nav>
    </div>
    <div className="flex-container2">
      <File />
    </div>
  </div>
  );
}
export default Navbar;