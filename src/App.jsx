import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import ExploreList from './components/ExploreList/ExploreList'
import IconLoop from './pages/SearchLoop/IconLoop'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'

const App = () => {

  const [showLogin,setShowLogin]=useState(false)
  const handleSearch = (query) => {
    console.log("Search term:", query);
    // Perform a search action, like filtering a list or making an API call
  };

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}    
     <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <IconLoop onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/explore' element={<ExploreList/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/myorder' element={<MyOrders/>}/>
        <Route path='/verify' element={<Verify />}/>
      </Routes>
    </div>
    <Footer/>
    </>
   
  );
}

export default App;

