const Seller = require('../models/seller.model');
const logger = require('../config/logger.config');

exports.getAllSellers = (req, res) => {
    Seller.getAll((err, sellers) => {
        if (err) {
            logger.log('error', err)
            return res.status(500).json({
                message: 'Error retrieving sellers',
                error: err,
            });
        }
        res.json(sellers);
    });
};