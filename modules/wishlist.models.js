import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
        ref: 'Product',
        required: true,
      },
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;