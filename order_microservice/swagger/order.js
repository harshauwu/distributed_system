//routes/api/v1/order.routes.js

// /order/
/**
 *  @swagger
 *  /order:
 *    post:
 *      summary: Save Customer Order
 *      tags: [Order]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                required:
 *                  - shipping_name
 *                  - shipping_address
 *                  - items
 *                properties:
 *                  shipping_name:
 *                    type: string
 *                    example: Harsha Lakmal
 *                  shipping_address:
 *                    type: string
 *                    example: 35/5, Malabe, Colombo, Sri Lanka
 *                  items:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        product_id: 
 *                          type: string 
 *                          example: 623298a75e699300815dca5d
 *                        unit_price:
 *                          type: integer
 *                          example: 100
 *                        quantity:
 *                          type: integer
 *                          example: 2
 *      responses:
 *        200:
 *          description: Returns the created customer order
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    message: Order has been created successfully
 *              example:
 *                data:
 *                  message: Order has been created successfully
 *                  success: true
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        422:
 *          $ref: '#/components/responses/UnprocessableEntity'
 */
