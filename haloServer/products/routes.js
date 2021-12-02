
const express=require('express');
const {findProduct,allProducts} = require('./controllers');
const router=express.Router();

router.get('/',allProducts)
router.get('/:keyword',  findProduct) 
module.exports=router