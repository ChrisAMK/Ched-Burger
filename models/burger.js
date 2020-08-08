const orm = require("../config/orm.js");

var burger = {
    selectAll: function(callback) {
        orm.selectAll("burgers", function(response) {
            callback(response);
        })
    },
    insertOne: function(columns, values, callback) {
        orm.insertOne("burgers", columns, values, function(response) {
            callback(response);
        });
    },
    updateOne: function(objectColumnKeyAndValue, condition, callback) {
        orm.updateOne("burgers", objectColumnKeyAndValue, condition, function(response) {
            callback(response);
        });
    },
    deleteOne: function(condition, callback) {
        orm.deleteOne("burgers", condition, function(response) {
            callback(response);
        });
    }
};

module.exports = burger;