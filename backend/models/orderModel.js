import mongoose from "mongoose";

// Order Schema
const orderSchema = new mongoose.Schema({
  // Shipping Details
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },

  // Ordered Products
  orderItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  // User who placed the order
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  // Payment Information
  paymentInfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },

  // Payment Time
  paidAt: {
    type: Date,
    required: true,
  },

  // Price Details
  itemsPrice: { type: Number, default: 0, required: true },
  taxPrice: { type: Number, default: 0, required: true },
  shippingPrice: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },

  // Order Status
  orderStatus: {
    type: String,
    default: "Processing",
    required: true,
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
