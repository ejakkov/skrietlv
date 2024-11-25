const express = require('express');
const Item = require('../models/CartItem');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); 
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

module.exports = router;