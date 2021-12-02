import { Avatar } from '@material-ui/core';
import { Keyboard, KeyboardOutlined, LockOpen } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductState } from '../Context/Context';
import SingleItem from './SingleItem'
import './Css/Account.css'
function Account() {
const {state,dispatch}=ProductState()
const [orders, setOrders] = useState([])

    const logOut = () => {
  localStorage.removeItem("accessToken");
   dispatch({ type: "LOGOUT", payload: {auth:false} });
      };

useEffect(()=>{
const fetchOrders= async()=>{
 const {data}= await axios.get(`http://localhost:2000/getorders/${state.id}`)
setOrders(data.map((el)=>{return {
  product:el.productName,rating:el.rating,price:el.price,orderDate:el.orderDate.slice(0,10),quantity:1,id:el.productId}}))

}
fetchOrders()
},[state.id])


    return (
        <div className="account_page"> 
        <div className="account_banner"><Avatar className="account_avatar"> {state.userName[0]}</Avatar> </div>
      <div className="account_controls_container">      
      <span>  <Link  to="/profile/changepassword" className="account_link"> <KeyboardOutlined/>  Change  password</Link></span>
     <span>    <Link to="/login"className="account_link">
            <button onClick={logOut} className="logout_button"><LockOpen/> logout</button>
         </Link></span>
         </div>
         <span className="order_title">  My orders</span>
<div className="my_orders">
{orders.map((product)=><div className="orders_wrapper"> <span className="order_date">order date: {product.orderDate} </span> <SingleItem product={product}/> </div> )}
</div>

        </div>
    )
}

export default Account
