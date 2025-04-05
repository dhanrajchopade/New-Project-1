import mongoose from 'mongoose';

 
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String], 
    required: true,
    enum:["S","M","XL","XXL"]
  },
  rating: {
    type: Number, 
    required: true,
  },
  reviewsCount: {
    type: Number, 
    default: 0,
  },
  images: {
    type: [String], 
    required: true,
  },
  features: {
    type: [String], 
    required: true,
  },
  returnPolicyDays: {
    type: Number,  
    default: 10,
  },
  gender:{
    type:String,
    required:true,
  },
  deliveryOptions: {
    freeDelivery: { type: Boolean, default: true },
    payOnDeliveryAvailable: { type: Boolean, default: true },
  },
});

 
const Product = mongoose.model('Product', ProductSchema);

export default Product;
