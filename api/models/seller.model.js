const db = require('../config/db.config');
const logger = require('../config/logger.config');


class Seller {
    static getAll(callback) {
        const query = 'SELECT Sellers.id, Sellers.name, IFNULL(SUM(Orders.price), 0) AS total FROM Sellers LEFT JOIN Orders ON Orders.seller = Sellers.id GROUP BY Sellers.id';
        db.query(query, (err, results) => {
            if (err) {
                logger.log('error', err)
                return callback(err, null);
            }
            logger.log('info', 'getAll at Seller retrieved successfully.')
            callback(null, results);
        });
    }
}

module.exports = Seller;