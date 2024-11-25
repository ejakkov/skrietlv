const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phonenumeber: Number,
  totalprice: Number,
  pakomat: String,
  city: String,
  street: String,
  postal: String,
  parcellocation: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', itemSchema);