
# EduMarket - Sàn Giáo Dục Thương Mại Điện Tử

Một sàn giáo dục thương mại điện tử hiện đại tích hợp AI, nơi người dùng có thể tìm kiếm, khám phá và yêu thích, kiểm tra lịch sử các khóa học chất lượng cao. Cùng với tương tác với Chat Bot để được tư vấn khóa học phù hợp nhất.


### Chức năng cốt lõi
- **Hiển thị danh sách khóa học**: Giao diện card hiện đại với thông tin đầy đủ
- **Tìm kiếm và lọc**: Tìm kiếm theo tên, lọc theo mức giá
- **Gợi ý thông minh AI**: Hệ thống gợi ý khóa học dựa trên hành vi người dùng
- **Modal chi tiết**: Xem thông tin đầy đủ về khóa học
- **Quản lý yêu thích**: Thêm/xóa khóa học yêu thích với localStorage
- **Quản lý lịch sử xem**: Thêm/xóa lịch sử xem khóa học với localStorage
- **Chatbot AI tư vấn sản phẩm**: Đặt câu hỏi hay mong muốn để được đề xuất khóa học phù hợp nhất
### Tính năng nâng cao
- **Lịch sử xem**: Theo dõi các khóa học đã xem
- **Loading skeleton**: Hiệu ứng loading khi gọi API
- **Xử lý lỗi**: Thông báo lỗi khi API fail
- **Toast notifications**: Thông báo tương tác người dùng
- **Responsive design**: Tối ưu cho mọi thiết bị

## Công nghệ sử dụng

- **Frontend**: React 18 + JavaScript XML
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Hooks (useState, useEffect, Custom hooks)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Responsive Design

- **Desktop**: Grid 3 cột
- **Tablet**: Grid 2 cột  
- **Mobile**: Grid 1 cột
- Navigation responsive với hamburger menu

## UI/UX Features

- **Màu sắc**: Palette xanh dương 
- **Typography**: Font Inter 
- **Hiệu ứng**: Hover states, transitions 
- **Layout**: Clean, organized, user-friendly
- **Accessibility**: ARIA labels, keyboard navigation

## Cài đặt và chạy

### Yêu cầu hệ thống
- npm >= 7.0.0

### Cài đặt
```bash

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev



### Scripts có sẵn
```bash
npm run dev          # Chạy development server
```


##  Tính năng AI

### Gợi ý thông minh
- Phân tích hành vi người dùng (mock)
- Gợi ý khóa học phù hợp
- Xử lý loading state và error handling
- API giả lập với độ trễ thực tế

### Mở rộng AI 
- Chatbot tư vấn khóa học NLP (compromise)
- Phân tích preferences người dùng
- Gợi ý dựa trên dữ liệu 

### LocalStorage
- Danh sách yêu thích
- Lịch sử xem khóa học
- Preferences người dùng

### Mock Data
- 6 khóa học mẫu đa dạng
- Thông tin đầy đủ (giá, rating, instructor, v.v.)


## Kế hoạch phát triển

### Phase 1 (Hiện tại)
- ✅ Giao diện cơ bản
- ✅ Tìm kiếm và lọc
- ✅ Quản lý yêu thích
- ✅ Quản lý lịch sử xem
- ✅ Gợi ý AI mock
- ✅ ChatBot AI gợi ý khóa học

## Performance

- **Bundle size**: Tối ưu với tree-shaking
- **Loading**: Lazy loading cho images
- **Caching**: LocalStorage cho data persistence
- **SEO**: Meta tags và semantic HTML



## Tác giả

- **Developer**: Pham Nguyen Tuan Anh
- **Design**: Inspired by Shopee, Italki, Wyzant
- **Icons**: Lucide React


---

