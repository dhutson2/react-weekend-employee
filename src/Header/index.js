import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <ul>
        <li><Link to='/'>Register</Link></li>
        <li><Link to='/employees'>Login</Link></li>
      </ul>
    </header>
    )
}


export default Header;