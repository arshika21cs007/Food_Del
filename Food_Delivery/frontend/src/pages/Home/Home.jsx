//import React from 'react'
import React, { useState } from 'react';
import'./Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';


const Home = () => {
    // Create state variable to track user interactions named category and setter function name will be category and initialize with one string"All" to 
  const [category, setCategory] = useState("All");
  return (
    <div>
        {/* To insert header component in home page */}
      <Header/>
       {/* To insert Exploremenu component in home page */}
       {/* then we pass state variable in exploremenu as a property */}
       <ExploreMenu category={category} setCategory={setCategory}/>
       {/* Inserting fooddisplay component and pass category state as a prop */}
       <FoodDisplay category={category}/>
       {/* Insert Appdownload component */}
       <AppDownload />

    </div>
  )
}

export default Home
