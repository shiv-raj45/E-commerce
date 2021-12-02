const jwt=require('jsonwebtoken');
const connection = require('../Model/mysqlconnection');
const login=(req,res)=>{
const {email}=req.body;
    const jwtToken=jwt.sign(email,`SOME_SECRET_KEY`);

    const sql = `select id,firstName from users where email=${JSON.stringify(
        email
      )}`;
      connection.query(sql, (error, response) => {
        if (error) {
          return res.send(error);
        } else {
          user = response[0].firstName;
          id=response[0].id

        
          res.json({token:jwtToken,userName:user,email:email,id:id })
        }
      
    })
}

module.exports=login