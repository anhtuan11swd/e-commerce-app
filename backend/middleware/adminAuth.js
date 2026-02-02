import jwt from "jsonwebtoken";

// Middleware xác thực quyền admin
const adminAuth = async (req, res, next) => {
  try {
    // Lấy token từ Authorization header (Bearer token format)
    const authHeader = req.headers.authorization;

    // Kiểm tra Authorization header có tồn tại không
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.json({ message: "Không được ủy quyền", success: false });

    // Extract token từ "Bearer <token>"
    const token = authHeader.substring(7);

    // Xác thực và giải mã token JWT
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra token có khớp với email + password admin không
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ message: "Không được ủy quyền", success: false });
    }

    // Cho phép tiếp tục xử lý request
    next();
  } catch (error) {
    // Ghi log lỗi và trả về thông báo lỗi
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default adminAuth;
