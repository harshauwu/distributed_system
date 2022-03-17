const CONFIG = require('../config/config');
const rTracer = require('cls-rtracer');

const { createLogger, transports, format } = require('winston');
const { printf } = format;

// a custom format that outputs request id
const rTracerFormat = printf(info => {
    const rid = rTracer.id();
    return rid
        ? `${info.timestamp} ${rid} ${info.level}: ${info.message}`
        : `${info.timestamp}: ${info.message}`;
});

const logger = createLogger({
    level: CONFIG.log_level,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        rTracerFormat
    ),
    transports: [
        new transports.File({
            filename: CONFIG.log_path + '/order-service.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5
        }),
        new transports.Console()
    ]
});

module.exports.log = logger;
module.exports.logger = logger;
