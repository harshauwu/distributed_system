const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/order.controller');
const orderValidator = require('../../../validators/order.validator');

router.post(
    '/',
    orderValidator.validateSaveOrder(),
    orderController.saveOrder
);


module.exports = router;