import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  deck: {
    name: { type: String, required: true },
    texture: { type: String, required: true }
  },
  wheel: {
    name: { type: String, required: true }
  },
  truck: {
    name: { type: String, required: true }
  },
  bolt: {
    name: { type: String, required: true }
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  items: {
    type: [CartItemSchema],
    default: []
  }
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
