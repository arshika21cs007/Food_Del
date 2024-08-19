//To create multiplr routes
import express from "express"
import { loginUser,registerUser } from "../controllers/userController.js"
//Create router using express router
const userRouter=express.Router()
//we need data from user like email-id,password to create the user
//So create post method
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
export default userRouter;