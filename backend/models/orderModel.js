import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  address: { required: true, type: Object },
  amount: { required: true, type: Number },
  date: { required: true, type: Number },
  items: { required: true, type: Array },
  payment: { default: false, required: true, type: Boolean },
  paymentMethod: { required: true, type: String },
  status: { default: "Đã đặt hàng", required: true, type: String },
  userId: { required: true, type: String },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
