const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function(request, response) {
    burger.selectAll(function(data) {
        let handlebarsObject = {
            burgers: data
        };
        console.log(handlebarsObject);
        response.render("index", handlebarsObject);
    });
});

router.post("/api/burgers", function(request, response) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        request.body.burger_name, request.body.devoured
    ], function(result) {
        response.json({ id: result.insertId })
    });
});

router.put("/api/burgers/:id", function(request, response) {
    let condition = "id = " + request.params.id;

    console.log("condition", condition);

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



module.exports = router;
