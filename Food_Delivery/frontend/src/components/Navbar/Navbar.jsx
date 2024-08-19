import React, { useContext, useState } from 'react'  // Corrected the import to include useState
import './Navbar.css'  // Provide path for CSS
import { assets } from '../../assets/assets'
//To navigate between menu,mobile-app,contact us import link and use it
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  // Create state variable to track user interactions named menu and setter function name will be setMenu and initialize with "home" to give underlines
  const [menu, setMenu] = useState("menu");
  // To get red mark on cartbucket only when items are added
  const {getTotalCartAmount,token,setToken} =useContext(StoreContext);
  //when user logged out,send user to homepage
  const navigate=useNavigate();

  //Logic for logout function
  const logout=()=>{
  //  For logout,remove token from local storage
  localStorage.removeItem("token");
  //Remove token from token state
  setToken("");
  //when user logged out,send user to homepage
  navigate("/")
  }

  // If the useState is "home", then active class of home li tag will be applied i.e. home will get underlined and others will not have active class name
  return (
    <div className='navbar'>
      < Link to='/'><img src={assets.logo} alt='' className="logo" /></Link>
      <ul className="navbar-menu">
        {/* active=""--to be without underline, on click is uesd to underline only if user clicked */}
        {/* so, if i click any one.. setMenu function will be called and useState will be updated and it shows underline */}
        {/* Here using 'to' property to navigate to the home page and other href's are used to navigate to respective sections */}
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>Contact Us</a>
        </li>
      </ul>
      <div className="navbar-right">
        {/* If click on logo,it take to home page */}
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          {/* If we click on cart logo,then it will navigate to cart page */}
          <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
          {/* if basket is empty (0), then dot will be hidden i.e it return empty string. if we add a product, then basket will get red dot */}
          <div className={getTotalCartAmount()===0 ?"" :"dot"}></div>
        </div>
        {/* When user not logged in i.e token gets generated only user signed in.so token not generated,then show this signin button.Otherwise show profile */}
        {/* When user logged,the sign in should be set to profile */}
        {/* Link the setShowLogin function with this sign in button */}

        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        :<div className='navbar-profile'>
           <img src={assets.profile_icon} alt="" />
           <ul className="nav-profile-dropdown">
            {/* When orders clicked,it navigate user to myorders page */}
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>
          </div>}

      </div>
    </div>
  )
}

export default Navbar;
