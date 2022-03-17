const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const CONFIG = require('./config/config');
const { log } = require('./services/log.service');

const {
    VOUCHER_CREATE,
    VOUCHER_DELETE,
    VOUCHER_UPDATE
} = require('./constants/sqs_consumer.constants');
const voucher = require('./voucher/voucher');

AWS.config.update({
    region: CONFIG.aws_region,
    accessKeyId: CONFIG.aws_access_key_id,
    secretAccessKey: CONFIG.aws_secret_access_key
});

const queueUrl = CONFIG.sqs_url;

// Create listen sqs consumer for listening
const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async message => {
        let body = JSON.parse(message.Body);
        console.log('body: ', body);
        const action = body.action;
        log.info('Received Action : ' + body.action);
        log.info('MessageId : ' + message.MessageId);
        log.info(JSON.stringify(message));
        switch (action) {
            case VOUCHER_CREATE:
                voucher.saveVoucher(body);
                break;
            case VOUCHER_DELETE:
                voucher.deleteVoucher(body);
                break;  
            case VOUCHER_UPDATE:
                voucher.updateVoucher(body);
                break;            
            default:
                log.error('Consumer could not complete the action with: ' + action);
                throw new Error('invalid job name: ' + action);
        }
        log.info(`Consumer completed the Action ${action} with MessageId ${message.MessageId}`);
    },
    sqs: new AWS.SQS()
});


app.on('error', err => {
    log.error(err.message);
});

app.on('processing_error', err => {
    log.error(err.message);
});

log.info('SQS service is running');
app.start();
