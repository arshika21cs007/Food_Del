//create API's which enables us to add the new food item in DB
import foodModel from "../models/foodModel.js";
//import filesystem(fs) which is prebuilt in node.js
import fs from 'fs'
//add controller function to add food item

const addFood = async (req,res) =>{
 //To add product data in database
 //Add 1 variable to store the uploaded image name
 let image_filename=`${req.file.filename}`
 //Create new food using foodmodel
  const food = new foodModel({
    //Define the new food item with respective values in food schema
    //So whenever we hit this API,in the body we will send these details and we will access it in backend using this function
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})
//try-catch block
try{
    //this method used to save the food item in database
    await food.save();
    //Add response (res) with json method and send success as a response object
    res.json({success:true,message:"Food Added"})
} catch (error){
 //Catch block executes if any error found during saving of food  item
  console.log(error)
  //Success is false. since fooditem is not added
  res.json({success:false,message:"Error"})
}

}

//List food API endpoint
//We can display all food items listed in database
const listFood=async (req,res)=>{
   //Access all fooditems and send them as response
   try{
    //using this model,we can fetch all details like name,des etc.. of food items
     const foods=await foodModel.find({});
     res.json({success:true,data:foods})
   }catch(error){
   //Executes when it finds any errors
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}
//To remove food items from database
const removeFood=async(req,res)=>{
  try{
    //To find the food item using id which is unique for all images that we want to delete 
    //So that food item will be stored in food variable 
    const food=await foodModel.findById(req.body.id);
    //Delete that image of food item from uploads folder
    fs.unlink(`uploads/${food.image}`,()=>{})
    //Using this id we have to delete the removed product datasfrom mongodb
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
  }catch(error){
    //It executes when there is an error found
    console.log(error);
    res.json({success:false,message:"Error"})

  }
}
//export functions
export{addFood,listFood,removeFood}