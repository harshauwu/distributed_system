const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const faker = require('faker');
const ObjectId = require('mongoose').Types.ObjectId;

const orderModel = require('../../../models/order.model');
const { log } = require('../../../services/log.service');

class DataSeeder {
    constructor() {
        this.mongoServer = new MongoMemoryServer();
    }

    async initializeOrderDatabase() {
        await this.setupOrderDatabase();
        const initData = {};

        // init orders
        initData.orders = await new Promise((resolve, reject) => {
            orderModel.insertMany(
                Array(faker.random.number({ min: 10, max: 50 }))
                    .fill(0)
                    .map(() => {
                        return {
                            ship_name: faker.company.companyName(),
                            shipping_address: faker.company.companyName(),
                            amount: faker.random.number({min: 20, max: 150}),
                            customer_id: ObjectId('623298a75e699300815dca5d'),
                            status: faker.random.number(5)
                        };
                    }),
                (err, docs) => {
                    if (err) reject(err);
                    resolve(docs);
                }
            );
        });

        return initData;
    }

    async setupOrderDatabase() {
        const uri = await this.mongoServer.getUri();

        await new Promise((resolve, reject) => {
            mongoose
                .connect(uri, {
                    useNewUrlParser: true,
                    useFindAndModify: false
                },
                (err, client) => {
                    if (err) {
                        return reject(err);
                    } else {
                        this.db = client;
                        return resolve(this.db);
                    }
                });
        });

        mongoose.connection.once('open', async () => {
            log.info('Connected to mongo');
            await this.createCollections();
        });
        mongoose.connection.on('error', error => {
            log.error('error', error);
        });
    }

    async createCollections() {
        await this.db.createCollection('orders');
    }

    async clearOrderDatabase() {
        await orderModel.deleteMany({});
        await this.closeDbConnection();
    }

    async closeDbConnection() {
        await mongoose.connection.close();
        await this.mongoServer.stop();
    }
}

module.exports = new DataSeeder();
