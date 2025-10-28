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

const ShippingAddressSchema = new mongoose.Schema({
  address_line_1: { type: String, required: true },
  address_line_2: { type: String },
  admin_area_1: { type: String, required: true },
  admin_area_2: { type: String, required: true },
  postal_code: { type: String, required: true },
  country_code: { type: String, required: true }
}, { _id: false });

const PayerInfoSchema = new mongoose.Schema({
  name: {
    given_name: { type: String },
    surname: { type: String }
  },
  email_address: { type: String }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  items: {
    type: [CartItemSchema],
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paypalOrderId: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  shippingAddress: ShippingAddressSchema,
  payerInfo: PayerInfoSchema
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
