const winston = require('winston');

const loginLogger = winston.createLogger({
    transports: [
       new winston.transports.Console(),
       new winston.transports.File({filename: 'login.log'})
    ]
});

const curdLogger = winston.createLogger({
    transports: [
       new winston.transports.Console(),
       new winston.transports.File({filename: 'crud.log'})
    ]
});


module.exports.loginLogger = loginLogger;
module.exports.curdLogger = curdLogger;