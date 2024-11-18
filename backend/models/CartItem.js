const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number,
  imageUrl: String,
  category: String,
  brand: String,
  size: String,
  color: String,
  material: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', cartSchema);