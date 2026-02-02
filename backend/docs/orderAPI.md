# Tài liệu Kiểm thử API Order (Postman)

Tài liệu này cung cấp các dữ liệu JSON mẫu và hướng dẫn để kiểm thử các API liên quan đến đơn hàng (Order) bằng Postman hoặc các công cụ kiểm thử API khác.

**Base URL:** `http://localhost:4000/api/order`

---

## 1. Đặt hàng (Thanh toán khi nhận hàng - COD)
Đặt hàng với phương thức thanh toán khi nhận hàng.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/place`
- **Headers:** 
  - `Authorization`: `Bearer <user_token>`
- **Định dạng Body:** `JSON (raw)`
- **Dữ liệu mẫu:**
```json
{
  "items": [
    {
      "_id": "67a0665f973f71c48c346142",
      "name": "Men Round Neck Pure Cotton T-shirt",
      "price": 200,
      "quantity": 2,
      "size": "M"
    }
  ],
  "amount": 400,
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001",
    "country": "USA",
    "phone": "123456789"
  }
}
```

---

## 2. Lấy danh sách đơn hàng của người dùng
Xem lịch sử mua hàng của người dùng đang đăng nhập.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/userorders`
- **Headers:** 
  - `Authorization`: `Bearer <user_token>`
- **Định dạng Body:** `JSON (raw)` (Không cần gửi dữ liệu, userId được lấy từ token)
```json
{}
```

---

## 3. Liệt kê tất cả đơn hàng (Admin)
Dành cho quản trị viên để xem toàn bộ đơn hàng trong hệ thống.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/list`
- **Headers:** 
  - `Authorization`: `Bearer <admin_token>`
- **Định dạng Body:** `JSON (raw)`
```json
{}
```

---

## 4. Cập nhật trạng thái đơn hàng (Admin)
Dành cho quản trị viên để cập nhật trạng thái xử lý của đơn hàng.

- **Phương thức:** `POST`
- **URL:** `{{base_url}}/status`
- **Headers:** 
  - `Authorization`: `Bearer <admin_token>`
- **Định dạng Body:** `JSON (raw)`
- **Dữ liệu mẫu:**
```json
{
  "orderId": "67a0a123...",
  "status": "Shipped"
}
```
- **Các trạng thái phổ biến:** `Order Placed`, `Packing`, `Shipped`, `Out for delivery`, `Delivered`.

---

## Phản hồi thường gặp (Common Responses)

### Thành công
```json
{
  "success": true,
  "message": "Đã đặt hàng"
}
```

### Thất bại
```json
{
  "success": false,
  "message": "Chi tiết lỗi sẽ hiển thị ở đây"
}
```
