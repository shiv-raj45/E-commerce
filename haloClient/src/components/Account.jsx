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
 const {data}= await axios.get(`http://localhost:2000/getorders/:${state.id}`)
setOrders(data)

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
<div className="my_orders">
<SingleItem product={orders}/>
</div>

        </div>
    )
}

export default Account
