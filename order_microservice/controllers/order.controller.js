const { locales } = require("../locales");
const { log } = require("../services/log.service");
const { validationResult } = require("express-validator");
const SQSClient = require("../services/sqs.aws");
const ObjectId = require("mongoose").Types.ObjectId;

const CONFIG = require("../config/config");
const { STATUS } = require("../constants/order.constants");
const { errorFormatter } = require("../validators/common.validator");
const orderService = require("../services/order.service");
const orderItemService = require("../services/orderItem.service");
const AwsConstants = require("../constants/aws.constants");

const {
  responseError,
  responseSuccess,
  ResponseCode
} = require("../services/util.service");

const saveOrder = async (req, res) => {
  let orderId;
  const customerId = "623298a75e699300815dca5d";
  //const session = await mongoose.startSession();
  //session.startTransaction();
  try {
    validationResult(req)
      .formatWith(errorFormatter)
      .throw();

    const BUSINESS_RULE = CONFIG.business_rule;
    const amount = calculateTotalAmountOfOrder(req.body.items);
    const orderDetails = {
      customer_id: ObjectId(customerId),
      amount: amount,
      status: STATUS.PENDING.id,
      ship_name: req.body.shipping_name,
      shipping_address: req.body.shipping_address
    };
    const orderData = await orderService.saveOrder(orderDetails);

    if (orderData) {
      orderId = orderData._id;
      const orderItemsDetails = manipulateOrderItems(
        req.body.items,
        orderId,
        customerId
      );
      await orderItemService.saveOrderItems(orderItemsDetails);

      if (amount > BUSINESS_RULE) {
        const voucherJobDetails = {
          action: AwsConstants.SQS_MESSAGE_GROUP.VOUCHER_CREATE,
          meta: {
            order_id: orderId,
            customer_id: customerId,
            amount: CONFIG.voucher_amount
          }
        };
        await SQSClient.sendMessage(
          AwsConstants.SQS_MESSAGE_GROUP.VOUCHER_CREATE,
          voucherJobDetails
        );
      }
    }

    //commit the changes if everything was successful
    //await session.commitTransaction();
    return responseSuccess(
      res,
      {
        message: locales.__("messages.success.save_order")
      },
      ResponseCode.SUCCESS
    );
  } catch (error) {
    // if anything fails above just rollback the changes here
    //await rollbackVoucherJob(orderId, customerId);

    // this will rollback any changes made in the database
    //await session.abortTransaction();

    log.error(`Error:: message: ${error.stack}`);
    return responseError(
      res,
      (error.mapped && error.mapped()) || error.message,
      ResponseCode.UNPROCESSABLE_ENTITY
    );
  } finally {
    // ending the session
    //session.endSession();
  }
};

const rollbackVoucherJob = async (orderId, customerId) => {
  const voucherJobDetails = {
    action: AwsConstants.SQS_MESSAGE_GROUP.VOUCHER_DELETE,
    meta: {
      order_id: orderId,
      customer_id: customerId
    }
  };
  await SQSClient.sendMessage(
    AwsConstants.SQS_MESSAGE_GROUP.VOUCHER_DELETE,
    voucherJobDetails
  );
};

const calculateTotalAmountOfOrder = items => {
  let amount = 0;
  for (const item of items) {
    amount += item.unit_price * item.quantity;
  }
  return amount;
};

const manipulateOrderItems = (items, orderId, customerId) => {
  let orderItems = [];
  items.map(item => {
    orderItems.push({
      order_id: ObjectId(orderId),
      customer_id: ObjectId(customerId),
      product_id: ObjectId(item.product_id),
      unit_price: item.unit_price,
      quantity: item.quantity
    });
  });
  return orderItems;
};

module.exports = {
  saveOrder
};
