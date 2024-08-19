import React, {  useContext, useState } from 'react'
import'./LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const LoginPopup = ({setShowLogin}) => {
  //Fetch url using context API
  const {url,setToken}=useContext(StoreContext)
    // create 1 state variable
    //So now use this url for login component
    const [currState,setCurrState]= useState("Login")
    //Connect register & login of user from backend to frontend. so that user can be avail frontend to reg&login instead of opting ThunderClient
    //Create state variable to save the users name,email and password
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
    //onchange event handler will take the datas entered in input field by user in signup page and save it in state variable
    const onChangeHandler=(event)=> {
      //Extracted the value of name attribute i.e I/P field and the user entered values
      const name=event.target.name
      const value=event.target.value
      //Set the new updated values for the previous Values
      setData(data=>({...data,[name]:value}))
    }
    //For userLogin,create function onLogin
    const onLogin= async(event)=>{
    //To prevent reloading
    event.preventDefault()
    //create instance(copy) of url
    let newUrl=url;
    //If current state is login,then newurl will append the login API i.e/api/user/login
    if (currState==="Login") {
      newUrl+="/api/user/login"
      
    }
    else{
      //If cuurent state is not login,then direct to sign up page url i.e register page
      newUrl+="/api/user/register"
    }
    //To Call API using axios package
    //If the state in login or sign up,it will hit the login or registered API accordingly
    //Login and register API created using Post method.so use post method here 
    const response=await axios.post(newUrl,data);
    if (response.data.success) {
      //If user logged in or registered means we get 1 token.To save that token,use 1 state variable
      setToken(response.data.token)
      //Save token in local storage
      //After this,user successfully logged in
      localStorage.setItem("token",response.data.token)
      //Then hide the login page after user logged in
      setShowLogin(false)
    }
    else{
      //It executes if any process gets error
      alert(response.data.message)
    }
    }

    //To verify whether I/P fields are updated,this function will execute and return O/p in console
    // useEffect(()=>{
    //   console.log(data);
    // },[data])
  return (
    <div className='login-popup'>
      {/* Link the onLogin fn with form tag */}
      <form onSubmit={onLogin}  className="login-popup-container">
        <div className="login-popup-title">
            {/* For this created 1 state variable above */}
           <h2>{currState}</h2> 
           {/* If we click X,the popup will be removed */}
           <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
        </div>
        <div className="login-popup-inputs">
            {/* When the state is login,returns fragment(nothing is rendered). Otherwise, render the name  field */}
            {/* Include onChange property to remove old values in the name attributr i.e I/P fields and update it with new values */}
            {currState==="Login" ?<></> :<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="paassword" placeholder='Password' required />

        </div>
        {/* If page is in sign up ,it return create account button. If it is in that state, it have login button which is in login page*/}
        <button type='submit' >{currState==="Sign Up"?"Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use and Privacy policy</p>
        </div>
        {/* If in login page,click the click here means navigate to sign up page and click there login here means navigate to login page */}
        {currState==="Login"
         ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
         :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>

        }
      </form>
    </div>
  )
}

export default LoginPopup
