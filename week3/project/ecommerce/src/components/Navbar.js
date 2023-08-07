// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link className="nav-product" to="/">
            Products
          </Link>
        </li>
        <li>
          <Link className="nav-favorites" to="/favourites">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
