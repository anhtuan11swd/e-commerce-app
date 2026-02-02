import userModel from "../models/userModel.js";

// Thêm sản phẩm vào giỏ hàng của người dùng
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Đã thêm vào giỏ hàng", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

// Cập nhật giỏ hàng của người dùng
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Đã cập nhật giỏ hàng", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

// Lấy dữ liệu giỏ hàng của người dùng
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    res.json({ cartData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export { addToCart, updateCart, getUserCart };
