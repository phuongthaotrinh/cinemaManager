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
  
> Preview: 
