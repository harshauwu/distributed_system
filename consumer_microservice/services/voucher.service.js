const { ObjectId } = require('mongodb');
const mongoDb = require('../connections/mongodb');
const { log } = require('../services/log.service');

const deleteVoucher = async (orderId, customerId) => {
    try {
        const db = await mongoDb.getConnection();
        return await db.collection('vouchers')
            .deleteOne({
                order_id: ObjectId(orderId),
                customer_id: ObjectId(customerId)
            });
    } catch (err) {
        log.error(`voucher delete exception: ${err.stack}`);
        throw new Error(err);
    }
}
module.exports.deleteVoucher = deleteVoucher;

const saveVoucher = async (data) => {
    try {
        const db = await mongoDb.getConnection();
        return await db.collection('vouchers').insertOne(data);
    } catch (err) {
        log.error(`voucher insert exception: ${err.stack}`);
        throw new Error(err);
    }
}
module.exports.saveVoucher = saveVoucher;

const getVouchersByCustomerAndOrderId = async (orderId, customerId, pendingId) => {
    try {
        const db = await mongoDb.getConnection();
        return await db.collection('vouchers')
            .find({
                order_id: ObjectId(orderId),
                customer_id: ObjectId(customerId),
                status: pendingId
            }, { _id: 1}).toArray();

    } catch (err) {
        log.error(`voucher detail exception: ${err.stack}`);
        throw new Error(err);
    }
}
module.exports.getVouchersByCustomerAndOrderId = getVouchersByCustomerAndOrderId;

const updateVoucher = async (orderId, status) => {
    try {
        const db = await mongoDb.getConnection();
        return  await db.collection('vouchers').updateOne(
            {order_id: ObjectId(orderId)},
            { $set: { status: status}}
        );
    } catch (error) {
        throw error;
    }
}
module.exports.updateVoucher = updateVoucher;