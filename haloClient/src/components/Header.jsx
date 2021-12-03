import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { ProductState } from "../Context/Context";
import "./Css/Header.css";
import { totalProduct } from "../Context/reducer";
import { FavoriteBorderOutlined, FormatColorFillOutlined, HomeOutlined, PersonOutlined, SearchRounded, ShoppingCartOutlined, ShoppingCartRounded } from "@material-ui/icons";

function Header() {
  const { state } = ProductState();
  const { state: { cart } } = ProductState()






  return (
    <div className="header">
      <nav className="header_navbar">
        <div className="header_left">
          <span className="header_logo">
            <NavLink  to="/home" className="header_link">  FOODY </NavLink>
          </span>
        </div>
        <div className="header_right">
          <NavLink className="header_link" activeClassName="nav_active" to="/home">
            <span className="link_title">Home </span> <HomeOutlined/>
          </NavLink>
          <NavLink className="header_link" activeClassName="nav_active" to="/cart">

          <span className="link_title"> cart </span> <ShoppingCartOutlined/> <span className="cart_count"> {totalProduct(cart)}</span>
          </NavLink>
          <NavLink className="header_link" activeClassName="nav_active" to="/wishlist">
          <span className="link_title">  wishList</span> <FavoriteBorderOutlined/>
          </NavLink>
          <NavLink className="header_link" activeClassName="nav_active" to="/searchpage">
           <span className="link_title"> search </span><SearchRounded/>
          </NavLink>


          {!state.authState ? (
            <>
              <NavLink className="header_link" activeClassName="nav_active" to="/login">
              <span className="link_title"> login </span> <PersonOutlined/>
              </NavLink>
              <NavLink className="header_link" activeClassName="nav_active" to="/signup">
               <span className="link_title"> signup </span> <FormatColorFillOutlined/>
              </NavLink>
            </>
          ) : (
            <NavLink className="header_link" activeClassName="nav_active" to="/profile">
       <span className="link_title">Account </span>  <PersonOutlined /> 

            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
