// This middleware ensures that only requests with valid JWT tokens can access certain routes (addToCart,removeFromCart,getCart) in  application.
// This middleware get the id from generation of token and verifies it. If it is verified,then the user can access the certain roles (addToCart,removeFromCart,getCart) in the website
import jwt from "jsonwebtoken"
//Create async fn named authMiddleware
//The next function passes control to the next middleware function
const authMiddleware=async(req,res,next)=>{
    //take the token from users using request headers
    const {token}=req.headers;
    if (!token) {
        //If we not get token from user,display this message

        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        //If we have the token,verify it
        //get the token from user using request headers
        //JWT_SECRET--secret text from .env file

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        // While creating token,we get id. While decode also we get that.
        req.body.userId=token_decode.id;
        // If next() is not called, the request will not proceed to the next middleware.
        next();
    } catch (error) {
        // If any error occurs in the process,then this executes
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}
export default authMiddleware;