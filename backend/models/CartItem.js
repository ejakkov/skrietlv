const mongoose = require('mongoose');

const citemSchema = new mongoose.Schema({

});

module.exports = mongoose.model('CartItem', citemSchema);