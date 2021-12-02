const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("./Model/mysqlconnection");
const router = express.Router();
const changePassword = router.post("/changePassword", (req, res) => {
  const { password, newPassword, userId } = req.body;

  const sql = `select password FROM users where id=${userId}`;
  connection.query(sql, (error, response) => {
    if (error) {
      return res.send(error);
    } else {
      const encryptedPassword = response[0].password; //authenticating  old password
      bcrypt.compare(password, encryptedPassword, (error, compareResponse) => {
        if (error) {
          return res.send(error);
        } else if (compareResponse === false) {
          return res.json({message:"sorry, password didnot match ;(",success:0});
        } else {
          bcrypt.hash(newPassword, 10, (error, hash) => {
            //hashing and storing new hashed passsword in database
            if (error) console.log(error);

            const updateSql = `UPDATE users SET password=? WHERE id=?`;
            connection.query(updateSql, [hash, userId], (error) => {
              if (error) {
                console.log(error);
              } else {
                res.json({ message: "password updated successfully" ,success:1});
              }
            });
          });
        }
      });
    }
  });
});

const changeName = router.post("/changename", (req, res) => {
  const { password, newName, userId } = req.body;

  const sql = `select password FROM users where id=${userId}`;
  connection.query(sql, (error, response) => {
    if (error) {
      return res.send(error);
    } else {
      const encryptedPassword = response[0].password; //authenticating  old password
      bcrypt.compare(password, encryptedPassword, (error, compareResponse) => {
        if (error) {
          return res.send(error);
        } else if (compareResponse === false) {
          return res.send("password didnot match");
        } else {

            const updateSql = `UPDATE users SET name=? WHERE id=?`;
            connection.query(updateSql, [newName, userId], (error) => {
              if (error) {
                console.log(error);
              } else {
                res.json({ message: "Name updated successfully" });
              }
            });
          
        }
      });
    }
  });
});


module.exports = { changePassword ,changeName};
