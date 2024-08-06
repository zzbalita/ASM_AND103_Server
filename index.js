// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productsRoute');
const billsRoutes = require('./routes/billsRoute');
const historysRoutes = require('./routes/historysRoute')

const app = express();
const port = 3000;

// Kết nối đến MongoDB
mongoose.connect('mongodb+srv://root:Nhutren123@cluster0.9rgefph.mongodb.net/Tree', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/bills', billsRoutes)
// Sử dụng các routes cho history
app.use('/api/historys', historysRoutes);


// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
