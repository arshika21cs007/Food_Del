//Display food items as a list which are available in database

import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
//Inserted the url in app.jsx page to access that commonly

const List = ({url}) => {
  //Store all data from database in 1 state variable name list and setter function name is setList
  const [list,setList]=useState([]);
  //Insert url.Inserted the url in app.jsx page to access that commonly.so no need this

  //const url="http://localhost:4000"
  //create fetchList function
  const fetchList =async()=>{
    //Add API call
    //At this endpoint--`${url}/api/food/list`, we get food items data
    const response=await axios.get(`${url}/api/food/list`)
    //To check whether we get response
    //It shows the fetched food data from database in console
    //  console.log(response.data);
     
    if (response.data.success) {
      //If this is success,then data has loaded in list variable
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }
  //Remove the added food item from database
  const removeFood=async(foodId)=>{
    //Get the food id in console
    // console.log(foodId);
    //Make API call
    //Use post method because we created removeFood API using post method
    //This will remove the fooditem from the database with the respective id
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
    //After removed the fooditem from database,that updation have to show in foodlist page.so again fetch data from database
    //await means that the code execution will pause at this line until the fetchList() function has completed its execution and returned a result.
    await fetchList();
    if (response.data.success) {
      // It gives message when the food removed from database
      toast.success(response.data.message)
      
    }else{
      toast.error("Error")
    }
  }
  //Whenever component is loaded,this fn will execute once
  //It will fetch the list of food items in database
   useEffect(()=>{
    fetchList();
   },[])

  return (
    //3 classnames
    <div className='list add flex-col'>
       <p>All Foods List</p>
       <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Pass individual items and its index */}
        {list.map((item,index)=>{
          return(
          //Display the food datas that are saved in database one by one in this format
            <div key={index} className='list-table-format' >
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            {/* If click the X,foodId will passed as parameter to this function */}
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
       </div>
    </div>
  )
}

export default List
