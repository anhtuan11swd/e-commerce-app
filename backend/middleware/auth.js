import jwt from "jsonwebtoken";

// Middleware xác thực người dùng thông thường
const authUser = async (req, res, next) => {
  // Lấy token từ Authorization header (Bearer token format)
  const authHeader = req.headers.authorization;

  // Kiểm tra Authorization header có tồn tại không
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.json({ message: "Không được ủy quyền", success: false });

  // Extract token từ "Bearer <token>"
  const token = authHeader.substring(7);

  try {
    // Xác thực và giải mã token JWT
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Gán userId từ token vào request body để route sử dụng
    req.body.userId = token_decode.id;

    // Cho phép tiếp tục xử lý request
    next();
  } catch (error) {
    // Trả về thông báo lỗi nếu token không hợp lệ
    res.json({ message: error.message, success: false });
  }
};

export default authUser;
