import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Đặt hàng (Thanh toán khi nhận hàng - COD)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      address,
      amount,
      date: Date.now(),
      items,
      payment: false,
      paymentMethod: "COD",
      userId,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Xóa cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ message: "Đã đặt hàng", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// Lấy tất cả đơn hàng cho Admin
const allOrders = async (_req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ orders, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// Đơn hàng của người dùng
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ orders, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// Cập nhật trạng thái đơn hàng cho Admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ message: "Đã cập nhật trạng thái", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export { allOrders, placeOrder, updateStatus, userOrders };
