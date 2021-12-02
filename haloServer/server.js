const  dotenv=require('dotenv').config();
const signupRouter=require('./signup/routes');
const loginRouter=require('./login/routes');
const productsRouter=require('./products/routes')
const express=require('express');
const authRouter=require('./auth')
const cors=require('cors')

const { json } = require('express');
const bodyParser=require('body-parser');
const {addToWishlist} = require('./addToWishList');
const getWishList = require('./getWishList');
const deleteWishList = require('./deleteFromWishlist');
const getCategory = require('./getcategory');
const filterCategory = require('./filtercategory');
const detailsRouter = require('./product.details');
const wishLisTStatus = require('./wishListStatus');
const {postFeedback, deleteFeedback} = require('./feedback');
const { changePassword, changeName } = require('./profile');
const { postOrders, getOrders } = require('./orders');
const app=express();

app.use(cors())
app.use(json());
app.use(bodyParser.json({extended:true}))

app.use('/',signupRouter);
app.use('/login',loginRouter);
app.use("/products",productsRouter);
app.use('/category',getCategory);

app.use('/auth',authRouter);
app.use('/addTowishlist',addToWishlist);
app.use('/getWishList',getWishList);
app.use('/deleteWishList',deleteWishList);
app.use('/category',filterCategory);
app.use('/details',detailsRouter);
app.use('/wishliststatus',wishLisTStatus);
app.use('/feedback',postFeedback)
app.use('/feedback',deleteFeedback);
app.use('/profile',changePassword);
app.use('/profile',changeName);
app.use('/getorders',getOrders)
app.use('/postorders',postOrders)

app.listen(process.env.PORT,()=>{
    console.log(`Everything is happening on http://localhost:${process.env.PORT}`);
})