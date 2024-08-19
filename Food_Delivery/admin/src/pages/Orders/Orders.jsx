import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
import { assets} from "../../assets/assets"

//url get from app.jsx file where we passed url as a prop
const Orders = ({url}) => {
  //create state variable to store the all orders data of all users which is coming from api of backend
  const [orders,setorders]=useState([]);
  const fetchAllOrders =async()=>{
    //call API
    //get all order details as a response
    const response=await axios.get(url+"/api/order/list");
    if (response.data.success) {
      //if data fetched successfully as a response means store it in orders variable
      setorders(response.data.data);
      //To check this
      //console.log(response.data.data);
      
    }
    else{
      toast.error("Error")
    }
  }
  //When selecting the status option in orders page of admin,the status should be updated in database also
  //It receives the event object (which includes details about the change) and the orderId (the unique identifier of the order being updated).
  const statusHandler=async(event,orderId)=>{
    //To check the fn working i.e getting event and orderId
    //console.log(event,orderId);
    //Whenever we change the status in dropdown,it should be reflected in database.so callAPI
    const response=await axios.post(url+"/api/order/status",{
      //orderId: The ID of the order you want to update.
      //The new status selected in the dropdown. event.target.value retrieves the value of the selected option.
      orderId,
      status:event.target.value
      })
      //If the update was successful,fetchAllOrders() is called and This ensures that the UI reflects the updated status by fetching the latest data from the server.
      if (response.data.success) {
        // Call fetchallOrders fn
        await fetchAllOrders();
        
      }
    
    
    
  }

  //The fetchOrders fn will be executed whenever the orders component will be loaded
  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      {/* To display the orders of all users*/}
      <h3>Order Page</h3>
      <div className="order-list">
        {/* Take individual order of user. so use map method */}
        {orders.map((order,index)=>(
          
          
          // The key prop is important for React to track which items have changed, been added, or removed in a list.
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div >
              {/* Display all the order items name */}
              <p className='order-item-food'>
                {/* Take items 1 by 1 */}
                 {order.items.map((item,index)=>{
                  // Return the item without , since there is only 1 item
                     if (index===order.items.length-1) {
                      return item.name + " x " + item.quantity
                     }
                     else{
                      //Return all items with ,
                      return item.name + " x " + item.quantity +" , "
                     }
                 })}
              </p>
              <p className='order-item-name'>  
                {/* Add users firstName and LastName */}
                {order.address.firstName + " " + order.address.lastname} </p>
                {/* Display users address */}
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                  
                </div>
              <p className='order-item-phone'>{order.address.phone}</p>
                
            </div>
            {/* Display the quantity */}
            <p>Items : {order.items.length}</p>
            {/* Display order amount */}
            <p>${order.amount}</p>
            {/* Create select menu where the status gets updated as out for delivery or delivered from default food processing */}
            {/* Link the statusHandler fn so that status gets updated in backend also */}
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
