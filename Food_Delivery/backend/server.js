/*Install all the dependencies:-
npm Install
   +
express(Express is a popular web application framework for Node.js, designed to build web and mobile applications)
mongoose(help to connect with database)
jsonwebtoken(used to create authentication system)
bcrypt(encrypt the users data and store  them in database)
cors(gives permission to our frontend to connect with the backend)
dotenv(used to use environment variables in project)
body-parser(used to pass the data which comes through user)
multer(used to create image store system)
stripe(used to add payment gateways on web page)
validator(used to check email-id or password is valid or not)
nodemon(used because when we save our project,the server will get restarted)
"scripts": {
    "server":"nodemon server.js"
  },
 create 1 script. so when we run server,we will execute nodemon server.js.
 so whenever we type npm run server in terminal,then it will execute this server.js file
*/
//({})--means object
//create a module type server where we will use ES6 feature
//To use ES6 feature,open package.json file and include "type": "module",
//create basic express server
//import express from express package
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
//To get env file in the project
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
//Initialize the app using express package
const app=express()
//define port number where our server will be running
const port=4000
//middlewares
//Initialize the middleware. the 1st midddleware is express.json
//This helps whenever we get request from frontend to backend that request will be passed using this json
app.use(express.json())
//with this,we can access the backend from frontend
app.use(cors())

//DB connection
//call DB function cofig/db.js file
//Our DB connected with express app
connectDB();

//API endpoints
//APIs allow the frontend (client) to request data from the backend (server). 
//setting up the routes
//API endpoints for foodRoute
app.use("/api/food",foodRouter)
//To show the newly added image in backend to frontend 
//endpoint address is /images and folder name is uploads
//So the uploads folder exposed on this endpoint
//Actually we mount uploads folder at /images endpoint
//http://localhost:4000/images/1723616925425food_5.png-- eg of how we can see the uploaded image
app.use("/images",express.static('uploads'))
//Set up userRouter 
app.use("/api/user",userRouter)
//Initialise cartRouter from server.js file
app.use("/api/cart",cartRouter)
//Initialise the orderRouter from server.js file
app.use("/api/order",orderRouter)




//get() method--HTTP method. we can request the data from server
//give path to this method where we want to run this endpoint
//give parameters req & res(request & response)
app.get('/',(req,res)=>{
    //Whenever we open this /(endpoint) in browser,we will get this response API Message
  res.send("API Working")
})
//Run the express server and pass port number
app.listen(port,()=>{
//whenever server will be running, display 1 message in console
//Use template literal i.e `(backtick) because we want to use $ i.e to include varible
console.log(`Server Started on http://localhost:${port}`)
})

