import express from 'express';
import { initializeDatabase } from './db/db.connect.js';
import Product from './modules/products.models.js';
import Wishlist from './modules/wishlist.models.js';
import Cart from './modules/cart.models.js';
import Address from './modules/address.models.js';
import Order from './modules/order.models.js';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
// import path from 'path';


// const productDataPath = path.resolve('./ProductData.json');
// let productData = [];
// try {
//   productData = JSON.parse(fs.readFileSync(productDataPath, 'utf-8'));
// } catch (error) {
//   console.error(`Error reading ProductData.json: ${error.message}`);
//   process.exit(1); // Exit the process with an error code
// }


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initializeDatabase()

const productData = JSON.parse(fs.readFileSync('./data/ProductData.json', 'utf-8'));
 
const addressData = JSON.parse(fs.readFileSync('AddressData.json', 'utf-8'));
 
async function seedData() {
  try {
    // Seed Products
    for (const product of productData) {
      const newProduct = new Product({
        title: product.title,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercentage: product.discountPercentage,
        size: product.size,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
        images: product.images,
        features: product.features.map(f => f.detail),
        returnPolicyDays: product.returnPolicyDays,
        gender: product.gender,
        deliveryOptions: product.deliveryOptions,
      });
      await newProduct.save();
    }
    console.log('Products seeded successfully.');

 
    for (const address of addressData) {
      const newAddress = new Address({
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      });
      await newAddress.save();
    }
    console.log('Addresses seeded successfully.');
  } catch (error) {
    console.log('An error occurred while seeding the data:', error);
  }
}
seedData();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
 
// Get all products
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      if (products.length !== 0) {
        res.json(products);
      } else {
        res.status(404).json({ error: 'No Products found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Products.' });
    }
  });
  
  // Get product by ID
  app.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Product.' });
    }
  });
  
  // Wishlist Routes
  
  // Get all wishlist items
  app.get('/wishlist', async (req, res) => {
    try {
      const wishlist = await Wishlist.find();
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wishlist.' });
    }
  });
  
  // Add item to wishlist
  app.post('/wishlist', async (req, res) => {
    try {
      const newItem = new Wishlist(req.body);
      await newItem.save();
      res.status(201).json({ message: 'Item added to wishlist.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item to wishlist.' });
    }
  });
  
  // Cart Routes
  
  // Get all cart items
  app.get('/cart', async (req, res) => {
    try {
      const cart = await Cart.find();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart.' });
    }
  });
  
  // Add item to cart
  app.post('/cart', async (req, res) => {
    try {
      const newItem = new Cart(req.body);
      await newItem.save();
      res.status(201).json({ message: 'Item added to cart.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item to cart.' });
    }
  });
  
  // Address Routes
  
  // Get all addresses
  app.get('/addresses', async (req, res) => {
    try {
      const addresses = await Address.find();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch addresses.' });
    }
  });
  
  // Add a new address
  app.post('/addresses', async (req, res) => {
    try {
      const newAddress = new Address(req.body);
      await newAddress.save();
      res.status(201).json({ message: 'Address added successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add address.' });
    }
  });
  
  // Orders Routes
  
  // Get all orders
  app.get('/orders', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders.' });
    }
  });
  
  // Place a new order
  app.post('/orders', async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to place order.' });
    }
  });

app.listen(PORT,()=>{
    console.log(`--> Server is running on ${PORT}`)
  })
