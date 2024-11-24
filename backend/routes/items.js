const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch items from MongoDB
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get item by id
router.get('/:itemid', async (req, res) => {
  try{
    const item = await Item.find({ _id: req.params.itemid});
    res.json(item);
  }catch(error){
    res.status(500).json({message: 'Server error' });
  }
})

// Create item (admin only)
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

module.exports = router;