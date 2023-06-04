const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productList: [{
        type: String,
        required: true
    }],
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
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
