const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    feature: {
        type: Boolean,
        default: false,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
