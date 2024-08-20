const db = require('../config/db.config');
const logger = require('../config/logger.config');

class Order {
    static getAll(callback) {
        const query = 'SELECT Orders.orderId, Orders.product, Sellers.name AS seller, Orders.country, Orders.price FROM Orders JOIN Sellers ON Orders.seller = Sellers.id';
        db.query(query, (err, results) => {
            if (err) {
                logger.log('error', err)
                return callback(err, null);
            }
            logger.log('info', 'getAll at Order retrieved successfully.')
            callback(null, results);
        });
    }
}

module.exports = Order;