import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
//Inserted the url in app.jsx page to access that commonly
const Add = ({url}) => {
  //Insert URL.Inserted the url in app.jsx page to access that commonly.so no need this

  //const url="http://localhost:4000";
  //Create 1 state variable with name image and setter function name is setImage since we need to store the uploaded image by the user
  const [image,setImage] =useState(false);
  // Create 1 state variable named data to store image name,desc,price,categry
  const [data,setData]=useState({
        name:"",
        description:"",
        //Store price as string
        price:"",
        // Default category is salad i.e 1st option
        category:"Salad"
  })
  // Onchange Handler Function--so if we change anything in input field,it will be updated in state variable
  //pass event so that which i/p field gets updated,that will also be updated to function
  const onChangeHandler =(event)=>{
     //From this event,need to find event name & Value
     const name=event.target.name;
     const value=event.target.value;
     //Take previous data and update them with new name and value
     setData(data=>({...data,[name]:value}))
  }
  
  //To store the added datas in backend
  const onSubmitHandler = async(event)=>{
  //After adding the image and datas,page is reloading.To prevent reload
  event.preventDefault();
  //Insert image,name,des,price,category in 1 form data
  const formData=new FormData();
  //Insert all datas one by one
  formData.append("name",data.name)
  formData.append("description",data.description)
  // To store price from string as number in backend,use number
  formData.append("price",Number(data.price))
  formData.append("category",data.category)
  formData.append("image",image)
  //To make API call,use axios
  // response--store response from server. Then use post method since we created Add API using post method
  //`${url}/api/food/add`)--this is endpoint where we will upload the product and all field data (name,des etc..) will be stored in database and image will be saved in backend folder
   const response =await axios.post(`${url}/api/food/add`,formData);
   //To check our response is success or fail
   if (response.data.success) {
     //If the data added successfully in database,then reset the firlds in browser where we can able to add another
     setData({
      name:"",
      description:"",
      //Store price as string
      price:"",
      // Default category is salad i.e 1st option
      category:"Salad"
     })
     //Image also will be reset
     setImage(false)
     //Call toast to get notification that the message(Food Added) from foodController.js file of backend in datbase
     toast.success(response.data.message)
   }
   else{
    //Returns error message when error is caught in adding food
    toast.error(response.data.message)
   }

  }

  // whenever we update the data,then this function gets executed and shows the updated datas in console
  // useEffect(()=>{
  //   console.log(data);
  // },[data])


  return (
    <div className='add'>
      {/* To add new product in mongodb database */}
      <form className='flex-col' onSubmit={onSubmitHandler}>
        {/* here 2 classnames--add-img-upload, flex-col */}
        <div className="add-image-upload flex-col">
            <p>Upload Image</p>
            {/* It provides clickable area where we can upload files */}
            <label htmlFor="image">
              {/* To craete preview of the uploaded image in browser,use ternary operator i.e if any image available then show that preview. Otherwise,show the upload icon  */}
              {/* After ? use image state and create 1 URL  */}
               <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            {/* e--event */}
            {/*  It passes the selected file i.e1st file selected by user to a function named setImage. This function would update a state variable to store the selected file. */}
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />

        </div>
        <div className="add-product-name flex-col">
           <p>Product name</p>
           {/* To save product name use data.name */}
           <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} value={data.category} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure veg">Pure veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>

      </form>
    </div>
  )
}

export default Add
