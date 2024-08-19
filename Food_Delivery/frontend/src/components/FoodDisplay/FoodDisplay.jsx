import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
// passed property from Home.jsx is using here
const FoodDisplay = ({category}) => {
    // we get food list array using context API
    const { food_list} = useContext(StoreContext)
  return (
    
      <div className="food-diaplay" id="food-display">
        <h2>Top Dishes near you</h2>
        {/* To display multiple food items */}
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                //if we click the image in explore menu,it will filter that particular category of products i.e if category is all,it show complete items. If the particular item is selected, it show the particular product category
                if (category==="All" || category===item.category   ){
                    // return the component(FoodItem) that will take the food data and display that in a card
                    //insert fooditem component and pass the props (id,name,price,description,image)
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>

                }
                //console.log("Selected Category:", category);


            })}
        </div>
      </div>
   
  )
}

export default FoodDisplay
