import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    //To find the url parameter i.e in header of browser,use searchparams
    const[searchParams,setSearchParams]=useSearchParams();
    //true from verify page will store in success variable
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    //to check whether we get values in console screen
    //console.log(success,orderId);
    //Get backend url from context API
    const {url}=useContext(StoreContext);
    //To navigate the user to myOrders page
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        //call API and get response
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
            //Navigate the users to myOrders page
              navigate("/myorders");
        }
        else{
            //If payment is failed,navigate users on home page
            //Then the order will be removed from orders of database where the logic is provided in backend
            navigate("/");

        }
    }
    //to check navigation
    useEffect(()=>{
        verifyPayment();
    },[])
    
    return (
    <div className='verify'>
        {/* display the spiiner in the webpage until payment gets verified */}

        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify
