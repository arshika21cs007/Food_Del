//When user add items in cart and reload the page,those items are removed.
// So to remove this issue
import userModel from "../models/userModel.js"
//Add items to user cart
const addToCart=async(req,res)=>{
//   After verifying the user from auth.js(middleware),if the user find to be valid where the userid should be same as getting from req.body.userId
  try {
    // We will get all datas of user.
    //Can use findById(req.body.userId) also to get id of user
    let userData= await userModel.findOne({_id:req.body.userId});
    // Then using the user data we will extract their cart data and store it in cartData
    // Ensure cartdata exists; if not, initialize it
    let cartData= await userData.cartData ;
    // Whenever user needs to add item in cart,user needs to send token with the itemId
    //If the user add item in cart with its itemId,then if there is no entry of that item in cart means,it will create new entry for that respective product
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId]=1;
    }
    else{
        // If the itemId is already available in cart and user hits it again means increase the quantity of that product
        cartData[req.body.itemId]+=1;
    }
    // When the cart gets updated with items,then need to update the users id with the new cart data
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added To Cart"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});

    
  }
}
//Remove items to user cart
const removeFromCart=async(req,res)=>{
try {
    //   After verifying the user from auth.js(middleware),if the user find to be valid where the userid should be same as getting from req.body.userId using finbyId method
    let userData= await userModel.findById(req.body.userId)
    //Extarct users cart data and store it in cartData
    let cartData=await userData.cartData;
    //CartData should have atleast 1 item
    if (cartData[req.body.itemId]>0) {
        // Check whether the removing item's id is present in cart or not
        //Decrease the item in cart
        cartData[req.body.itemId]-=1;

    }
// To update the users cartData with new {cartData}
await userModel.findByIdAndUpdate(req.body.userId,{cartData});
res.json({success:true,message:"Removed From Cart"})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
    
}
}
//fetch the user cart i.e it shows the item_id data and displays it
const getCart=async(req,res)=>{
  try {
    //   After verifying the user from auth.js(middleware),if the user find to be valid where the userid should be same as getting from req.body.userId using finbyId method
    let userData= await userModel.findById(req.body.userId)
    //Extarct users cart data and store it in cartData
    let cartData=await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
  res.json({success:false,message:"Error"})
  }
}
export{addToCart,removeFromCart,getCart}