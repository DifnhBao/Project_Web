# Jamendo Music Management System (Fullstack)

Một ứng dụng web nghe nhạc trực tuyến hoàn chỉnh được xây dựng theo mô hình **MVC (Model–View–Controller)**, tích hợp quản lý tài khoản người dùng, thư viện nhạc và dữ liệu thực tế từ **Jamendo API**.

## Tech Stack
**Frontend:** Next.js, TypeScript  
**Backend:** Node.js (Express)
**Database:** MySQL  
**ORM:** Sequelize  
**DevOps:** Docker, Docker Compose  
**Security:** JWT (Access Token & Refresh Token)  
**External API:** Jamendo API  

## Key Features
### For Users
- **Authentication:** Đăng ký, đăng nhập bảo mật bằng JWT  
- **Music Library:** Xem danh sách bài hát, và thêm vào danh sách yêu thích  
- **Profile Management:** Xem và cập nhật thông tin cá nhân (Tên, năm sinh, địa chỉ, SĐT)  
- **Security:** Hỗ trợ thay đổi mật khẩu  

### For Administrators
- **Admin Dashboard:** Hệ thống đăng nhập riêng cho quản trị viên  
- **User Management:** Quản lý người dùng (Xóa, sửa thông tin)  
- **Content Management:** Quản lý kho nhạc (Thêm, sửa, xóa, ẩn/hiện bài hát)  
- **Admin Settings:** Quản lý tài khoản quản trị cá nhân  

## Installation & Setup
Dự án được cấu hình sẵn với **Docker**, giúp bạn triển khai môi trường phát triển nhanh chóng.

### Prerequisites
- Docker  
- Docker Compose  
- (Tùy chọn) Node.js nếu chạy local không dùng container  

### Step-by-Step
1. 1. **Clone repository:**
```bash
git clone [link-github-cua-ban]
cd Project-web
```

2. 2. **Environment Variables:** Dự án đã cấu hình sẵn biến môi trường trong docker-compose.yml. Bạn có thể tùy chỉnh các thông số như JWT_SECRET hoặc mật khẩu Database nếu cần.

3. 3. **Run with Docker Compose:**
```bash
docker-compose up --build
- **Frontend:** Chạy tại http://localhost:3000
- **Backend:** Chạy tại http://localhost:5000
- **MySQL:** Chạy tại port 3307 (Tránh xung đột với MySQL máy thật)
```

## Security Implementation
Hệ thống sử dụng cơ chế **Double Token (Access & Refresh Token)** để bảo mật phiên đăng nhập của người dùng:
- **Access Token:** Thời hạn ngắn (15 phút), dùng để xác thực các request.
- **Refresh Token:** Thời hạn dài (7 ngày), dùng để cấp mới Access Token mà không bắt người dùng đăng nhập lại.

## Contact
- **Author:** Lê Đình Bảo & Huỳnh Đình Thạch - Sinh viên CNTT PTIT HCM
- **Email:** ddinhbao05@gmail.com

