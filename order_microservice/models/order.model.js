const mongoose = require('mongoose');

const order = mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        ship_name: {
            type: String,
            required: true
        },
        shipping_address: {
            type: String,
            required: true
        },
        amount : {
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


module.exports = mongoose.model('order', order);