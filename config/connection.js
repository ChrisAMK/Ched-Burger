const mysql = require("mysql");
// Defining the database connection details
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
});
// Connecting to the database with a connect funtion
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});
// Exporting the connection variable to be used elsewhere
module.exports = connection;