const {ObjectId} = require('mongodb');
const { STATUS } = require('../constants/voucher.constants');
const voucherService = require('../services/voucher.service');

class voucher {

    async saveVoucher(data) {
        try {
            const savedVoucher = await voucherService.getVouchersByCustomerAndOrderId(data.orderId, data.customerId, STATUS.PENDING.id);
            console.log('*****savedVoucher ****'+JSON.stringify(savedVoucher));
            if(!savedVoucher.length) {
                const voucherDetails = { order_id: ObjectId(data.orderId), customer_id: ObjectId(data.customerId), amount: data.amount, status: STATUS.PENDING.id};
                console.log('**** voucherDetails *****'+JSON.stringify(voucherDetails));
                await voucherService.saveVoucher(voucherDetails);
            } 
        } catch (error) {
            console.log(error.stack);
        }
    }

    async deleteVoucher(data) {
        try {
            const savedVoucher = await voucherService.getVouchersByCustomerAndOrderId(data.orderId, data.customerId, STATUS.PENDING.id);
            console.log('*****savedVoucher ****'+JSON.stringify(savedVoucher));
            if(savedVoucher) {
                await voucherService.deleteVoucher(data.orderId, data.customerId);
            }  
        } catch (error) {
            console.log(error.stack);
        }
    }

    async updateVoucher(data) {
        try {
            const savedVoucher = await voucherService.getVouchersByCustomerAndOrderId(data.orderId, data.customerId, STATUS.PENDING.id);
            console.log('*****savedVoucher ****'+JSON.stringify(savedVoucher));
            if(savedVoucher) {
                await voucherService.updateVoucher(data.orderId, STATUS.COMPLETED.id);
            }  
        } catch (error) {
            console.log(error.stack);
        }
    }
}

module.exports = new voucher();