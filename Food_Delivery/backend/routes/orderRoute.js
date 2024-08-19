import express from "express"
import authMiddleware from "../middleware/auth.js"
// import placeorder from ordercontroller file
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"
// Using express,create router
const orderRouter=express.Router();
// Using the above router,can create Xple endpoints
//Endpoint for placeOrder
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
//Add the middleware that will convert the auth token into userId which is used to get all orders of the respective user to show in myorders page
orderRouter.post("/userOrders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;