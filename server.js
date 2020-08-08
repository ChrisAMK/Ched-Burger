// Requiring the Express Module
const express = require("express");
const expressHandlebars = require("express-handlebars");
var routes = require("./controllers/burgers_controller.js");
// Defining the PORT to be used
const PORT = process.env.PORT || 8080;
// defining a variable to the server
const server = express();
// Telling the server to look into the public folder to use Resources, such as javascript files and CSS
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());


// Telling the server to use the Express Handlebars module to handle HTML
server.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
server.set("view engine", "handlebars");
// Telling the server to use the API routes defined in the burgers_controller.js
server.use(routes);

// This function starts the server
server.listen(PORT, function() {
    console.log("Server listening on: http://localhost: + PORT");
});