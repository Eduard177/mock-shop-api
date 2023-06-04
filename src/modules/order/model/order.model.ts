import mongoose from 'mongoose';

const {OrderStatus} = require("../utils/enum/order_status.enum");
const orderSchema = new mongoose.Schema({
    productList: {
        type: [
            {
                id: {
                    type: Number,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                category: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                rating: {
                    rate: {
                        type: Number,
                        required: true
                    },
                    count: {
                        type: Number,
                        required: true
                    }
                }
            }
        ],
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    totalValue: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: OrderStatus.ACTIVE
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
