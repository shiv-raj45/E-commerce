const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const getWishList=router.post("/",async(req,res)=>{

  const {userId}=req.body;
if(!userId || userId==undefined)return res.send("you must login first")
const sql = `select DISTINCT product.id,product.price,product.product,product.rating,product.quantity,product from product,wishlist,users where wishlist.userId=${userId} and wishlist.productId=product.id
`;
   await connection.query(sql, (error,response) => {
      if (error) {
        res.send(error);
      } else {
 res.send(response)
      }
    });


});
module.exports=getWishList