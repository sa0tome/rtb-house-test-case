// routes/seller.routes.js
const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');

// Define the route for getting all sellers
router.get('/sellers', sellerController.getAllSellers);

module.exports = router;