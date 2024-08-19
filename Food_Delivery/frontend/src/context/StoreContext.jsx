//Creating this API allows to manage and share the food_list data across different components in the application without having to pass it down through props manually. 
import { createContext, useState, useEffect } from "react"; // Added missing 'useEffect' import
//Since used to get datas from database,remove this import statement
//import { food_list } from "../assets/assets";
import axios from 'axios';


export const StoreContext = createContext(null);

// creating the StoreContext API
const StoreContextProvider = (props) => {
    // create state variable and its name is cartItems to manage the cart data
    const [cartItems, setCartItems] = useState({});
    //To access this url in any component
    const url="http://localhost:4000"
    //Create state varibale to store token and initialize with empty string
    const[token,setToken]=useState("");
    //All foodlist are appearing from assets folder.so change to show those stuffs from database.
    // only then,if new item is added,the frontend show the added items and other related things.
    const [food_list,setFoodList]=useState([])
    // Inserting add to cart functionality
    const addToCart = async (itemId) => {
        // user adding the product in cart for 1st time, in this case 1 entry will be created and key iD will be itemId and the value will be no.of quantity
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        // If the item is already available and quantity is 1 means increase that product quantity in cart
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        // Integrate the backend API of addToCart in frontend
        // if the token is available,whatever item is added in cart will get updated in database
        if (token) {
            //when we logged in,we have token.when we add items in cart that product will be added in cart database also
            // we have to set token in header.so use {headers:{token}}
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    // Add remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            //when we logged in,we have token.when we remove items in cart that product will be removed from cart database also
            // we have to set token in header.so use {headers:{token}}
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

    // // when cart items get updated, log the cart items state. So + or - the products will be managed at StoreContext 
    // // i.e. eg:- (id of the selected product) 1 : 3 (Quantity)
    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]);

    // Create arrow function which returns carttotal
    const getTotalCartAmount= () =>{
        // declared 1 variable and initialize with 0
        let totalAmount=0;
        // Using for loop since cartItems are object and it will provide items 1 by 1 when it gets iterated and these items will be key value of cartItems
        // i.e if the product_id =item, then it is the key value of the cart.It means that product is available in our cart 
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
                {
                   let iteminfo= food_list.find((product)=>product._id===item)
                   totalAmount +=iteminfo.price *cartItems[item];
                }
           
        }
        return totalAmount;
    }
    //Load all food datas from database to this state
    const fetchFoodList= async ()=>{
        //Call API using get method.since foodList API is created using get
        //When hits this API,we get all food items
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)

    }
    // Create 1 arrow function where I added item to cart should remain same even after i reload the page
    const loadCartData=async(token)=>{
        //call API
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        //Save the cartData which we get from response in cartItems.so use setCartItems
        setCartItems(response.data.cartData);
    }
    //To remove the issue of when reloading the website,token gets removed and logged out.
    useEffect(()=>{
    
        //Whenever page is loaded,to execute fetchFoodList which displays all food items from database
        async function loadData() {
            await fetchFoodList();
       //If localstorage has token,execute this if condition where the token state is getting updated with the data from local storage
       //So token not gets removed when user reloads the webpage
             if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                // Call the loadcartData fn so that whenever page is reloaded,the cartItems data will be remain same
                await loadCartData(localStorage.getItem("token"))
        }
        }
        //Call the function
        loadData();
    },[])

    // passing all values here
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
