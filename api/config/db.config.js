const mysql = require('mysql2');
const logger = require('./logger.config')

const connection = mysql.createConnection({
    host: 'mysql',
    port: '3306',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        logger.log('error', err);
        throw err;
    }
    logger.log('info', 'Connected to the MySQL database!');
});

module.exports = connection;