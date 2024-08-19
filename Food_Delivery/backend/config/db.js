//create logic so that we can connect with database
import mongoose from "mongoose";
//Create 1 asynchronous arrow function which name is connectdb
//export this method so that we can access this function in server.js file
export const connectDB=async () =>{
    //this link is from connection string of our project
    //Include password also
    await mongoose.connect('mongodb+srv://arshikagunasekaran:arshika2610@cluster0.x9mli.mongodb.net/Food_Delivery').then(()=>console.log("DB Connected"));
}













