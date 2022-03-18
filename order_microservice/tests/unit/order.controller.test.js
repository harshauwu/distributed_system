const faker = require("faker");
const request = require("supertest");
const app = require("../../app");
const { locales } = require("../../locales/index");
const orderEndpoint = "/order-service/v1/order";
const dbSeeder = require("./util/db_seeder");

let testData;

beforeAll(async () => {
  testData = await dbSeeder.initializeOrderDatabase();
});

afterAll(async () => {
  testData = null;
  await dbSeeder.clearOrderDatabase();
});

const orderService = require("../../services/order.service");

describe("Order Controller", () => {
  describe(`POST ${orderEndpoint}`, () => {
    describe("Request validators", () => {
      test("it should return 422 with shipping name required validation", async done => {
        const response = await request(app)
          .post(orderEndpoint)
          .type("json")
          .send({
            items: [
              {
                product_id: "623298a75e699300815dca5d",
                unit_price: 60,
                quantity: faker.random.number({ min: 2 })
              }
            ],
            shipping_address: "test address"
          });
        expect(response.status).toBe(422);
        done();
      });

      test("it should return 422 with shipping address required validation", async done => {
        const response = await request(app)
          .post(orderEndpoint)
          .set({
            items: [
              {
                product_id: "623298a75e699300815dca5d",
                unit_price: 60,
                quantity: faker.random.number({ min: 2 })
              }
            ],
            shipping_name: "harsha lakmal"
          })
          .type("json")
          .send({});

        expect(response.status).toBe(422);
        done();
      });

      test('it should return 422 with items should be an array', async done => {
          const response = await request(app)
          .post(orderEndpoint)
          .set({
            items: {},
            shipping_address: "test address",
            shipping_name: "harsha lakmal"
          })
          .type("json")
          .send({});

        expect(response.status).toBe(422);
        done();
      });
    });

    describe("200 status", () => {
      test("it should return 200", async done => {
        const response = await request(app)
          .post(orderEndpoint)
          .type("json")
          .send({
            items: [
              {
                product_id: "623298a75e699300815dca5d",
                unit_price: 60,
                quantity: faker.random.number({ min: 2 })
              }
            ],
            shipping_name: "harsha lakmal",
            shipping_address: "test address"
          });
        expect(response.status).toBe(200);
        done();
      });
    });
  });
});
