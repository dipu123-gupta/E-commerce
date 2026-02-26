import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import { handleAsyncError } from "../middleware/handleAsynError.js";

// @ ================= CREATE NEW ORDER =================
export const createOrder = handleAsyncError(async (req, res, next) => {
  // ! If the user is not logged in, then he will not be able to create an order
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  //! send response
  res.status(200).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

// @ ================= GET SINGLE ORDER =================
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
  //
  const order = await orderModel
    .findById(req.params.id) //! find the order by id
    .populate("user", "name email"); //! populate is used to populate the user details of the order

  //! if check order is not found then return error
  if (!order) {
    return next(new HandleError("Order not found", 404));
  }
  //! send response
  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    order,
  });
});

// @ ================= ALL MY ORDERS =================
export const myOrders = handleAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user._id }); //!  find all the orders of the user
  if (orders.length === 0) {
    //! if no orders found then return error
    return next(new HandleError("Orders not found", 404));
  }

  //! send response
  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
});

// @ =================  GET ALL ORDERS =================
export const getAllOrders = handleAsyncError(async (req, res, next) => {
  // find all the orders
  const orders = await orderModel.find();

  //   if no orders found then return error
  if (orders.length === 0) {
    return next(new HandleError("Orders not found", 404));
  }

  // calculate total amount
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  //   send response
  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
});

// @ ================= UPDATE ORDER STATUS =================
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
  const { id } = req.params; //! get the id of the order
  const { status } = req.body; //! get the status of the order

  const order = await orderModel.findById(id); //! find the order by id
  if (!order) {
    //! if order is not found then return error
    return next(new HandleError("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    //! if order is already delivered then return error
    return next(new HandleError("You have already delivered this order", 400));
  }
  await Promise.all(
    //! update the order status and deliveredAt
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity)),
  );

  //!  update the order status and deliveredAt
  order.orderStatus = status;
  if (status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  //!  save the order
  await order.save();
  //! send response
  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

//! update the quantity of the product
async function updateQuantity(productId, quantity) {
  const product = await productModel.findById(productId); //! find the product by id

  if (!product) {
    //! if product is not found then return error
    throw new HandleError("Product not found", 404);
  }

  product.stock -= quantity; //! update the stock
  await product.save(); //! save the product
}

// @ ================= DELETE ORDER =================
export const deleteOrder = handleAsyncError(async (req, res, next) => {
  const { id } = req.params; //! get the id of the order

  const order = await orderModel.findById(id); //! find the order by id
  if (!order) {
    //! if order is not found then return error
    return next(new HandleError("Order not found", 404));
  }

  if (order.orderStatus !== "Delivered") {
    //! if order is not delivered then return error
    return next(new HandleError("You can only delete delivered orders", 400));
  }
  await order.deleteOne({ _id: id }); //! delete the order

  res.status(200).json({
    //! send response
    success: true,
    message: "Order deleted successfully",
  });
});
