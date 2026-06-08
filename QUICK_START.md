# 🚀 QUICK START GUIDE

## 📍 Trang Đã Chạy Thành Công!

Portfolio của bạn đang chạy tại: **http://127.0.0.1:5500**

---

## ⚙️ Bước 1: Tùy Chỉnh Thông Tin Brand

Mở file: `src/api/profileConfig.js`

Tìm và sửa các giá trị sau:

```javascript
const PROFILE_CONFIG = {
  brand: {
    name: "Nguyễn Lê Hải Đăng",           // ← Thay tên của bạn
    slogan: "Full Stack Developer",       // ← Slogan/tag line
    description: "Xây dựng...",           // ← Giới thiệu chi tiết
    avatar: "URL_OF_YOUR_IMAGE"           // ← Link ảnh logo/avatar
  },
  contact: {
    email: "your.email@example.com",     // ← Email
    phone: "+84 123 456 7890",           // ← SĐT
    website: "https://yoursite.com",    // ← Website
    facebook: "https://facebook.com/..." // ← Facebook
  }
};
```

Lưu file → Refresh trang (`F5`) → Thay đổi sẽ hiển thị ngay!

---

## 🎮 Bước 2: Khám Phá Portfolio

### Điều Khiển:
- **Phím mũi tên / WASD**: Lái thuyền
- **Space / Enter**: Xem thông tin đảo hiện tại
- **Escape**: Đóng panel
- **Click đảo**: Lái tới đảo đó

### Các Tính Năng:
- 🌙 **Moon/Sun**: Đổi night/day mode
- 🔊 **Speaker**: Bật/tắt âm thanh sóng biển
- ⚙️ **Settings**: Điều chỉnh độ sóng, thuyền, lighting, v.v.

---

## 📝 Bước 3: Sửa Thông Tin Chi Tiết

### About (Giới Thiệu)
File: `src/components/Islands.js` → tìm `AboutPanel`

### Skills (Kỹ Năng)  
File: `src/api/profileConfig.js` → `skills` array

### Projects (Dự Án)
File: `src/api/profileConfig.js` → `projects` array

### Experience (Lộ Trình)
File: `src/api/profileConfig.js` → `experience` array

---

## 🎨 Bước 4: Tùy Chỉnh Giao Diện (Optional)

### Đổi Màu Chủ Đạo
File: `index.css` → tìm `:root` section

```css
:root {
  --primary-glow: #00f3ff;      /* Màu xanh ngọc */
  --secondary-glow: #bd00ff;    /* Màu tím */
  --accent-glow: #39ff14;       /* Màu xanh lá */
}
```

### Đổi Font
File: `index.css` → tìm `--font-display`, `--font-primary`

---

## 🔗 Bước 5: Backend API Integration (Advanced)

Nếu bạn muốn lưu dữ liệu vào database, sửa file `src/api/profileConfig.js`:

```javascript
export async function updateProfileConfig(section, key, value) {
  // Bỏ comment dòng dưới và thay YOUR_API_ENDPOINT
  const response = await fetch('YOUR_API_ENDPOINT/profile/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, key, value })
  });
  return await response.json();
}
```

---

## 📱 Bước 6: Deploy (Production)

### Dùng Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Dùng GitHub Pages
1. Push code lên GitHub
2. Settings → Pages
3. Deploy from branch

### Dùng Netlify
1. Kết nối GitHub repository
2. Build command: (để trống)
3. Publish directory: `.` (thư mục gốc)

---

## ❓ Troubleshooting

### Trang không load
- Kiểm tra server còn chạy: `http://127.0.0.1:5500`
- Refresh trang (`Ctrl+Shift+R`)
- Check browser console (`F12`) xem có error

### ProfileCard không hiển thị
- Đảm bảo `profileData` được load trong App.js
- Kiểm tra network tab xem có lỗi fetch

### Ảnh/Avatar không load
- Sử dụng link HTTPS (không `file://`)
- Kiểm tra CORS policy

### Thuyền/Đảo không hiển thị
- Tắt ad blocker (có thể chặn CDN)
- Thử Chrome/Edge thay vì Firefox

---

## 📚 File Hữu Ích

- [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) - Chi tiết tùy chỉnh
- [README.md](./README.md) - Tổng quan dự án
- [src/api/profileConfig.js](./src/api/profileConfig.js) - Config chính

---

## 🎉 Xong!

Bạn đã sẵn sàng có một portfolio tuyệt vời! 

**Mẹo**: Hãy thêm ảnh chân dung đẹp làm avatar và viết giới thiệu chi tiết để làm ấn tượng với nhà tuyển dụng.

---

**Cần giúp?** Xem CUSTOMIZATION_GUIDE.md hoặc kiểm tra browser console.

Happy coding! 🚀✨
