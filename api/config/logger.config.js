var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: 'all-logs.log' })
    ],
});

module.exports = logger;