const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    cate: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const product = mongoose.model('products', productSchema);

module.exports = product;