const orderItemModel = require('../models/orderItem.model');
const { throwError } = require('../services/util.service');

class OrderItemService {

    async saveOrderItems (data) {
        try {
           return await orderItemModel.insertMany(data);
        } catch (error) {
            throwError(error, true);
        }
    }
}

module.exports = new OrderItemService();