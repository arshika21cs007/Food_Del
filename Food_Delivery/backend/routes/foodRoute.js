import express from "express"
//using the controller function created in foodController.js,create route
import { addFood,listFood,removeFood } from "../controllers/foodController.js"
//import multer to create the image storage system
import multer from "multer"
//create express router with router name is foodRouter
//using this router,we can create get,post and many other methods
const foodRouter=express.Router();

//Image Storage Engine
//create storage using multer disk storage method
const storage=multer.diskStorage({
    //give destination property where the image needs to store
    destination:"uploads",
    //cb--callback
    filename:(req,file,cb)=>{
        //return null and use template literal(`) to rename the file and add unique name for each image. so for that create timestamp to make the filename unique and add extension i.e ${file.originalname}
        //whenever we upload file,the timestamp will be added in the fileoriginalname and it will create a unique name and that file will stored in uploads folder
         return cb(null,`${Date.now()}${file.originalname}`)
    }
})
//Middleware upload is created which stores images in uploads folder
//here object is storage
const upload=multer({storage:storage})

//create post method to send data to server and server will process the data and we get response
//endpoint address /add and this address we run addFood function
//To use this middleware in route which enables us to upload images, use upload.single("image")
foodRouter.post("/add",upload.single("image"),addFood)
//create endpoint i.e/list using get method
foodRouter.get("/list",listFood)
//Create endpoint i.e /remove using post method
foodRouter.post("/remove",removeFood);

export default foodRouter;