import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar: React.FC = () => {
  return (
    <nav className="header">
      <div className="navigation">
        <Link className="navigation-link" to="/">Meals</Link>
        <Link className="navigation-link" to="/selected-recipes">Favorite Recipes</Link>
        <Link className="navigation-link" to="/search">Search</Link>
        <Link className="navigation-link" to="/filter">Filter</Link>
      </div>
      <div className="header-background"></div>
    </nav>
  );
};

export default NavBar;

