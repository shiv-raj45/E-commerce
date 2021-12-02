const jwt = require("jsonwebtoken");
const connection = require("./Model/mysqlconnection");
const verifyToken = (req, res, next) => {
  
  const validToken = req.headers.authorization;
  console.log(validToken);
  if (!validToken || (validToken == 'null')) {
    return res.json({ error: "You are not logged in", success: false });
  }
  const datas = jwt.verify(validToken, "SOME_SECRET_KEY");
    const sql = `select id,firstName from users where email=${JSON.stringify(
      datas
    )}`;
    connection.query(sql, (error, response) => {
      if (error) {
        return res.send(error);
      } else {
        req.user = response[0].firstName;
        req.id=response[0].id
        next();
      }
    });
  }
;
module.exports = verifyToken;
