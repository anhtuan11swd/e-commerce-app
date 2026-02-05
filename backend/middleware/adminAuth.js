import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.json({ message: "Không được ủy quyền", success: false });

    const token = authHeader.substring(7);

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Admin sử dụng email+password làm payload thay vì user ID
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ message: "Không được ủy quyền", success: false });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default adminAuth;
