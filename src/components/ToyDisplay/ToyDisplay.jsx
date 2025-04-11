//The ToyDisplay component dynamically fetches and displays a list of toys from an API endpoint. It includes category-based filtering and utilizes a child component (ToyItem) to render individual toy cards.//

import React, { useState, useEffect } from 'react';
import './ToyDisplay.css'
import ToyItem from '../ToyItem/ToyItem';
import { url, currency } from '../../toyAssets/assets'
const ToyDisplay = ({category}) => {

    const [toy_list, setList] = useState([]);
    const fetchList = async () => {
      try {
          const response = await fetch(`${url}/api/toy/list`);
          if (!response.ok) {
              throw new Error("Failed to fetch toy list");
          }
  
          const result = await response.json();
          if (result.success) {
              setList(result.data);
          } else {
              toast.error("Error");
          }
      } catch (error) {
          console.error("Error fetching toy list:", error);
          toast.error("Error");
      }
  };

    useEffect(() => {
      fetchList();
  }, []);

  const filteredToys = category === 'All' 
  ? toy_list 
  : toy_list.filter(item => item.category === category);

return (
  <div className="toy-display" id="toy-display">
    <h2>Jucării de top</h2>
    
    <div className="toy-display-list">
      {filteredToys.map(item => (
        <ToyItem
          key={item._id}
          image={item.image}
          name={item.name}
          description={item.description}
          price={item.price}
          id={item._id}
        />
      ))}
    </div>
  </div>
);
};

export default ToyDisplay;