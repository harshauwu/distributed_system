const mongoose = require('mongoose');

const orderItem = mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        unit_price: {
            type: Number,
            required: true
        },
        quantity : {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: true,
            default: 1
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);


module.exports = mongoose.model('orderItem', orderItem);