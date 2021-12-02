const mysql = require("mysql");
const { createProductTable, createWishListTable, createCategoryTable, createFedbackTable, createOrdersTable } = require("./tables");
const connection = mysql.createPool(



  {
    multipleStatements: true,


    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });
connection.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("conected to database");

    createProductTable(connection);
    createWishListTable(connection)
    createCategoryTable(connection);
    createFedbackTable(connection);
    createOrdersTable(connection)

  }
});



module.exports = connection;
