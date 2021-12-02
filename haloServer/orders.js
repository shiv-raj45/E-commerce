const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const postOrders=router.post("/",(req,res)=>{

const {productdetails, userId}=req.body;
if(!userId || userId==undefined)return res.send("you must login first");
const orderDate=new Date().toDateString()
const allProducts=productdetails.map(product=>{
  return [product.productName,product.rating,product.price,orderDate, userId]
});
console.log(allProducts);
const sql = `INSERT INTO orders  (productName,rating,price,orderdate,userId) values ?`;

    connection.query(sql,[allProducts], (error,response) => {
      if (error) {
        res.json({successful:false});
    
      } else {
        res.json({successful:true});
      }
    });
    


});

const getOrders=router.get("/:userId",(req,res)=>{

  const { userId}=req.params;
  if(!userId || userId==undefined)return res.json({message:"you must login first"});
  const sql = `select * from orders where userId=${userId}`;
  
      connection.query(sql, (error,response) => {
        if (error) {
          res.json({successful:false});
      
        } else {
          res.send(response);
        }
      });
    })
  

module.exports={postOrders,getOrders}