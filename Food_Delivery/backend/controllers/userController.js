//To give User authentication where user can login or register on web page
//To create login and sign up logic
import userModel from "../models/userModel.js";
//Using jwt to create user Authentication
import jwt from "jsonwebtoken"
//Encrypt the user's data and store that in database
import bcrypt from "bcrypt"
//To check password,email-id is valid or not
import validator from "validator"

//Login user
//create asynchronous function named loginUser
const loginUser=async(req,res)=>{
  //Registered user can login to webpage
  //We need user's emailid,password from req.body
    const {email,password}=req.body;
    try {
        //Check whether the user is available for this entered emailid
        //If any account is available with this emailid,then that user account will be stored in user variable
        const user=await userModel.findOne({email});
        if(!user){
            //If no user with that emailid
            return res.json({success:false,message:"User Doesn't exist"})
        }
        //After getting the user, will match the user's password with the stored password in Database
        //password--user entered,user.password--from database
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch) {
            //If password not matching,then this message will be returned
            return res.json({success:false,message:"Invalid Credentials"})
        }
        //If the passwords are matched,then create 1 token
        const token=createToken(user._id);
        //Send this token as a response
        res.json({success:true,token})
    } catch (error) {
    //Any error in this process means execute catch block
    console.log(error);
    res.json({success:false,message:"Error"})
 
    }
}
//To maintain security and authenticate the user,create token
// create token and send that token using response to the user
//To create token,create function
//id--self generated in mongoDB
const createToken=(id)=>{
//id--Use object to store id and salt--to encrypt the data
//JWT_SECRET--env file variable inserted here
//used userId as a data and generated 1 token and returned
    return jwt.sign({id},process.env.JWT_SECRET)
}
//Register user
//create asynchronous function named registerUser
const registerUser=async(req,res)=>{
 //Allow user to register on website
 //Destructure name,email and password from request body
 //name,password,email--will be stored in these variables
  const {name,password,email}=req.body;
  try {
    //Check the user is already exist with this email-id.If already exist,create response
    //exists--have the emailid of user who is already registered
    const exists=await userModel.findOne({email});
    //If the user entered account already exists,then don't create account
    if (exists) {
        return res.json({success:false,message:"User already exists"})
    }
//validating email format and strong password
//Validate the email is valid or not
if (!validator.isEmail(email)) {
   //If it is invalid,it returns message
    return res.json({success:false,message:"Please enter a Valid Email"})
}
//If email is valid,then check password strength
//If password length is <8,return message
if (password.length<8) {
    return res.json({success:false,message:"Please enter a strong password"})
}
//Encrypting(Hashing) user password
//Add number between 5 to 15.As higher no used means it create strong hashing according to that number. so use 10 here.
//If we used 15,it takes lot of time to encrypt
const salt=await bcrypt.genSalt(10)
//Here password has been hashed  by giving users password and hashed value(salt)
const hashedPassword=await bcrypt.hash(password,salt);
//Create new user using name,email and hashed password
const newUser =new userModel({
    //name,email get from req.body
    name:name,
    email:email,
    //Using hashedPassword
    password:hashedPassword
})
//save the new user in the database in the user variable
const user=await newUser.save()
//To maintain security and authenticate the user,create token
//Take userId and generate 1 token
 const token=createToken(user._id)
 //send this token as a response to the user
 res.json({success:true,token});
  } catch (error) {
    //Any error in this process means execute catch block
    console.log(error);
    res.json({success:false,message:"Error"})
  } 
}
export{loginUser,registerUser}