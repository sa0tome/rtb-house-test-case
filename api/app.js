var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var app = express();
var logger = require('./config/logger.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const sellerRoutes = require('./routes/seller.routes');
const orderRoutes = require('./routes/order.routes');

app.use('/api', sellerRoutes);
app.use('/api', orderRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  logger.log('error', 'Error 404')
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.log('error', 'Error: ', err)

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(500);
});

module.exports = app;
