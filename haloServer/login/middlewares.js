const connection = require("../Model/mysqlconnection");
const bcrypt = require("bcrypt");
const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({error:'fill the field'});
  }
  const userQuery = `select email,password from users where email=${JSON.stringify(
    email
  )}`;

  connection.query(userQuery, async (err, data) => {
    if (err) return res.send(err);
    if (data.length === 1) {
      const passwordmatch = await bcrypt.compare(password, data[0].password);
      if (!passwordmatch) {
        return res.json({error:'Incorrect password'})
      } else {
        next();
      }
    } else {
      return res.json({error:'No such user registered.'})
    }
  });
};

module.exports = { validateLogin };
