import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.json({ message: "Không được ủy quyền", success: false });

  const token = authHeader.substring(7);

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export default authUser;
