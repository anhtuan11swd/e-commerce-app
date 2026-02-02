import multer from "multer";

// Cấu hình lưu trữ file trên disk
const storage = multer.diskStorage({
  // Đặt tên file bằng tên gốc của file upload
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
  },
});

// Tạo middleware upload với cấu hình storage
const upload = multer({ storage });

export default upload;
