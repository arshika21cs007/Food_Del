//From this component, we get image,price, description, ID of the food as the props from fooddisplay component
import './FoodItem.css'
import { assets } from '../../assets/assets'
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {

    // to insert add(+) item
    // creating 1 state variable for all products i.e down instead of cartItems[id] there was itemsCount. This is not good. 
    // so to resolve this issue, create 1 cart item object in context and manage the + i.e cart data using manage cart functionality. 
    // Now we gave through cartItems, addToCart and removeFromCart.
    // const [itemCount, setItemCount] = useState(0)

    // Accessing cartItems, addToCart, removeFromCart in FoodItem component using context API
    const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                {/* here using like {image}, {description}, {name}, {price} are all getting from props */}
                {/* Get images from database, use url+"/images/" */}
                <img className='food-item-image' src={url+"/images/"+image} alt='' />
                {
                    // Here we give if the food item count is 0, then provide add button (+). 
                    // If the count is > 0, then provide one counter which + or - the products.
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
                        : <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    )
}

export default FoodItem;
