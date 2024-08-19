import React from 'react';
import './ExploreMenu.css';
// the assets folder contain the menu list array. so use them here
import { menu_list } from '../../assets/assets'
// passed property from Home.jsx is using here
const ExploreMenu = ({ category, setCategory }) => {

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafetd with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {/* here we render the above menu list usig map method where we pass one individual item and index number. passing arrow function i.e =>*/}
        {/* i.e we need to show items and its names one by one. so use map function which iterates and provides item in the index position */}
        {menu_list.map((item,index)=>{
            return (
                // if the previous state is same as item.menu_name then state is All.If Not, set state to item.menu_name
                //i.e if the clicked item’s name is the current state value(prev), clicking it again should reset the filter to show all items. If clicking a different item should set the state to that item’s name, effectively applying the filter to show only items with that name.
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    {/* Here item is object where menu_image is the property i.e added the imported image */}
                    {/* if we click the image,active class name(border) will be added and clicked another image means that active class name will be moved to that image. Then if we click the clicked image again,it will filter the products */}
                    <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt=''/>
                    <p>{item.menu_name}</p>
                </div>
                
            )

        })}
      </div>
      {/* hr--visually divide different sections of content on a page */}
      <hr/>
      
    </div>
  )
}

export default ExploreMenu
