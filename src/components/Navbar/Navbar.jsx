//The Navbar component implements a responsive navigation bar with features like navigation links, a dynamic login/logout button, and access to the cart and user profile.//
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../toyAssets/assets';
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
//
const Navbar = ({setShowLogin}) => {

const [menu,setMenu] = useState("home");
const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
const navigate = useNavigate();
const logout = () => {
  localStorage.removeItem("token");
  setToken("");
  navigate('/')
}

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-list' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={`${menu==="contact"?"active":""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        
            <Link to='/cart'className='navbar-search-icon'>
            <img src={assets.basket_icon} alt="" />
            <div className={getTotalCartAmount()>0?"dot":""}></div>
            </Link>
        
       {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button>
       : <div className='navbar-profile'>
        <img src={assets.profile_icon} alt=""/>
        <ul className='navbar-profile-dropdown'>
          <li onClick={()=>navigate('/myorders')}>
            <img src={assets.bag_icon} alt="" />
            <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="" />
              <p>Logout</p>
            </li>
        </ul>
      </div>
}
</div>
</div>
)
}

export default Navbar;
