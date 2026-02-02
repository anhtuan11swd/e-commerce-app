# Tài liệu API Giỏ hàng (Cart API) - Postman Testing

Tài liệu này cung cấp các endpoint API cho việc quản lý giỏ hàng của người dùng, bao gồm các ví dụ về dữ liệu mẫu để sử dụng trong Postman.

## Cấu hình Chung
- **Base URL:** `http://localhost:4000/api/cart`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (Bắt buộc - Sử dụng token nhận được sau khi đăng nhập người dùng thành công)

---

## 1. Thêm sản phẩm vào giỏ hàng (Add to Cart)
Thêm một sản phẩm cụ thể với kích thước vào giỏ hàng của người dùng.

- **Endpoint:** `/add`
- **Phương thức:** `POST`
- **Quyền truy cập:** Người dùng đã đăng nhập

### Dữ liệu mẫu (Body - JSON):
```json
{
  "itemId": "65bcf123...",
  "size": "L"
}
```
- `itemId`: ID của sản phẩm muốn thêm.
- `size`: Kích thước của sản phẩm (ví dụ: S, M, L, XL).

---

## 2. Cập nhật số lượng trong giỏ hàng (Update Cart)
Thay đổi số lượng của một sản phẩm cụ thể trong giỏ hàng.

- **Endpoint:** `/update`
- **Phương thức:** `POST`
- **Quyền truy cập:** Người dùng đã đăng nhập

### Dữ liệu mẫu (Body - JSON):
```json
{
  "itemId": "65bcf123...",
  "size": "L",
  "quantity": 2
}
```
- `itemId`: ID của sản phẩm cần cập nhật.
- `size`: Kích thước của sản phẩm.
- `quantity`: Số lượng mới muốn đặt.

---

## 3. Lấy dữ liệu giỏ hàng (Get User Cart)
Lấy toàn bộ danh sách sản phẩm và số lượng hiện có trong giỏ hàng của người dùng.

- **Endpoint:** `/get`
- **Phương thức:** `POST`
- **Quyền truy cập:** Người dùng đã đăng nhập

### Phản hồi mẫu (JSON):
```json
{
  "success": true,
  "cartData": {
    "65bcf123...": {
      "L": 2,
      "M": 1
    },
    "65bcf456...": {
      "S": 1
    }
  }
}
```

---

## Ghi chú cho Postman:
1. **Xác thực:** Tất cả các API giỏ hàng đều yêu cầu xác thực. Bạn phải đăng nhập người dùng trước, sau đó copy mã `token` và dán vào tab **Authorization** -> **Bearer Token** trong Postman.
2. **Body:** Sử dụng tab **Body** -> **raw** và chọn định dạng **JSON**.
3. **UserId:** Bạn không cần gửi `userId` trong body của request. Middleware `authUser` sẽ tự động trích xuất `userId` từ mã token bạn cung cấp trong header.
