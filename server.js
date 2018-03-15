// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var dotenv = require('dotenv');
var logger = require('morgan');

// Load environment variables from .env file
dotenv.load();

var app = express();
var port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(serveStatic(__dirname + "/dist"));
app.listen(port);

console.log('server started at port ' + port);
