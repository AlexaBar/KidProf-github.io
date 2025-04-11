import React, { useContext, useState } from 'react';
import './ToyItem.css'
import { assets } from '../../toyAssets/assets';
import { StoreContext } from '../../Context/StoreContext';

const ToyItem = ({ image, name, price, description , id  }) => {

  const [itemCount, setItemCount] = useState(0);  
  const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);
 
  return (
    <div className='toy-item'>
      <div className="toy-item-img-container">
        
       <img className='toy-item-image' src={url+"/images/"+image} alt="" />
        
        {!cartItems[id]
        ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
        : <div className='toy-item-counter'>
           <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>

        }
      </div>
      <div className="toy-item-info">
        <div className="toy-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="toy-item-description">{description}</p>
        <p className="toy-item-price">{price}{currency}</p>
      </div>
    </div>
  )
}

export default ToyItem;
