# 📧 Hướng Dẫn Thiết Lập EmailJS

Để cho phép form liên hệ gửi email đến `nguyenlehaidang2685@gmail.com`, bạn cần thiết lập EmailJS (dịch vụ gửi email từ frontend).

## 📋 Các Bước Thiết Lập

### Bước 1: Đăng Ký EmailJS
1. Truy cập https://www.emailjs.com/
2. Nhấp "Sign Up Free" 
3. Đăng ký bằng Email hoặc GitHub

### Bước 2: Lấy Public Key
1. Sau khi đăng nhập, vào **Account** → **API Keys**
2. Copy **Public Key** (dạng: `1a2b3c4d5e6f7g8h9`)
3. Mở file [src/components/Islands.js](src/components/fIslands.js#L550)
4. Tìm dòng: `emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');`
5. Thay `'YOUR_EMAILJS_PUBLIC_KEY'` bằng Public Key của bạn

**Ví dụ:**
```javascript
emailjs.init('1a2b3c4d5e6f7g8h9');
```

### Bước 3: Thiết Lập Email Service
1. Trong EmailJS dashboard, vào **Email Services** (hoặc **Add Service**)
2. Chọn **Gmail** (hoặc email provider của bạn)
3. Đã bạn sẽ được yêu cầu xác nhận email
4. Copy **Service ID** (dạng: `service_a1b2c3d4e5f6g7h8`)

### Bước 4: Tạo Email Template
1. Vào **Email Templates**
2. Nhấp **Create New Template**
3. Đặt tên template (ví dụ: `contact_form`)
4. Copy **Template ID** (dạng: `template_a1b2c3d4e5f6g7h8`)

5. Trong **Email Content**, thiết lập như sau:

**To Email:**
```
{{to_email}}
```

**Subject:**
```
Tin nhắn từ Portfolio: {{from_name}}
```

**HTML Content:**
```html
<p>Xin chào,</p>
<p>Bạn nhận được tin nhắn mới từ portfolio của bạn:</p>
<p><strong>Từ:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Tin nhắn:</strong></p>
<p>{{message}}</p>
<hr>
<p><em>Tin nhắn này được gửi từ biểu mẫu liên hệ trên portfolio của bạn.</em></p>
```

6. Nhấp **Save** và **Test it**

### Bước 5: Cập Nhật Code
Mở [src/components/Islands.js](src/components/Islands.js#L550) và tìm dòng này:

```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID',      // ← Thay bằng Service ID của bạn
  'YOUR_TEMPLATE_ID',     // ← Thay bằng Template ID của bạn
  templateParams
);
```

**Ví dụ hoàn chỉnh:**
```javascript
const response = await emailjs.send(
  'service_a1b2c3d4e5f6g7h8',
  'template_xyz123',
  templateParams
);
```

## ✅ Kiểm Tra
1. Lưu file
2. Mở ứng dụng portfolio trong trình duyệt
3. Nhấp vào "Hải Đăng Liên Hệ" (lighthouse island)
4. Điền form và nhấp "Truyền Tín Hiệu"
5. Bạn sẽ nhận được email tại `nguyenlehaidang2685@gmail.com`

## 🔐 Bảo Mật
- **Public Key có thể hiện trước mọi người** (chứ không phải secret)
- EmailJS sẽ xác nhận yêu cầu từ domain của bạn
- Hạn mức miễn phí: **200 email/tháng**

## ❓ Troubleshooting

**Lỗi: "EmailJS not loaded"**
- Kiểm tra xem EmailJS script đã được tải trong [index.html](index.html)

**Không nhận được email:**
- Kiểm tra Service ID và Template ID chính xác
- Kiểm tra email address được thiết lập trong Email Services
- Thử **Test Template** trong EmailJS dashboard

**Tương tác lỗi:**
- Mở DevTools (F12) → Console để xem lỗi chi tiết
- Share lỗi với quản lý để debug

## 📚 Tài Liệu Thêm
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Email Templates](https://www.emailjs.com/docs/tutorial/creating-email-templates/)
