const express = require('express');
const router = express.Router();
const Bill = require('../models/billsModel');
const History = require('../models/historysModel');


// API endpoint để thêm dữ liệu từ bills vào history
router.post('/', async (req, res) => {
  try {
    const bills = await Bill.find(); // Lấy tất cả dữ liệu từ bills
    if (!bills || bills.length === 0) {
      return res.status(404).json({ message: 'No bills found' });
    }

    // Tính tổng giá và chuẩn bị dữ liệu
    const products = bills.map(bill => ({
      productName: bill.productName,
      productPrice: bill.productPrice,
      productWeight: bill.productWeight
    }));
    
    const totalPrice = products.reduce((total, product) => total + (product.productPrice * product.productWeight), 0);
    const userId = bills[0].userId; // Giả sử tất cả các sản phẩm thuộc về cùng một user

    const newHistory = new History({ userId, products, totalPrice });
    await newHistory.save();

    res.status(200).json({ message: 'Bills added to history successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bills to history', error });
  }
});

// API endpoint để lấy tất cả dữ liệu từ historys
router.get('/', async (req, res) => {
  try {
    const histories = await History.find();
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history data', error });
  }
});

module.exports = router;
