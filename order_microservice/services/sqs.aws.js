const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { log } = require('../services/log.service');
const CONFIG = require('../config/config');

class SQSClient {
    constructor() {
    // Configure the region
        AWS.config.update({
            region: CONFIG.aws_region,
            accessKeyId: CONFIG.aws_access_key_id,
            secretAccessKey: CONFIG.aws_secret_access_key
        });

        // Create sqs client
        this.sqsClient = new AWS.SQS({ apiVersion: '2012-11-05' });
    }

    async sendMessage(messageGroup, messageBody) {
        log.info('****sendMessage****');
        return new Promise((resolve, reject) => {
            const sqsData = {
                MessageBody: JSON.stringify(messageBody),
                MessageGroupId: messageGroup,
                MessageDeduplicationId: uuidv4(),
                QueueUrl: CONFIG.sqs_url
            };
            log.info('SQS message: ' + JSON.stringify(sqsData));
            // Send the order data to the SQS queue
            const sendSqsMessage = this.sqsClient.sendMessage(sqsData).promise();
            sendSqsMessage
                .then(data => {
                    log.info(`SQS | SUCCESS: ${data.MessageId}`);
                    return resolve(data);
                })
                .catch(err => {
                    log.error('SQS failed!');
                    log.error(err);
                    return reject(err);
                });
        });
    }
}

module.exports = new SQSClient();
