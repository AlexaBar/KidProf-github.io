import React, { useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './IconLoop.css';

const IconLoop = () => {
  const { toy_list } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Extract unique categories
  const categories = [...new Set(toy_list.map((item) => item))];

  // Filter categories based on search term
  const filterData = categories.filter((item) => 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayItem = (items) => {
    return  items.map((item) => {
      // const { name, image, description, price, category } = item;
      // return (
      //   <div className="box" key={name}>
      //     <img className="images" src={image} alt={name} />
      //     <div className="bottom">
      //       <p>{name}</p>
      //       <h2>{price} Lei</h2>
      //       <p>{description}</p>
      //       <p>{category}</p>
      //     </div>
      //   </div>
      // );
    });
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchBar"
          id="searchBar"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="search-body">
        <hr />
        <div className="root">{displayItem(filterData)}</div>
      </div>
    </div>
  );
};

export default IconLoop;
