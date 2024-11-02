const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, quantity: Number }],
  totalAmount: Number,
  shippingAddress: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);