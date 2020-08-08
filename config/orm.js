const connection = require("./connection.js");

// Helper functions below, used inside the main functions that will be exported
const printQuestionMarks = (num) => {
    let array = [];
    for (let i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}
// Another Helper function that converts object KEY: Value to string KEY=Value, helpful for MySQL query syntax.
const objToSql = (object) => {
    var array = [];
    
    for (let key in object) {
        let value = object[key];

        if (Object.hasOwnProperty.call(object, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}

const orm = {
    selectAll: function(tableValue, callback) {
        console.log("selectAll");
        var queryString = "SELECT * FROM " + tableValue + ";";
        connection.query(queryString, function(err, response) {
        if (err) throw err;
        callback(response);
        });
    },
    insertOne: function(table, columns, values, callback) {
        console.log("insertOne");
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(values.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, values, function(err, response) {
            if (err) throw err;
            callback(response);
        });
    },
    updateOne: function(table, objectColumnKeyAndValue, condition, callback) {
        console.log("updateOne");
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objectColumnKeyAndValue);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, response) {
            if (err) throw err;
            callback(response);
        });
    },
    deleteOne: function(table, condition, callback) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          callback(result);
        });
      }
}

module.exports = orm;