const express = require('express');
const router = express.Router();
const Bill = require('../models/billsModel'); // Đảm bảo rằng bạn đã định nghĩa model Bill

// API endpoint để thêm hóa đơn
router.post('/', async (req, res) => {
  try {
    const { userId, productName, productPrice, productImage, productCate, productDes, productWeight } = req.body;
    const newBill = new Bill({ userId, productName, productPrice, productImage, productCate, productDes, productWeight });
    await newBill.save();
    res.status(200).json({ message: 'Bill added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bill', error });
  }
});

// API endpoint để lấy tất cả hóa đơn
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find({});
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills', error });
  }
});

// API endpoint để xóa hóa đơn theo id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Bill.findByIdAndDelete(id);
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bill', error });
  }
});

// API endpoint để tính tổng tiền của tất cả hóa đơn
router.get('/total', async (req, res) => {
  try {
    const bills = await Bill.find({});
    const totalPrice = bills.reduce((total, bill) => total + (bill.productPrice * bill.productWeight), 0);
    res.status(200).json({ totalPrice });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating total price', error });
  }
});

// API endpoint để xóa tất cả hóa đơn
router.delete('/', async (req, res) => {
  try {
    await Bill.deleteMany({});
    res.status(200).json({ message: 'All bills deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all bills', error });
  }
});

module.exports = router;
