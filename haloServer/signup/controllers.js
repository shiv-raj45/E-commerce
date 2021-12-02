 const connection=require('../Model/mysqlconnection');
 const bcrypt=require('bcrypt')
 const signup=async(req,res)=>{
    const { firstName, lastName, email, address, password, confirmPassword } =
req.body;

const checkUsers=`select email from users where email=${email} `;
connection.query(checkUsers,(error,response)=>{
    if(error){console.log(`signup error ${error}`);}
    else{
        if(response.length>=1){
            return res.json({message:'This email is already in use',success:0})
        }
    }


})

const hashedPassword=await bcrypt.hash(password,10);

const insertQuery=`INSERT INTO users (firstName,lastName,email,address,password) VALUES (?,?,?,?,?)`;
connection.query(insertQuery,[firstName,lastName,email,address,hashedPassword],(err)=>{
    if(err){
        console.log(err);
        return res.send(err)
    }
    else{
        console.log('inseretion successful');
        res.json({message:'This email is already in use',success:1})
    }
})
}
    module.exports={signup}