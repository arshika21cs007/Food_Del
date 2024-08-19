import express from "express"
//Use addToCart,removeFromCart,getCart to create 3 routes
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";
//create express router
const cartRouter=express.Router();
//Using the above router,create Xple endpoints
cartRouter.post("/add", authMiddleware,addToCart)
cartRouter.post("/remove", authMiddleware,removeFromCart)
cartRouter.post("/get", authMiddleware,getCart)
export default cartRouter;