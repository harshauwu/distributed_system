const { log } = require('../services/log.service');

const requestLogger = function(req, res, next) {
    log.debug('request body: ' + JSON.stringify(req.body));
    log.debug('request query: ' + JSON.stringify(req.query));
    log.debug('request headers: ' + JSON.stringify(req.headers));
    next();
};

module.exports = requestLogger;
