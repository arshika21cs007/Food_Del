import React, { useContext, useEffect, useState  } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const PlaceOrder = () => {
  // Insert getTotalCartAmount using context API in storeContext
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  //Create state varible and initialise with object with properties which stores the information entered by users on placeorder frontend page 
  const [data,setData]=useState({
    // ""--string
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  //To save input field data i.e entered info by users in state variable
  const onChangeHandler=(event)=>{
    // name--input field of frontend page
    const name=event.target.name;
    //value--user entered value in placeorder frontend page
    const value=event.target.value;
    //Update the latest value entered by user by replacing previous values with new values for input field
    setData(data=>({...data,[name]:value}))
  }
  // //To verify that we are getting the user entered info in placeorder Page
  // useEffect(()=>{
  //  //whenever data gets updated,the fn will execute
  //  console.log(data);
   
  // },[data])

  //We get all datas entered by user in placeorder page.so creating placeorder arrow function to redirect the user to payment gateway along with those details
  const placeOrder=async(event)=>{
    //To prevent reloading of page whenever we submit this form
    event.preventDefault()
    //Before calling API,structure the orders data as created in API
    //Add the cartItems related data
     let orderItems=[];
     food_list.map((item)=>{
      //if the cart have items with itemid,execute this block
      if(cartItems[item._id]>0){
        //can get all quantity datails for the respective itemid and store it in itemInfo
        //item--object with property quantity
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        //where all item data with its quantity will be inserted in orderItems array
        orderItems.push(itemInfo);
      }

     })
     //To verify the working of orderItems array
     //console.log(orderItems);
     //Need users detail,product details,amount to deliver the product
     let orderData={
      //data i.e firstName,lastName,street etc...all will be stored in address property
      address:data,
      items:orderItems,
      //2--delivery charge
      amount:getTotalCartAmount()+2,
     }
     //send this orderData to backend
     //url--backend url and "/api/order/place" for placing the order
     //{ headers: { token } }--verifies the user's identity and ensures that only authorized users can place an order
     //All these users data,amount,product data will be stored in response
     let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    //  if response is success(true),then we get session url and sending users to session url
    //If the backend confirms the order placement, retrieve a session URL (for a payment gateway, such as Stripe).
    //Redirect the user to this session URL to complete the payment.
     if(response.data.success){
      //get the session_url
      const {session_url}=response.data;
      //window.location.replace changes the current page to the new URL (session_url). This is typically used for navigating the user to a payment gateway where they can complete the payment.
      window.location.replace(session_url);
     }
     else{
      //If response is false,then alert
      alert("Error");
     }
  }
  //navigate to cart page whenever token is not available
  const navigate= useNavigate();

  //When we logout, we cannot see order page i.e hidden until we login again
  useEffect(()=>{
    if (!token) {
      //if token is not available,navigate to cart page 
      navigate('/cart')

      
    }
    //If cart is empty i.e amount for items is 0 when nothing is purchased, send user to cart page
    else if(getTotalCartAmount()===0){
      navigate('/cart')

    }
  //it executes whenever token gets updated i.e user logged in means token will be generated
  },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          {/* required--used because proceed to payment won't work until and unless all I/P fields are filled  */}
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
