const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const mongoose = require('mongoose');

const CONFIG = require('../config/config');
const { log } = require('../services/log.service');

const models = {};

if (CONFIG.app == 'test') {
    CONFIG.db_host = CONFIG.test_db_host;
    CONFIG.db_port = CONFIG.test_db_port;
    CONFIG.db_name = CONFIG.test_db_name;
    CONFIG.db_user = CONFIG.test_db_user;
    CONFIG.db_password = CONFIG.test_db_password;
}

/**
 * DB Connection for modules
 */
if (CONFIG.db_host !== '') {
    // eslint-disable-next-line no-unused-vars
    const files = fs
        .readdirSync(__dirname)
        .filter(file => {
            return (
                file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
            );
        })
        .forEach(file => {
            var filename = file.split('.')[0];
            var modelName = filename.charAt(0).toUpperCase() + filename.slice(1);
            models[modelName] = require('./' + file);
        });

    mongoose.Promise = global.Promise; // set mongo up to use promises

    if (CONFIG.db_server === 'atlas') {
        const mongoLocation =
      'mongodb+srv://' +
      CONFIG.db_user +
      ':' +
      CONFIG.db_password +
      '@' +
      CONFIG.db_host;
        mongoose.connect(mongoLocation, { dbName: CONFIG.db_name }).catch(err => {
            log.error('*** Can Not Connect to Atlas Mongo Server:', err);
        });
    } else {
        if (CONFIG.app == 'dev') {
            if (!CONFIG.db_user) {
                const mongoLocation = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
                log.info('**** mongoLocation ****'+JSON.stringify(mongoLocation));
                mongoose
                    .connect(mongoLocation, {
                        useNewUrlParser: true,
                        useFindAndModify: false
                    })
                    .catch(err => {
                        log.error('*** Can Not Connect to Local Mongo Server:', err);
                    });
            } else {
                const mongoLocation =
                    'mongodb://' +
                    CONFIG.db_user +
                    ':' +
                    CONFIG.db_password +
                    '@' +
                    CONFIG.db_host +
                    ':' +
                    CONFIG.db_port +
                    '/' +
                    CONFIG.db_name +
                    '?' +
                    'authSource=admin';
                log.info('**** mongoLocation ****'+JSON.stringify(mongoLocation));    
                mongoose
                    .connect(mongoLocation, {
                        useNewUrlParser: true,
                        useFindAndModify: false
                    })
                    .catch(err => {
                        log.error('*** Can Not Connect to Local Mongo Server:', err);
                    });
            }
        } else if (CONFIG.app != 'test') {
            const mongoLocation =
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
            '/' +
            CONFIG.db_name +
            '?authSource=admin&replicaSet=' +
            CONFIG.replicaSet;
                mongoose
                    .connect(mongoLocation, {
                        useNewUrlParser: true,
                        useFindAndModify: false
                    })
                    .catch(err => {
                        log.error('*** Can Not Connect to Local Mongo Server:', err);
                    });
            }
    }

    const db = mongoose.connection;
    module.exports = db;
    db.once('open', () => {
        log.info('Connected to mongo');
    });
    db.on('error', error => {
        log.error('error', error);
    });
    // End of Mongoose Setup
} else {
    log.error('No Mongo Credentials Given');
}

module.exports = models;
