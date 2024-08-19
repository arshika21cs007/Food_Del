// Create 1 order model so that we can save the order in database
import mongoose from "mongoose"
//create orderSchema
const orderSchema=new mongoose.Schema({
    //Define the structure for orderSchema which is necessary to place order by user
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    //Whenever the new order is placed,the status is default i.e food processing 
    status:{type:String,default:"Food Processing"},
    // whenever user placed order,the current time will be shown
    date:{type:Date,default:Date.now()},
    // whenever new order is placed,the payment status is false
     payment:{type:Boolean,default:false}
})
//create orderModel using orderSchema
//If the model  is already created,that model will be used.otherwise model will be created
const orderModel=mongoose.models.order || mongoose.model("order",orderSchema);
//export the model
export default orderModel;