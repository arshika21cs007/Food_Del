//Create models to store products in database
import mongoose from 'mongoose'
//create schema for foodmodel where we can describe the food model properties
const foodSchema=new mongoose.Schema({
    //Add object in foodata
    //Add name and define the type of this name property
    //If we try to store any data without name,des,price etc,that will not get stored
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    //store product image URL
    image:{type:String,required:true},
    //category i.e veg or non-veg
    category:{type:String,required:true}
})
//using the above schema,create model
//model name--food,schema--foodSchema
//created this model only once but every time we run this file,the model created again and again. 
//so use mongoose.models.food--where if model already there,it will be used. otherwise,the model will be created 
//||--or operator
const foodModel=mongoose.model("food",foodSchema)
export default foodModel;