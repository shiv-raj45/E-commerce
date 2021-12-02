const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const deleteWishList=router.delete("/",(req,res)=>{

const {userId,productId}=req.body;
if(!userId || userId==undefined)return res.send("you must login first")
const sql = `delete FROM wishlist where userId =${userId} AND productId=${productId}`;
    connection.query(sql, (error,response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });


});
module.exports=deleteWishList