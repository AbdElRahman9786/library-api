const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  quantity: { type: Number, default: 1 }
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [CartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);


module.exports = Cart;
