import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0, // This will be dynamically calculated
  },
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;