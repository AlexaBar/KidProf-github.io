import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, toy_list, removeFromCart, getTotalCartAmount,url,currency,deliveryCharge}= useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {toy_list.map((item,index)=>{
          if(cartItems[item._id]>0)
            {
              return (
                <div key={index}>
  <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price} Lei</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]}{currency}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>

                </div>
                <hr />
                </div>
              
              )
            }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} {currency}</p>
            </div>
            <div className="cart-total-details">
              <p>Costuri livrare</p>
              <p>{getTotalCartAmount()===0?0:deliveryCharge}{currency}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{ getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge}{currency}</b>
            </div>
            </div>
          <button onClick={()=>navigate('/order')}>FINALIZEAZA COMANDA</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Dacă aveți un cod promoțional, introduceți-l aici</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
