import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  // Access the cartitems,foodlis,removefromcart functionality from the context
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} =useContext(StoreContext);
  // To navigate from cart page to placeOrder page
  const navigate =useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {/* here we will get individual food items one by one and it's index */}
        {food_list.map((item,index)=>{
        // If the food item is in cart,then display that item in cart page
        //If cart contains 1 product i.e >0 with it's itemid 
           if(cartItems[item._id]>0) {
             return (
              // Returning 2 elements,so wrap up them with div tag
              <div>
                <div className="cart-items-title cart-items-item">
                {/* If the product is added to cart, that product name will be display in cart page */}
                {/* <p>{item.name}</p> */}
                {/* If the product is added to cart, that product's details will be display in cart page */}
                {/* Get images from database, use url+"/images/" */}

                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                {/* Return quantity for respective products */}
                <p>{cartItems[item._id]}</p>
                {/* To get total amount, Xply the quantity with the items price */}
                <p>${item.price * cartItems[item._id] }</p>
                {/* To remove product from cart */}
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              {/* Returns 1 horizontal line between each product */}
              <hr />
              </div>
             )
           }
        })}
      </div>

      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
