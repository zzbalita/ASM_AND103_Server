const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productWeight: { type: Number, required: true }
});

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [productSchema], // Mảng các sản phẩm
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('historys', historySchema);
