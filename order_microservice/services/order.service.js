const orderModel = require('../models/order.model');
const { throwError } = require('../services/util.service');

class OrderService {

    async saveOrder(data) {
        try {
            return await orderModel.create(data);
        } catch (error) {
            throwError(error, true);
        }
    }
}

module.exports = new OrderService();