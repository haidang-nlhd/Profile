# Hướng dẫn khởi chạy dự án

## 1. Mục đích
File này hướng dẫn cách chạy dự án portfolio tĩnh trong thư mục `d:\MonHoc\Fe2\Profile`.

## 2. Yêu cầu
- Trình duyệt hiện đại: Chrome, Edge hoặc Firefox
- Node.js 16+ (đã cài)
- Hoặc VS Code với extension Live Server

## 3. Cách chạy nhanh
### 3.1. Dùng script chạy nhanh
1. Trong thư mục dự án, mở file `run-project.cmd` bằng File Explorer.
2. Nháy đúp để chạy script. Script sẽ mở terminal và chạy:
   ```powershell
   npm start
   ```

### 3.2. Dùng Node.js trực tiếp
1. Mở Cmder và vào thư mục dự án:
   ```powershell
   cd d:\MonHoc\Fe2\Profile
   ```
   > Cmder chỉ là terminal emulator, nên các lệnh Windows/Bash vẫn chạy bình thường.
2. Dependencies đã được cài sẵn lần đầu tại môi trường này.
   Nếu bạn muốn cài lại hoặc cập nhật, chạy:
   ```powershell
   npm install
   ```
   Nếu lệnh `npm` không được nhận diện, máy bạn chưa cài Node.js hoặc Node chưa được thêm vào PATH. Cài Node.js từ https://nodejs.org/en/download/ rồi mở lại Cmder.
3. Chạy server:
   ```powershell
   npm start
   ```
4. Mở trình duyệt và truy cập:
   ```text
   http://127.0.0.1:5500
   ```

### 3.3. Dùng VS Code Live Server
1. Mở thư mục `d:\MonHoc\Fe2\Profile` bằng VS Code.
2. Cài extension **Live Server** nếu chưa có.
3. Nhấp phải vào `index.html` và chọn **Open with Live Server**.

### 3.4. Dùng `npx serve` nếu muốn nhanh
1. Mở terminal trong thư mục dự án.
2. Chạy lệnh:
   ```powershell
   npx serve . -l 5500
   ```
3. Mở URL do `serve` cung cấp (thường là `http://localhost:3000`).

> Nếu bạn không muốn cài Python, hãy cài Node.js hoặc dùng Live Server. `npm` chỉ chạy khi Node.js đã được cài.

## 4. Kiểm tra sau khi chạy
- Nếu server chạy đúng, trang sẽ hiển thị nội dung của `index.html`.
- Nếu trang trắng hoặc lỗi, mở Developer Console bằng `F12` để kiểm tra.

## 5. Một số file quan trọng
- `index.html` - entry point của ứng dụng
- `index.css` - style chính
- `src/App.js` - component React chính
- `src/components/Ocean.js` - cảnh đại dương chính
- `src/api/profileConfig.js` - cấu hình thông tin cá nhân

## 6. Tùy chỉnh nhanh
- Sửa nội dung profile trong `src/api/profileConfig.js`
- Lưu file và refresh trang để xem thay đổi

## 7. Gợi ý deploy
- Dự án là trang tĩnh, có thể deploy lên GitHub Pages, Netlify, Vercel hoặc các hosting tĩnh khác.
- Copy toàn bộ thư mục và đẩy lên môi trường hosting tĩnh.

---

Chúc bạn chạy thành công dự án!