const connection = require("../Model/mysqlconnection");

const findProduct=(req,res)=>{
    const keyword=req.params.keyword || '';
    console.log(keyword);
    if(!keyword)res.send([])
const query=`select * from product `;

connection.query(query,(err,response)=>{
    if(err)
    {
        console.log(err);
    }
    else{
const datas=response;
const filteredData=datas.filter(data=>data.product.toLowerCase().includes(keyword.toLowerCase()));
res.json(filteredData)
    }
})



    
}

const allProducts=(req,res)=>{



    const query=`select * from product `;
    connection.query(query,(err,response)=>{
        if(err)
        {
            console.log(err);
        }
        else{

const products=response
            res.json(products)
        }
    })




}
module.exports={findProduct,allProducts}