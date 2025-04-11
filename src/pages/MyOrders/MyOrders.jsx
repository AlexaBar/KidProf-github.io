import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../toyAssets/assets';

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token,currency} = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
        const response = await fetch(`${url}/api/order/userorders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token,
            },
            body: JSON.stringify({}), 
        });

        if (response.ok) {
            const result = await response.json();
            setData(result.data);
        } else {
            console.error("Failed to fetch orders");
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};

useEffect(() => {
    if (token) {
        fetchOrders();
    }
}, [token]);


  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>{currency}{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span>
                {/* is the Unicode character for a black circle */}
                <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders

