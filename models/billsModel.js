const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productCate: {
    type: String,
    required: true,
  },
  productDes: {
    type: String,
    required: true,
  },
  productWeight: {
    type: Number,
    required: true,
  },
});

const Bill = mongoose.model('bills', billSchema);

module.exports = Bill;
