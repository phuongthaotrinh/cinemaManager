# Readme đang update 
# cinemaManager


# 
> How to run this project? <br/>

  1. Client ::: cd Client: -> npm install / npm install --force -> npm run dev <br>

  2. Server ::: cd Server -> npm install / npm install --force -> npm run start <br>

> Feature: 

  1. CLient
  - Đăng ký, đăng nhập, 
  - Tìm kiếm (theo đơn hàng, mã đơn hàng và tìm theo phim)
  - Xem danh sách phim, chi tiết, suất chiếu
  - Xem và tạo comment
  - Chỉnh sửa thông tin
  - Đặt vé xem phim (đa dạng sự lựa chọn với nhiều khung giờ và phòng chiếu)
  - Thuận tiện thanh toán online 
  
  2. Admin ( Ngoài CRUD, admin sẽ có 1 số chức năng đặc biệt như :)
   - Quản lí loại ghế: sử dụng data động, admin có thể dễ dàng chỉnh sửa màu hiển thị, mức giá của loại ghế
   - Quản lí phòng chiếu: <br>
      + Dễ dàng cập nhật loại ghế trong phòng theo từng hàng, từng ghế, hoặc nhiều hàng
      => loại ghế ảnh hưởng 1 phần tới giá bán cuối cùng (gía vé)
      + Xem danh sách giờ chiếu theo phòng
   - Quản lí phim: <br>
       + Dễ dàng lọc và quản lí những phim có ngày khởi chiếu quá 1 tháng
       + Tạo nhanh phim trong 3s mà không cần nhập tay (admin truy cập website https://www.themoviedb.org/ để lấy id phim, hệ thống sẽ trả ra kết quả và điển vào form tạo phim)
       + Dễ dàng xem danh sách giở chiếu của từng phim
   - Quản lí giờ chiếu: <br>
      + Dễ dàng quản lí   
      + Khi tạo phim, hệ thống tự động trả ra thời gian kết thúc của suất chiếu (admin chỉ cần chọn thời gian bắt đầu)
   - Quản lí thể loại phim: <br>
      + Tạo nhanh 1 loạt danh sách thể loại với api của https://www.themoviedb.org/ 
   - Quản lí đơn hàng: <br>
     + Dễ dàng quản lí và cập nhật trạng thái cho đơn hàng
     + Dễ dàng xuất vé cho người dùng
     + Dễ dàng tìm kiếm đơn hàng theo tên, mã đơn và id khách hàng
> Preview: 
  1. Client
  - Trang chủ <br>
  ![image](https://user-images.githubusercontent.com/51841214/227824986-cbbdda0e-fe1b-4fe6-8869-ee785358b9dc.png)
  
  - Trang chi tiết phim
  ![image](https://user-images.githubusercontent.com/51841214/227825296-63f6c748-ac88-4a4f-b27e-5a7db208090e.png)
  
  
  2. Admin
  - Trang quản trị phim <br>
   ![image](https://user-images.githubusercontent.com/51841214/227825444-03a3d1dc-1486-485e-b006-cd51438b78ae.png)
  - Trang thêm phim <br>
   ![image](https://user-images.githubusercontent.com/51841214/227825713-2f3cb53e-c083-4624-a189-c31a73869aa1.png)
 - Trang danh sách giở chiếu theo phim và tạo nhanh suất chiếu <br>
   ![image](https://user-images.githubusercontent.com/51841214/227825928-6d310591-483e-456c-9fba-a4de05b9a674.png)
  - Trang chỉnh sửa và cập nhật thông tin loại ghế <br>
   ![image](https://user-images.githubusercontent.com/51841214/227826173-9707a080-d623-4abb-b96b-89b8c30ed9b0.png)
- Trang chỉnh sửa thông tin phòng chiếu <br>
   ![image](https://user-images.githubusercontent.com/51841214/227826273-ddd82645-c7f2-4dd2-bf52-df932404886a.png)  
- Trang quản lí ghế theo phòng (option update thông tin theo hàng)
   ![image](https://user-images.githubusercontent.com/51841214/227826397-8de03325-4343-4b93-9d06-38bad8afc0a8.png)
- Trang quản lí ghế theo phòng (option update thông tin theo nhiều hàng)
   ![image](https://user-images.githubusercontent.com/51841214/227826636-83be2042-6350-4868-9d2c-0db1ef746d79.png)
- Trang quản lí ghế theo phòng (option update thông tin theo từng ghế)
   ![image](https://user-images.githubusercontent.com/51841214/227826668-8bd23272-9fb9-4b33-a89f-3adb4553f6a4.png)

