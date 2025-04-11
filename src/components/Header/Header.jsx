//This React component creates a header section for an online toy store. It introduces the website with a welcoming message and a call-to-action button that navigates users to the "Explore" page.//
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
 
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Magazin online de jucării pentru copii și bebeluși</h2>
        <p>Intră într-o lume plină de surprize și avantaje unice!</p>
        <Link to="/explore">
          <button>Explorează</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
