import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../toyAssets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const [payment, setPayment] = useState("cod")
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
})

  const {getTotalCartAmount, token, toy_list, cartItems, url, setCartItems,currency,deliveryCharge} = useContext(StoreContext);
  const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    const placeOrder = async (e) => {
        e.preventDefault();
    
        let orderItems = [];
        toy_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item.toy_id] };
                orderItems.push(itemInfo);
            }
        });
    
        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        };
    
        try {
            let response;
            if (payment === "stripe") {
                response = await fetch(`${url}/api/order/place`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    body: JSON.stringify(orderData),
                });
            } else {
                response = await fetch(`${url}/api/order/placecod`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    body: JSON.stringify(orderData),
                });
            }
    
            const result = await response.json();
    
            if (response.ok && result.success) {
                if (payment === "stripe") {
                    window.location.replace(result.session_url);
                } else {
                    navigate("/myorders");
                    toast.success(result.message);
                    setCartItems({});
                }
            } else {
                toast.error("Something Went Wrong");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Something Went Wrong");
        }
    };
    
    useEffect(() => {
        if (!token) {
            toast.error("To place an order, sign in first.");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);
    

    return (
        <form onSubmit={placeOrder} className='place-order'>
          <div className="place-order-left">
              <p className='title'>Informatii pentru livrare</p>
              <div className="multi-field">
                  <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
                  <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
              </div>
              <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
              <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
              <div className="multi-field">
                  <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
                  <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
              </div>
              <div className="multi-field">
                  <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
                  <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
              </div>
              <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
          </div>
          <div className="place-order-right">
              <div className="cart-total">
                  <h2>Cart Totals</h2>
                  <div>
                      <div className="cart-total-details"><p>Subtotal</p><p>{getTotalCartAmount()} {currency}</p></div>
                      <hr />
                      <div className="cart-total-details"><p>Delivery Fee</p><p>{getTotalCartAmount() === 0 ? 0 : deliveryCharge} {currency}</p></div>
                      <hr />
                      <div className="cart-total-details"><b>Total</b><b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge} {currency}</b></div>
                  </div>
              </div>
              <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="cod"?"Place Order":"Proceed To Payment"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder