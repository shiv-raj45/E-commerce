const express=require('express');
const router=express.Router();
const login=require('./controllers')
const {validateLogin}=require('./middlewares')
router.post('/',validateLogin ,login)



module.exports=router;