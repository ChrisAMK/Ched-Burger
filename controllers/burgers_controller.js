// Requiring all the need packages
const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// On the homepage, use the ORM's SelectAll Function to retreive all Burgers from the MySQL Database
router.get("/", function(request, response) {
    burger.selectAll(function(data) {
        // Create a variable called HandlebarsObject so that can be passed to the Handlebars Package to be included in HTML
        let handlebarsObject = {
            burgers: data
        };
        // Pass the handlebarsobject variable to the index.handlebar files
        response.render("index", handlebarsObject);
    });
});

// This handles when the server receives a POST request, the Orm's InsertOne function is used with the request data
router.post("/api/burgers", function(request, response) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        request.body.burger_name, request.body.devoured
    ], function(result) {
        response.json({ id: result.insertId })
    });
});

// This handles the update functionally but using the UpdateOne function from the ORM with data from the request
router.put("/api/burgers/:id", function(request, response) {
    let condition = "id = " + request.params.id;
    burger.updateOne({
        devoured: request.body.devoured
    }, condition, function(result) {
        if (result.changedRow == 0) {
            return response.status(404).end();
        } else {
            response.status(200).end();
        }
    });
});

// This is a delete feature that was quickly added to Delete devoured Burgers
router.delete("/api/burgers/:id", (request, response) => {
    var condition = `id = ${request.params.id}`;
    burger.deleteOne(condition, result => {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return response.status(404).end();
      } else {
        response.status(200).end();
      }
    });
});

// Export these function to be used by the Server
module.exports = router;
