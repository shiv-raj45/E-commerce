const express=require('express');
const connection = require('./Model/mysqlconnection');
const router=express.Router();
const postFeedback=router.post('/',(req,res)=>{
const {feedback,rating,userId,productId }=req.body;

if(!userId) return res.send('you are not authorized')
const sql=`insert into feedback (feedback,rating,userId,productId) values (?,?,?,?)`;
connection.query(sql,[feedback,rating,userId,productId],(error,response)=>{
    if(error)
    {
        res.send('error occured')
    }
    else
    {
        res.json({message:"feedback sent successfully"})
    }
})


});


const deleteFeedback=router.post('/delete', (req,res)=>{
const {feedbackId,productId}=req.body;
console.log(feedbackId,productId);

const sql=`delete from feedback where feedbackId=? AND productId=?`;
connection.query(sql,[feedbackId,productId],(error,response)=>{
    if(error)
    {console.log(error);
        res.send(error)
    }
    else
    {
        res.json({message:"feedback  deleted successfully"})
    }
})



})

module.exports={postFeedback,deleteFeedback}