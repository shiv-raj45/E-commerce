import { ShoppingBasket } from '@material-ui/icons'
import React from 'react'
import './Css/Emptycart.css'
import ShopNowButton from './ShopNowButton'
function EmptyCart() {
    return (
        <div className="empty_cart">
            <h1>Cart is Empty :(  </h1> <h1><ShoppingBasket  className="empty_cart_icon" />  </h1> 
       <ShopNowButton text={'Shop Now'}  />
       
        </div>
    )
}

export default EmptyCart
