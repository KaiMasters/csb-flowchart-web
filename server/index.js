// External Packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

var app = express();

// Specify Request Headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// TO DO
// app.get("/", function (req, res) {
//   res.render("index.html");
// });


// // 404 Redirect
// app.get("*", function (req, res) {
//   res.render("404.html");
// });


// Start App
app.listen(PORT, function () {
  console.log("CSB Flowchart has started on Port " + PORT);
});