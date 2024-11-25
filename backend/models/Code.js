const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  amount: { 
    type: Number, 
    required: true 
  }
});


module.exports = mongoose.model('Code', discountSchema, 'discountcode');  