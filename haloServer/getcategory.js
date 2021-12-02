const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const getCategory=router.get('/',(req,res)=>{

const sql=`SELECT * FROM category`;
connection.query(sql,(error,response)=>{
    if(error)
    {
        res.send('error occured')
    }
    else
    {
        res.send(response)
    }
})


});
module.exports=getCategory