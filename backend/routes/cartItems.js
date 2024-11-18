const express = require('express');
const CartItem = require('../models/CartItem');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find(); // Fetch items from MongoDB
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create item (admin only)
router.post('/', async (req, res) => {
  const newItem = new CartItem(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

router.delete('/:itemID', async (req, res) => {
    try{
      const cartItem = await CartItem.findByIdAndDelete({_id : req.params.itemID}); 
      if(!cartItem){
        return res.status(404).json({message: "Product not found"});
      }
      
      res.status(200).json({ message: 'Item removed from cart' });
    }catch(error){
      res.status(500).json({ error: 'Error removing item from cart' });
    }
  });



module.exports = router;