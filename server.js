// server.js
/**
 * Module dependencies.
 */
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const dotenv = require('dotenv');
const logger = require('morgan');

// Load environment variables from .env file
dotenv.load();

/**
 * Create Express server.
 */
const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(serveStatic(__dirname + "/dist"));
app.listen(port);

console.log('server started at port ' + port);

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
