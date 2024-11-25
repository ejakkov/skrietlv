require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const itemsRoute = require('./routes/items'); 
const citemsRoute = require('./routes/citems');
const codeRoute = require('./routes/codes');
const payRoute = require('./routes/payment');


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running');
});


const Item = require('./models/Item'); 


const CartItem = require('./models/CartItem'); 
const Discount = require('./models/Code'); 
const Payment = require('./models/Paymen'); 




citemsRoute.get('/cartitems', async (req, res) => { 
  try {
    const cartItems = await CartItem.find().select('id'); 
    const cartItemIds = cartItems.map(item => item.itemId.toString()); 
    res.json(cartItemIds);
  } catch (error) {
    console.error('Error fetching cart item IDs:', error);
    res.status(500).json({ error: 'Failed to fetch cart item IDs' });
  }
});

codeRoute.get('/:code', async (req, res) => {
  try {
    const code = req.params.code;
    console.log('code')
    const discount = await Discount.findOne({ code: code }); 

    if (discount) {
      res.json(discount); 
    } else {
      res.status(404).json({ error: 'Discount code not found' });
    }
  } catch (error) {
    console.error('Error fetching discount code:', error);
    res.status(500).json({ error: 'Failed to fetch discount code' });
  }
});


itemsRoute.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id); 
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

payRoute.post('/payments', async (req, res) => {
  try {
    console.log('PAYING')
    const paymentData = req.body; 

    const newPayment = new Payment(paymentData);


    await newPayment.save();


    res.status(201).json(newPayment); 

  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

app.use('/api/items', itemsRoute);
app.use('/api/cartitems', citemsRoute);
app.use('/api/discount-codes', codeRoute);
app.use('/api/payments', payRoute);







mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database connection error:', err));