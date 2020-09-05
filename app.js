var express     = require('express');
var router      = require('./routes.js');

var app = express();


// Parsing request through the middlewares
app.use((req, res, next) => {
  // Setting the HEADERS
  next();
});

app.use((req, res, next) => {
  // LOGGING the request
  console.info(`[REQUEST]: ${req.originalUrl} (${req.method}); [FROM]: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  next();
});

app.use((req, res, next) => {
  // AUTHENTICATION of the request
  next();
});

// Stablishing routes in the API
app.use('', router);

module.exports = app;
