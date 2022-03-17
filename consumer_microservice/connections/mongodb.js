const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config/config');
const { log } = require('../services/log.service');

class MongoDbConnection {
    constructor() {
        this.connectionString = this.getConnectionUrl();
    }

    closeConnection() {
        if (this.db && this.client) {
            log.info('closing the connection');
            this.client.close();
            this.db = undefined;
            this.client = undefined;
        }
    }

    async getConnection() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                log.debug('connection is already made return the existing one');
                return resolve(this.db);
            }

            // Use connect method to connect to the Server
            console.log('voucher db', { connectionString: this.connectionString });
            MongoClient.connect(
                this.connectionString,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
                (err, client) => {
                    if (err) {
                        return reject(err);
                    } else {
                        this.client = client;
                        this.db = client.db(CONFIG.db_name);
                        return resolve(this.db);
                    }
                }
            );
        });
    }

    async getSession() {
        if (this.db && this.client) {
            return this.client.startSession();
        } else {
            await this.getConnection();
            return this.client.startSession();
        }
    }

    async setConnection(db) {
        if (db) {
            this.db = db;
        }
    }

    getConnectionUrl() {
        if (CONFIG.app == 'dev') {
            return `mongodb://${CONFIG.db_host}:27017/${CONFIG.db_name}`;
        } else {
            return (
                'mongodb://' +
        CONFIG.db_user +
        ':' +
        CONFIG.db_password +
        '@' +
        CONFIG.db_host_1 +
        ':' +
        CONFIG.db_port_1 +
        ',' +
        CONFIG.db_host_2 +
        ':' +
        CONFIG.db_port_2 +
        ',' +
        CONFIG.db_host_3 +
        ':' +
        CONFIG.db_port_3 +
        '/?authSource=admin&readPreference=primaryPreferred&replicaSet=' +
        CONFIG.replicaSet
            );
        }
    }
}

module.exports = new MongoDbConnection();
