const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const detailsRouter=router.post('/:id',(req,res)=>{
const {id}=req.params;
const {userId}=req.body
const {categoryId}=req.body

const sql=`select * from product where id=${id} ;
 select * from wishlist where productId=${id} AND userId=${userId || 0};
select feedback.feedbackId,feedback.feedback,feedback.rating,feedback.userId,feedback.productId,users.firstName from feedback,users where feedback.productId=${id} and feedback.userId=users.id ;
select * from product where categoryid IN(select categoryid from product where id=${id}) limit 4 `  

connection.query(sql,(error,response)=>{
    if(error)
    {
        console.log(error);
    }
    else{
console.log(response);
        
if(response[1].length>0)
{
    res.json({productDetails:response[0][0],wishListStatus:{added:true},feedbacks:response[2],recommended:response[3]});

}
else{
    res.json({productDetails:response[0][0],wishListStatus:{added:false},feedbacks:response[2],recommended:response[3]});

}

        console.log(response);
    }
})
});
module.exports=detailsRouter