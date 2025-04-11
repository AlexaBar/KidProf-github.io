//This React component displays a menu for exploring a list of toys by categories. It allows users to filter the toy list based on the selected category and highlights the currently selected category.//
import React, { useContext } from 'react'
import "./ExploreList.css";
import { StoreContext } from '../../Context/StoreContext'


const ExploreList = ({category,setCategory}) => {

    const {menu_list} = useContext(StoreContext);
    
  return (
    <div className='explore-menu' id='explore-list'>
        <h1>Explorează lista de jucării</h1>
        <p className='explore-menu-text'>Alege dintr-o listă variată de jucării, potrivite fiecărei vârste.</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.list_name?"All":item.list_name)} key={index}className='explore-menu-list-item'>
                        <img className={category===item.list_name?"active":""} src={item.list_image} alt=""/>
                        <p>{item.list_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
      
    </div>
  );
}

export default ExploreList
