const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const filterCategory=router.get("/:id",(req,res)=>{

    const {id}=req.params;
const sql = `select * FROM product where categoryId=${id}`;
    connection.query(sql, (error,response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });


});
module.exports=filterCategory