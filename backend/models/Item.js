const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number,
  imageUrl: String,
  category: String,
  brand: String,
  sizes: {},
  colors: {},
  material: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);