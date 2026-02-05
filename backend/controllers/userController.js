import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ message: "Người dùng đã tồn tại", success: false });

    if (!validator.isEmail(email)) {
      return res.json({
        message: "Vui lòng nhập email hợp lệ",
        success: false,
      });
    }
    if (password.length < 8) {
      return res.json({
        message: "Vui lòng nhập mật khẩu mạnh (tối thiểu 8 ký tự)",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ email, name, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user)
      return res.json({ message: "Người dùng không tồn tại", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ message: "Thông tin đăng nhập không hợp lệ", success: false });
    }
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Admin sử dụng email+password làm payload thay vì user ID
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ message: "Thông tin đăng nhập không hợp lệ", success: false });
    }
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export { adminLogin, loginUser, registerUser };
