const express = require("express");
const connection = require("./Model/mysqlconnection");
const verifyToken = require("./verifyToken");
const router = express.Router();
const wishLisTStatus = router.post("/", (req, res) => {
  const { productId, userId } = req.body;
  if (!userId) return res.json({ error: "you are not authorized" });
  const sqlToCheckIfProductIsInWishlist = `select productId from wishlist where productId=${productId} AND userId=${userId}`;
  connection.query(sqlToCheckIfProductIsInWishlist, (error, response) => {
    if (error) {
      console.log(error);
    } else if (response.length > 0) {
      res.json({ id: response[0].productId, added: false });
    }

    else {
        res.json({ id: response[0].productId, added: true });
    }


  });
});
module.exports=wishLisTStatus