// routes/order.routes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Define the route for getting all orders
router.get('/orders', orderController.getAllOrders);

module.exports = router;