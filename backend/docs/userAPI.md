# Tài liệu Kiểm thử API User (Postman)

Tài liệu này cung cấp các dữ liệu JSON mẫu và hướng dẫn để kiểm thử API xác thực người dùng bằng Postman hoặc các công cụ kiểm thử API khác.

**Base URL:** `http://localhost:4000/api/user`

---

## 1. Đăng ký người dùng (Register)
Tạo một tài khoản người dùng mới.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/register`
- **Định dạng Body:** `JSON (raw)`
- **Dữ liệu mẫu:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Quy tắc xác thực:**
  - `email`: Phải đúng định dạng email.
  - `password`: Tối thiểu 8 ký tự.

---

## 2. Đăng nhập người dùng (User Login)
Xác thực người dùng hiện có để lấy token.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/login`
- **Định dạng Body:** `JSON (raw)`
- **Dữ liệu mẫu:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

---

## 3. Đăng nhập Admin (Admin Login)
Đăng nhập với quyền quản trị viên bằng thông tin được cấu hình trong biến môi trường.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/admin`
- **Định dạng Body:** `JSON (raw)`
- **Dữ liệu mẫu:**
```json
{
  "email": "admin@example.com",
  "password": "adminPassword123"
}
```
> **Lưu ý:** Email và mật khẩu phải khớp với `ADMIN_EMAIL` và `ADMIN_PASSWORD` trong file `.env` của bạn.

---

## Phản hồi thường gặp (Common Responses)

### Thành công (Success)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Thất bại (Ví dụ: Email đã tồn tại)
```json
{
  "success": false,
  "message": "Người dùng đã tồn tại"
}
```

### Thất bại (Ví dụ: Thông tin không hợp lệ)
```json
{
  "success": false,
  "message": "Thông tin đăng nhập không hợp lệ"
}
```

