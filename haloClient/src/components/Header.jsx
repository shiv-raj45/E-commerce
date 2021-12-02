import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { ProductState } from "../Context/Context";
import "./Css/Header.css";
import { totalProduct } from "../Context/reducer";
import { AccountCircleRounded } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

function Header() {
  const { state, dispatch } = ProductState();
const [scrolled, setScrolled] = useState(false)
const {state:{cart}}=ProductState()



  
  

  return (
    <div className="header" style={{background:scrolled?'black':'initial'}}>
      <nav className="header_navbar">
        <div className="header_left">
          <span className="header_logo">
            <Link to="/home" className="header_link">  FOODY </Link>
          </span>
        </div>
        <div className="header_right">
          <Link className="header_link" to="/home">
            Home
          </Link>
          <Link className="header_link" to="/cart">
       
            cart  {totalProduct(cart)}
          </Link>
          <Link className="header_link" to="/wishlist">
            wishList
          </Link>
          <Link className="header_link" to="/searchpage">
          search
          </Link>


           <span className="header_username"> Hello {state.userName||'Dost'} !!</span>
          {!state.authState ? (
            <>
              <Link className="header_link" to="/login">
                login
              </Link>
              <Link className="header_link" to="/signup">
                signup
              </Link>
            </>
          ) : (
            <Link className="header_link" to="/profile">
             <IconButton> <Avatar className="avatar"> {(state.userName||'Dost')[0].toUpperCase()}  </Avatar> </IconButton>
              
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
