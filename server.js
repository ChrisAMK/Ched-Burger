const express = require("express");

const PORT = process.env.PORT || 8080;

const server = express();

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const expressHandlebars = require("express-handlebars");

server.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

server.use(routes);

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost: + PORT");
});