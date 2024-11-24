const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Item = require('../models/Item');
const Order = require('../models/Order');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

// Sample data
const users = [
  { name: 'Test User', email: 'test@example.com', password: '123456', isAdmin: false },
  { name: 'Admin User', email: 'admin@example.com', password: 'adminpass', isAdmin: true }
];

const items = [
  { name: 'Nike Air Zoom Pegasus 40', description: 'Comfortable running shoes for everyday training with responsive cushioning', price: 59.99, stockQuantity: 100, brand: 'Nike', sizez: 'M', color: 'Black', category: 'Shoes', material: 'Mesh', imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1abaae51-d7c4-4ca6-8e2b-8133b90d168b/AIR+ZOOM+PEGASUS+40.png' },
  { name: 'Adidas Ultraboost 22', description: 'High-performance running shoes with Boost cushioning for long runs', price: 179.99, stockQuantity: 150, brand: 'Adidas', size: 'M', color: 'Blue', category: 'Shoes', material: 'Primeknit', imageUrl: 'https://www.poobienaidoos.co.za/wp-content/uploads/2022/02/GX5497-5.png' },
  { name: 'Nike Dri-FIT Miler T-shirt', description: 'Breathable running t-shirt for optimal comfort during long runs', price: 29.99, stockQuantity: 200, brand: 'Nike', size: 'L', color: 'White', category: 'Clothing', material: 'Polyester', imageUrl: 'https://www.bfgcdn.com/1500_1500_90/016-9744/nike-dri-fit-miler-running-top-sport-shirt.jpg' },
  { name: 'Puma Performance Cap', description: 'Protective cap with moisture-wicking properties for sun protection during runs', price: 14.99, stockQuantity: 80, brand: 'Puma', size: 'One Size', color: 'Gray', category: 'Accessories', material: 'Polyester', imageUrl: 'https://www.bfgcdn.com/1500_1500_90/016-9744/nike-dri-fit-miler-running-top-sport-shirt.jpg' },
  { name: 'Nike Elite Running Socks', description: 'Cushioned running socks for superior comfort and support', price: 9.99, stockQuantity: 300, brand: 'Nike', size: 'L', color: 'Black', category: 'Accessories', material: 'Cotton', imageUrl: 'https://example.com/images/nike-elite-socks.jpg' },
  { name: 'Nathan VaporKrar Hydration Belt', description: 'Adjustable running belt with water bottle holders for long-distance hydration', price: 39.99, stockQuantity: 120, brand: 'Nathan', size: 'Adjustable', color: 'Black', category: 'Accessories', material: 'Nylon', imageUrl: 'https://example.com/images/nathan-hydration-belt.jpg' },
  { name: 'Asics Winter Run Gloves', description: 'Lightweight gloves to keep hands warm during cold weather runs', price: 15.99, stockQuantity: 50, brand: 'Asics', size: 'M', color: 'Black', category: 'Accessories', material: 'Polyester', imageUrl: 'https://example.com/images/asics-winter-run-gloves.jpg' },
  { name: '2XU Light Speed Compression Leggings', description: 'Supportive compression leggings designed to enhance running performance', price: 79.99, stockQuantity: 100, brand: '2XU', size: 'M', color: 'Gray', category: 'Clothing', material: 'Spandex', imageUrl: 'https://example.com/images/2xu-compression-leggings.jpg' }
];


const orders = [
  { user: null, items: [], totalAmount: 89.98, shippingAddress: '123 Main St, Anytown, AT 12345', status: 'Completed' }
];

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Item.deleteMany();
    await Order.deleteMany();

    console.log('Existing data deleted');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users added:', createdUsers);

    // Associate orders with a user and items
    orders[0].user = createdUsers[0]._id;
    orders[0].items = [
      { item: createdUsers[0]._id, quantity: 1 },
      { item: createdUsers[1]._id, quantity: 2 }
    ];

    // Insert items
    const createdItems = await Item.insertMany(items);
    console.log('Items added:', createdItems);

    // Insert orders
    const createdOrders = await Order.insertMany(orders);
    console.log('Orders added:', createdOrders);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedData();