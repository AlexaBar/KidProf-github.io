import React from 'react';
import './Footer.css';
import { assets } from '../../toyAssets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
     <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>URMĂREȘTE-NE PE SOCIAL MEDIA
            pentru a fi la curent cu cele mai noi postări publicate.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>

        </div>
        <div className="footer-content-center">
            <h2>INFORMAȚII UTILE</h2>
            <ul>
                <li>Home</li>
                <li>Despre noi</li>
                <li>Retur și schimb</li>
                <li>Termeni și condiții</li>
            </ul>

        </div>
        <div className="footer-content-right">
            <h2>CONTACTEAZĂ-NE</h2>
            <ul>
                <li>+40766352948</li>
                <li>contact@kidsprof.com</li>
            </ul>

        </div>
        
     </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 KidProf - Toate drepturile sunt rezervate.</p>


    </div>
  )
}

export default Footer;
