import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets'

const MyOrders = () => {
    //Get url and token from backend
    const {url,token}=useContext(StoreContext);
    //fetch all user's data and save in 1 state variable
    const [data,setData]=useState([]);
    const fetchOrders=async()=>{
      //call API 
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        //save the user's all data in state variable data
        setData(response.data.data);
        //console.log(response.data.data);
        
    }
    //To check working of taking userid from token 
    useEffect(()=>{
        //if token is available,execute fetchorders fn
      if (token) {
        fetchOrders();
      }
      //here token--suppose user log in or logout on webpage, we have to again execute this arrow fn
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
          {/* map the data array which we get as response from fetchOrders fn  */}
          {/* index--since we get data in array */}
          {data.map((order,index)=>{
             return (
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  {/* To display thr orderd items 1 by 1 */}

                  <p>{order.items.map((item,index)=>{
                    //along with the item,display quantity also
                    //index===order.items.length-1--if the current index is equal to order.items.length - 1, it means the current item is the last item in the array.
                    //So display without comma
                    if (index===order.items.length-1) {
                        return item.name+" x "+item.quantity
                    }
                    else{
                        //if it has more than 1 item.then display with ,
                        //display all items along with its quantity
                        return item.name+" x "+item.quantity +","

                    }
                  })}</p>
                  <p>${order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  {/* &#x25cf;--bulletin point */}
                  <p><span>&#x25cf;</span><b>{order.status}</b></p>
                  {/* Whenever we click on track order button,it executes fetchOrders() fn and update its status instead of refreshing the page to update the status */}
                  <button onClick={fetchOrders}>Track Order</button>
                </div>
             )
          })}
        </div>
    </div>
  )
}

export default MyOrders
