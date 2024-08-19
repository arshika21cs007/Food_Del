import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// Used to add payment gateway on webpage
import Stripe from "stripe"
//Use secret key in this file to set up stripe
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing the user's order from frontend
const placeOrder=async(req,res)=>{
//Define the frontend url based on the port number
const frontend_url="http://localhost:5174";
 //Logic to Place the order
 try {
    //creating the new order
    const neworder=new orderModel({
        //define the userid which we get from middleware which gets id from token
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    // save the order in database
    await neworder.save();
    //When the user will place the order,after that clear the user's cart data
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
    // A user adds items to their cart and proceeds to checkout.
    // backend creates a Stripe session using this code, including the items in line_items.
    //The user is redirected to Stripe’s hosted checkout page.
    //After the payment, Stripe redirects the user to either the success or cancel URL based on the payment outcome.
    // frontend uses the information in the URL to update the order status and inform the user.
    //Create payment link using stripe
    //So 1st create the line_items where we insert the product data,Country currency,quantity,unit amount which is necessary fro stripe payment
    const line_items=req.body.items.map((item)=>({
        price_data:{
            // Stripe account is set in India.So use inr(Indian Rupee)
            currency:"inr",
            product_data:{
                name:item.name
            },
            // We get the amount in dollar. so to Convert it to INR,use *80
            unit_amount:item.price*100
            
        },
        quantity:item.quantity
    }))
    //Push delivery charges which needs to be added along with total payment in this line_Items
    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            //Added $2 in frontend for delivery.so use 2*100 and convert it to INR,use *80
            unit_amount:2*100*80
        },
        quantity:1
    })
    //Using line items,create checkout session
    const session =await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        //If the payment is success,redirect user to success page.otherwise,redirect to cancel page
        success_url:`${frontend_url}/verify?success=true&orderId=${neworder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${neworder._id}`,

    })
    //Send session url as response
    res.json({success:true,session_url:session.url})
 } catch (error) {
   console.log(error);
   res.json({success:false,message:"Error"})
    
 }
}
//Creating temporary verification system
const verifyOrder=async(req,res)=>{
  //verify the order payment
  //get orderId and success value
  const {orderId,success}=req.body;
  try {
    //true--string
    if (success=="true") {
        //if success is true,make payment true
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
    }
    else{
    //if payment is cancel,delete the orderId
    
    await orderModel.findByIdAndDelete(orderId);
    res.json({success:false,message:"Not Paid"})


    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
//send users order using the API
//User's order for frontend
const userOrders=async(req,res)=>{
    try {
        //find--used to find all orders of the respective user using their userId which we get it from middleware
        //the userId can be get from token which is generated only when user logged in
        //the orders will be stored in orders
        const orders=await orderModel.find({userId:req.body.userId})
        //send orders as a response
        res.json({success:true,data:orders})
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
        
    }
}

//Listing orders for admin panel
//To find all the orders of all the users which can be used to show in admin page
const listOrders=async(req,res)=>{
  try {
    //Get all orders data and store it in orders variable
    const orders=await orderModel.find({});
    //Using API,send this as response to admin
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
//Create API for updating the order status in database
const updateStatus=async(req,res)=>{
    try {
      //Find the order using id and update the value
      //we get orderid and status from req.body and send that while calling API
      //Status will be updated in database
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
    }
}



export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
