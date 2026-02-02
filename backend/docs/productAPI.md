# Tài liệu API Sản phẩm (Product API) - Postman Testing

Tài liệu này cung cấp các endpoint API cho việc quản lý sản phẩm, bao gồm các ví dụ về dữ liệu mẫu để sử dụng trong Postman.

## Cấu hình Chung
- **Base URL:** `http://localhost:4000/api/product`
- **Headers:** 
  - `Content-Type: application/json` (cho các request không phải upload file)
  - `Authorization: Bearer <token>` (cho các endpoint yêu cầu quyền admin)

---

## 1. Thêm sản phẩm mới (Add Product)
Sử dụng để tạo sản phẩm mới với hình ảnh.

- **Endpoint:** `/add`
- **Phương thức:** `POST`
- **Quyền truy cập:** Admin (Yêu cầu Token)
- **Kiểu dữ liệu:** `form-data` (Multipart Form)

### Dữ liệu mẫu (Body - form-data):
| Key | Value | Type |
| :--- | :--- | :--- |
| `name` | Áo Thun Nam Cotton | Text |
| `description` | Áo thun chất liệu 100% cotton thoáng mát. | Text |
| `price` | 250000 | Text (Number) |
| `category` | Men | Text |
| `subCategory` | Topwear | Text |
| `sizes` | `["S", "M", "L", "XL"]` | Text (JSON string) |
| `bestseller` | `true` | Text (Boolean string) |
| `image1` | [File ảnh 1] | File |
| `image2` | [File ảnh 2] | File (Tùy chọn) |
| `image3` | [File ảnh 3] | File (Tùy chọn) |
| `image4` | [File ảnh 4] | File (Tùy chọn) |

---

## 2. Danh sách sản phẩm (List Products)
Lấy tất cả danh sách sản phẩm hiện có.

- **Endpoint:** `/list`
- **Phương thức:** `GET`
- **Quyền truy cập:** Công khai

### Phản hồi mẫu (JSON):
```json
{
  "success": true,
  "products": [
    {
      "_id": "65bcf123...",
      "name": "Áo Thun Nam Cotton",
      "description": "Áo thun chất liệu 100% cotton thoáng mát.",
      "price": 250000,
      "image": ["https://res.cloudinary.com/..."],
      "category": "Men",
      "subCategory": "Topwear",
      "sizes": ["S", "M", "L", "XL"],
      "bestseller": true,
      "date": 1706864400000
    }
  ]
}
```

---

## 3. Xóa sản phẩm (Remove Product)
Xóa một sản phẩm dựa trên ID.

- **Endpoint:** `/remove`
- **Phương thức:** `POST`
- **Quyền truy cập:** Admin (Yêu cầu Token)

### Dữ liệu mẫu (Body - JSON):
```json
{
  "id": "65bcf123..."
}
```

---

## 4. Chi tiết một sản phẩm (Single Product)
Lấy thông tin chi tiết của một sản phẩm cụ thể.

- **Endpoint:** `/single`
- **Phương thức:** `POST`
- **Quyền truy cập:** Công khai

### Dữ liệu mẫu (Body - JSON):
```json
{
  "productId": "65bcf123..."
}
```

---

## Ghi chú cho Postman:
1. Đối với endpoint `/add`, hãy chọn tab **Body** -> **form-data**.
2. Đối với các endpoint yêu cầu Admin, hãy vào tab **Authorization**, chọn **Bearer Token** và nhập mã token được cấp sau khi đăng nhập Admin thành công.
3. Đảm bảo server đang chạy trên cổng `4000` (hoặc cổng cấu hình trong file `.env`).
