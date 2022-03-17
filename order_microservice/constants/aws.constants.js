class AWSConstants {
    static get SQS_MESSAGE_GROUP() {
        return {
            VOUCHER_CREATE: 'VOUCHER_CREATE',
            VOUCHER_DELETE: 'VOUCHER_DELETE',
            VOUCHER_UPDATE: 'VOUCHER_UPDATE'
        };
    }
}

module.exports = AWSConstants;
