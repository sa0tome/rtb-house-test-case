const Order = require('../models/order.model');
const logger = require('../config/logger.config');

exports.getAllOrders = (req, res) => {
    Order.getAll((err, orders) => {
        if (err) {
            logger.log('error', err)
            return res.status(500).json({
                message: 'Error retrieving orders',
                error: err,
            });
        }
        res.json(orders);
    });
};