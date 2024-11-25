const express = require('express');
const Code = require('../models/Code'); 
const router = express.Router();

router.get('/', async (req, res) => { 
    try {
      const codes = await Code.find();
      res.json(codes);
    } catch (error) {
      console.error("Failed to fetch codes", error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/', async (req, res) => {
  const newCode = new Code(req.body); 
  await newCode.save();
  res.status(201).json(newCode);
});

module.exports = router;