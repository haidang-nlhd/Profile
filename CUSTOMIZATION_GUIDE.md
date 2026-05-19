# Hướng Dẫn Tùy Chỉnh Profile & Brand

## 📝 Cách Sửa Thông Tin Brand

Tất cả thông tin hiển thị trong portfolio được quản lý tập trung trong file:
```
src/api/profileConfig.js
```

### 1. **Sửa Tên Thương Hiệu** (Brand Name)

Mở `src/api/profileConfig.js` và tìm dòng:
```javascript
name: "[YOUR BRAND NAME]",
```

Thay thế `[YOUR BRAND NAME]` bằng tên của bạn, ví dụ:
```javascript
name: "Nguyễn Lê Hải Đăng",
```

### 2. **Sửa Mô Tả / Giới Thiệu** (Description)

Tìm dòng:
```javascript
description: "[YOUR INTRODUCTION TEXT]",
```

Thay thế bằng nội dung giới thiệu của bạn, ví dụ:
```javascript
description: "Lập trình viên Full Stack, yêu thích xây dựng giao diện đặc biệt và tối ưu hóa hiệu năng.",
```

### 3. **Sửa Email**

Tìm dòng:
```javascript
email: "[YOUR EMAIL]",
```

Ví dụ:
```javascript
email: "your.email@example.com",
```

### 4. **Sửa Số Điện Thoại** (Phone)

Tìm dòng:
```javascript
phone: "[YOUR PHONE NUMBER]",
```

Ví dụ:
```javascript
phone: "+84 123 456 7890",
```

### 5. **Sửa Website**

Tìm dòng:
```javascript
website: "[YOUR WEBSITE]",
```

Ví dụ:
```javascript
website: "https://yourwebsite.com",
```

### 6. **Sửa Facebook**

Tìm dòng:
```javascript
facebook: "[YOUR FACEBOOK LINK]",
```

Ví dụ:
```javascript
facebook: "https://facebook.com/yourpage",
```

### 7. **Sửa Avatar/Logo**

Tìm dòng:
```javascript
avatar: "https://via.placeholder.com/150?text=LOGO",
```

Thay thế bằng URL của hình ảnh của bạn:
```javascript
avatar: "https://yourcdn.com/your-logo.png",
```

Hoặc tải hình lên thư mục `public/` và tham chiếu:
```javascript
avatar: "./public/your-logo.png",
```

---

## 🎨 Các Phần Khác Của Portfolio

Ngoài ra, bạn có thể sửa các thông tin khác như:

- **About Section**: Sửa nội dung giới thiệu chi tiết trong `src/components/Islands.js`
- **Skills**: Thêm/xóa kỹ năng trong mảng `skills` 
- **Projects**: Quản lý danh sách dự án trong mảng `projects`
- **Experience**: Thêm kinh nghiệm làm việc trong mảng `experience`

---

## 🚀 Chạy Trang

1. Server đã chạy trên: `http://127.0.0.1:5500`
2. Mở trình duyệt và truy cập URL trên
3. Thay đổi nội dung trong `src/api/profileConfig.js` sẽ tự động cập nhật (refresh trang)

---

## 📧 API & Backend Integration

File `src/api/profileConfig.js` có hàm `updateProfileConfig()` để tích hợp với backend API của bạn:

```javascript
export async function updateProfileConfig(section, key, value) {
  // Thay thế endpoint dưới đây bằng API thực tế của bạn
  // const response = await fetch('/api/profile/update', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ section, key, value })
  // });
}
```

---

## 💡 Gợi Ý

- **Tone màu**: Profile Card sử dụng glassmorphism với theme xanh ngọc (night) và vàng (day)
- **Responsive**: Portfolio tự động thích ứng với màn hình nhỏ
- **Animations**: Tất cả thành phần có hiệu ứng chuyển động mềm mại

Chúc bạn tạo được portfolio tuyệt vời! 🎉
