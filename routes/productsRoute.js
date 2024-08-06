const express = require('express');
const router = express.Router();
const Product = require('../models/productsModel');

// Tạo sản phẩm mới (Create)
router.post('/', async (req, res) => {
  const { name, price, weight, cate, des, image } = req.body;

  if (!name || !price || !weight || !cate || !des || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const product = new Product({
    name,
    price,
    weight,
    cate,
    des,
    image
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lấy danh sách tất cả sản phẩm (Read)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy thông tin sản phẩm theo ID (Read)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật thông tin sản phẩm (Update) bằng PUT
router.put('/:id', async (req, res) => {
    try {
      // Tìm sản phẩm theo ID
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Cập nhật các trường có trong body request
      Object.assign(product, req.body);
  
      // Lưu sản phẩm đã cập nhật
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Xóa sản phẩm theo ID (Delete)
router.delete('/:id', async (req, res) => {
    try {
      // Tìm sản phẩm theo ID và xóa
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// API endpoint để xóa hóa đơn theo ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const billId = req.params.id;
//     await Bill.findByIdAndDelete(billId);
//     res.status(200).json({ message: 'Bill deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting bill', error });
//   }
// });
  

module.exports = router;
