const connection = require("../Model/mysqlconnection");
const validateForm = (req, res, next) => {
  const validationErrors = {};
  const { firstName, lastName, email, address, password, confirmPassword } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !password ||
    !confirmPassword
  ) {
    validationErrors.formEmpty = "All the  fields should be filled";
  } else if (firstName.length <= 1) {
    validationErrors.firstNamelength =
      "firstName Length must be at least 2 characters long";
  } else if (password.length <= 4) {
    validationErrors.passwordLength =
      "password Length must be at least 6 characters long";
  } else if (password !== confirmPassword) {
    validationErrors.passwordMatch = "Two password did not match";
  }

  if (Object.keys(validationErrors).length <= 0) {
    next();
  } else {
    return res.json(validationErrors);
  }
};

const checkIfUserAlreadyExists = (req, res, next) => {
  const userQuery = `select email from users where email=${JSON.stringify(
    req.body.email
  )}`;
  connection.query(userQuery, (err, email) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else if (email.length <= 0) {
      next();
    } else {
      return res.json({success:0,message:"This email is already in use"});
    }
  });
};
module.exports = { validateForm, checkIfUserAlreadyExists };
