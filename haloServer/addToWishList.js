const express = require("express");
const connection = require("./Model/mysqlconnection");
const verifyToken = require("./verifyToken");
const listRouter = express.Router();
const addToWishlist = listRouter.post("/", (req, res) => {
  const { productId, userId } = req.body;
  if (!userId) return res.json({ error: "you are not authorized" });
  const sqlToCheckIfProductIsInWishlist = `select productId from wishlist where productId=${productId} AND userId=${userId}`;
  connection.query(sqlToCheckIfProductIsInWishlist, (error, response) => {
    if (error) {
      console.log(error);
    } else if (response.length > 0) {
      const deleteQuery=`delete from wishlist where productId=${productId} AND userId=${userId}`
      connection.query(deleteQuery,(error)=>{
        if(error)
        {
          res.send(error)
        }
        else{
          console.log('removal successful');
          res.json({id:response[0].productId,added:false})
        }
      })
    } else {
      const sql = `insert into wishlist (productId,userId) VALUES (?,?)`;
      connection.query(sql, [productId, userId], (error) => {
        if (error) {
          res.send(error);
        } else {
          console.log("added to wishList");
          res.json({id:productId,added:true});
        }
      });
    }
  });
});
module.exports = { addToWishlist };
