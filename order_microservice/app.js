const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const rTracer = require('cls-rtracer');
const bodyParser = require('body-parser');
const parseError = require('parse-error');
const swaggerUi = require('swagger-ui-express');

const { log } = require('./services/log.service');
const { httpLogger, requestLogger } = require('./middleware/index');
const CONFIG = require('./config/config');
const routes = require('./routes/routes');

// DATABASE
require('./models');

// Create global app object
var app = express();

const corsOptions = {
    origin: CONFIG.origin
};

// Set application security headers
if (CONFIG.app !== 'dev') {
    // Sets "X-Frame-Options: SAMEORIGIN"
    app.use(
        helmet.frameguard({
            action: 'sameorigin',
        })
    );
}

// CORS
app.use(cors(corsOptions));

// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

morgan.token('id', function getId(req) {
    return req.id;
});

// use log middleware
app.use(rTracer.expressMiddleware());
app.use(httpLogger);
app.use(morgan('combined'));

if (CONFIG.app !== 'prod') {
    app.use(requestLogger);
}

// Log Env
log.info(`ENVIRONMENT: ${CONFIG.app}`);

app.use('/order-service/v1', routes);

if (CONFIG.app === 'dev' || CONFIG.app === 'qa') {
    const swaggerSpec = require('./config/swagger').spec();
    app.use(
        '/order-service/v1/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            customSiteTitle: 'Order API Documentation',
            customCss: '.topbar { display: none }',
            swaggerOptions: {
                persistAuthorization: true
            }
        })
    );
    app.get('/order-service/v1/swagger.json', (req, res) => {
        res.json(swaggerSpec);
    });
    app.use('/order-service/logs', express.static('logs'));
}

app.use('/order-service/health', function(req, res) {
    res.statusCode = 200; // send the appropriate status code
    res.json({
        status: 'success',
        message: 'Order Service is Healthy',
        data: {}
    });
});

app.use('/', function(req, res) {
    // send the appropriate status code
    res.statusCode = 200;
    res.json({
        status: 'success',
        message: 'Welcome to Order Service API',
        data: {}
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

process.on('unhandledRejection', error => {
    log.error('Uncaught Error', parseError(error));
});
