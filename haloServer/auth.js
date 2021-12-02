const express=require('express');
const verifyToken = require('./verifyToken');
const router=express.Router();
const authRouter=router.get('/', verifyToken, (req,res)=>{
    const userName=req.user;
    const id=req.id
    res.json({ userName,success:true,id:id})

});
module.exports=authRouter;