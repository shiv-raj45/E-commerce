const express=require('express');
const router=express.Router();

const {signup} =require('./controllers');
const {validateForm, checkIfUserAlreadyExists} =require('./middlewares.js')
router.post('/signup',validateForm,checkIfUserAlreadyExists, signup);
module.exports=router