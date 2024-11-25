const express = require('express');
const pay = require('../models/Paymen'); 
const router = express.Router();

router.get('/', async (req, res) => { 
    try {
      const pays = await pay.find();
      res.json(pays);
    } catch (error) {
      console.error("Failed to fetch codes", error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/', async (req, res) => {
  const newPay = new pay(req.body); 
  await newPay.save();
  res.status(201).json(newPay);
});

module.exports = router;