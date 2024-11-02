const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Place a new order
router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

module.exports = router;