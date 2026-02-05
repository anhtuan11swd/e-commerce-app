# E-Commerce MERN Stack Application

Ứng dụng thương mại điện tử full-stack được xây dựng bằng MERN stack (MongoDB, Express.js, React, Node.js).

## 🏗️ Kiến trúc dự án

Dự án bao gồm 3 module chính:

### Backend (Node.js/Express)

- **Đường dẫn**: `/backend`
- **Cổng**: 4000
- **Cơ sở dữ liệu**: MongoDB
- **Authentication**: JWT
- **File Upload**: Cloudinary

### Admin Panel (React)

- **Đường dẫn**: `/admin`
- **Cổng**: 5174 (development)
- **Chức năng**: Quản lý sản phẩm, đơn hàng, thống kê

### Frontend (React)

- **Đường dẫn**: `/frontend`
- **Cổng**: 5173 (development)
- **Chức năng**: Website khách hàng, mua sắm

## 🚀 Tính năng chính

### 👤 Quản lý người dùng

- Đăng ký/đăng nhập
- Authentication với JWT
- Giỏ hàng cá nhân
- Lịch sử đơn hàng

### 🛍️ Quản lý sản phẩm

- Thêm/sửa/xóa sản phẩm
- Upload nhiều hình ảnh
- Phân loại theo danh mục
- Hiển thị sản phẩm nổi bật (bestseller)

### 🛒 Giỏ hàng

- Thêm/xóa sản phẩm khỏi giỏ hàng
- Tính tổng tiền tự động
- Theo dõi trạng thái đơn hàng

### 👨‍💼 Admin Panel

- Dashboard quản lý
- CRUD sản phẩm
- Quản lý đơn hàng
- Upload hình ảnh lên Cloudinary

## 🛠️ Công nghệ sử dụng

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM cho MongoDB
- **JWT** - Authentication
- **bcrypt** - Hash password
- **multer** - File upload
- **Cloudinary** - Image hosting
- **CORS** - Cross-origin resource sharing

### Frontend (Admin & Customer)

- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Vite** - Build tool & dev server

### Development Tools

- **Biome** - Code formatter & linter
- **ESLint** - JavaScript linter
- **Nodemon** - Auto-restart server
- **Biome** - Code quality

## 📁 Cấu trúc thư mục

```
e-commerce-app/
├── admin/                 # Admin panel (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Admin pages (Add, List, Orders)
│   │   └── ...
│   └── package.json
├── backend/               # API server (Node.js/Express)
│   ├── config/            # Database & Cloudinary config
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, upload middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── server.js          # Main server file
├── frontend/              # Customer website (React)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # React context
│   │   ├── pages/         # Customer pages
│   │   └── ...
│   └── package.json
└── README.md
```

## 🔧 Cài đặt và chạy

### Điều kiện tiên quyết

- Node.js (v18+)
- MongoDB
- Tài khoản Cloudinary (cho upload ảnh)

### 1. Clone repository

```bash
git clone <repository-url>
cd e-commerce-app
```

### 2. Cài đặt dependencies

#### Backend

```bash
cd backend
npm install
```

#### Admin Panel

```bash
cd ../admin
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Cấu hình environment variables

Tạo file `.env` trong từng thư mục và điền thông tin:

#### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
PORT=4000
```

#### Admin & Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:4000
```

### 4. Khởi động MongoDB

Đảm bảo MongoDB đang chạy trên máy local hoặc cấu hình connection string.

### 5. Seed dữ liệu mẫu (tùy chọn)

```bash
cd backend
npm run seed
```

### 6. Chạy ứng dụng

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 - Admin Panel

```bash
cd admin
npm run dev
```

#### Terminal 3 - Frontend

```bash
cd frontend
npm run dev
```

## 📊 API Endpoints

### User Routes (`/api/user`)

- `POST /register` - Đăng ký tài khoản
- `POST /login` - Đăng nhập
- `POST /admin` - Đăng nhập admin

### Product Routes (`/api/product`)

- `POST /add` - Thêm sản phẩm (admin only)
- `POST /remove` - Xóa sản phẩm (admin only)
- `POST /single` - Lấy thông tin sản phẩm
- `GET /list` - Danh sách tất cả sản phẩm

### Cart Routes (`/api/cart`)

- `POST /get` - Lấy giỏ hàng người dùng
- `POST /add` - Thêm sản phẩm vào giỏ
- `POST /update` - Cập nhật số lượng
- `POST /remove` - Xóa sản phẩm khỏi giỏ

### Order Routes (`/api/order`)

- `POST /place` - Đặt hàng
- `POST /status` - Cập nhật trạng thái đơn (admin)
- `POST /list` - Danh sách đơn hàng người dùng
- `GET /list` - Danh sách tất cả đơn hàng (admin)

## 🎨 Giao diện

### Admin Panel

- **Login**: Xác thực admin
- **Add Product**: Form thêm sản phẩm với upload ảnh
- **List Products**: Bảng danh sách sản phẩm với chức năng xóa
- **Orders**: Quản lý và cập nhật trạng thái đơn hàng

### Customer Website

- **Home**: Trang chủ với hero, bestsellers, collections
- **Collection**: Danh sách sản phẩm theo bộ lọc
- **Product**: Chi tiết sản phẩm
- **Cart**: Giỏ hàng với tính tổng tiền
- **Login/Register**: Xác thực người dùng
- **Place Order**: Đặt hàng
- **Orders**: Lịch sử đơn hàng

## 🔒 Authentication

- **JWT Tokens**: Được lưu trong localStorage
- **Admin Routes**: Bảo vệ bằng middleware `adminAuth`
- **User Routes**: Bảo vệ bằng JWT verification
- **Password Hashing**: Sử dụng bcrypt

## 📸 Quản lý hình ảnh

- **Cloudinary**: Lưu trữ và tối ưu hình ảnh
- **Multiple Images**: Hỗ trợ upload nhiều ảnh cho mỗi sản phẩm
- **Auto Optimization**: Tự động resize và compress

## 🗃️ Cơ sở dữ liệu

### Models

- **User**: Thông tin tài khoản, giỏ hàng
- **Product**: Thông tin sản phẩm, hình ảnh, giá
- **Order**: Đơn hàng, địa chỉ giao hàng

### Sample Data

- 50+ sản phẩm mẫu
- Các danh mục: Nam, Nữ, Trẻ em
- Subcategories: Áo, Quần, Đồ thể thao, v.v.

## 📱 Responsive Design

- **Mobile-first**: Thiết kế ưu tiên mobile
- **Tailwind CSS**: Utility classes cho responsive
- **Flexible Layout**: Tự động điều chỉnh theo kích thước màn hình

## 🔧 Development Scripts

### Backend

```bash
npm run dev      # Chạy server với nodemon
npm start        # Chạy server production
npm run seed     # Import dữ liệu mẫu
npm run check    # Kiểm tra code với Biome
npm run format   # Format code
npm run lint     # Lint code
```

### Admin & Frontend

```bash
npm run dev      # Chạy dev server
npm run build    # Build production
npm run preview  # Preview production build
npm run check    # Kiểm tra code
npm run format   # Format code
npm run lint     # Lint code
```

## 🚀 Deployment

### Backend

```bash
npm run build
npm start
```

### Frontend (Admin & Customer)

```bash
npm run build
# Serve static files với nginx/apache
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Distributed under the ISC License. See `LICENSE` for more information.

## 👨‍💻 Tác giả

**Trần Anh Tuấn** - _Full-stack Developer_

## 🙏 Lời cảm ơn

- React team cho framework tuyệt vời
- MongoDB team cho database mạnh mẽ
- Tailwind CSS cho styling system
- Cộng đồng open source
