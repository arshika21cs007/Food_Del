//Define the model of our user
import mongoose from "mongoose"
//Create Schema for user
const userSchema=new mongoose.Schema({
   //Define the properties that will be in model
       //If we try to store any data these properties,that will not get stored
       name:{type:String,required:true},
       email:{type:String,required:true,unique:true},
       password:{type:String,required:true},
       //To manage the users cart
       cartData:{type:Object,default:{}}
//If this is not false,then this cart data will not be created because we have not provided any data here cartData:{type:Object,default:{}}.
//So that cartData entry will be created without any data

},{minimize:false})
//If the model is already created,that model will be used.otherwise model will be created
const userModel=mongoose.models.user || mongoose.model("user",userSchema);
//export the user model
export default userModel;