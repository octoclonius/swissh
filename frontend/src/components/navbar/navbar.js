import React from 'react';
import { Link } from "react-router-dom";
const Navbar = () =>{
  return (
  <div>
    <li>
      <Link to="/machine">Machine</Link>
    </li>
    <li>
      <Link to="/">terminal</Link>
    </li>
  </div>
  );
}
export default Navbar;