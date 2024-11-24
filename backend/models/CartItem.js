const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: String,
  quantity: Number
});

module.exports = mongoose.model('CartItem', cartSchema);