const express = require('express');

// back in our API router
const router = express.Router();

const orderRoutes = require('./api/v1/order.routes');

router.use('/order', orderRoutes);

/* GET home page. */
router.get('/', function(req, res) {
    res.json({
        status: 'success',
        message: 'Documents Service API',
        data: { version_number: 'v1.0.0' }
    });
});

module.exports = router;
