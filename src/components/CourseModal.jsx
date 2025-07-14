import React from "react";
import { X, Star, Clock, User, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/CourseModal/button";

export const CourseModal = ({ course, isOpen, onClose }) => {
  // Nếu modal không được thiết lập để mở, hoặc nếu không có dữ liệu khóa học, thì không render gì cả.
  if (!isOpen || !course) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    // Lớp bao bọc chính cho modal. Nó tạo ra một lớp phủ màu đen bán trong suốt bao phủ toàn bộ màn hình.
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Container chứa nội dung chính của modal với nền trắng và các góc bo tròn. */}
      {/* Nó có chiều rộng và chiều cao tối đa để đảm bảo hiển thị tốt trên mọi kích thước màn hình, với thanh cuộn dọc nếu nội dung quá dài. */}
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Container tương đối cho hình ảnh và nút đóng. */}
        <div className="relative">
          {/* Nút đóng được định vị ở góc trên cùng bên phải của hình ảnh. */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Hình ảnh chính của khóa học. */}
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-64 object-cover"
          />
        </div>
        {/* Container có padding cho tất cả nội dung văn bản bên dưới hình ảnh. */}
        <div className="p-6">
          {/* Bố cục lưới để cấu trúc nội dung thành hai cột trên màn hình vừa và lớn. */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cột bên trái, chiếm 2 trong 3 cột lưới, chứa các chi tiết chính của khóa học. */}
            <div className="md:col-span-2">
              {/* Tiêu đề khóa học */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {course.name}
              </h2>
              {/* Phần thông tin meta cho giảng viên và đánh giá. */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                {/* Thông tin giảng viên */}
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{course.instructor}</span>
                </div>
                {/* Thông tin đánh giá */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-500">
                    ({course.reviews} đánh giá)
                  </span>
                </div>
              </div>
              {/* Mô tả ngắn về khóa học. */}
              <div className="mb-4 text-gray-700">
                {course.shortDescription}
              </div>
              {/* Các chi tiết bổ sung như thời lượng, cấp độ và trạng thái chứng chỉ. */}
              <div className="flex items-center gap-4 mb-4">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{course.duration} giờ</span>
                <BookOpen className="w-4 h-4 text-green-500" />
                <span>{course.level}</span>
                <Award className="w-4 h-4 text-purple-500" />
                <span>
                  {course.certificate ? "Có chứng chỉ" : "Không có chứng chỉ"}
                </span>
              </div>
              {/* Giá khóa học đã được định dạng. */}
              <div className="font-bold text-2xl text-green-600 mb-4">
                {formatPrice(course.price)}
              </div>
            </div>
            {/* Cột bên phải, chiếm 1 cột lưới, chứa nút kêu gọi hành động (call-to-action). */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              {/* Nút "Đăng ký ngay" */}
              <Button size="lg" variant="default" className="w-full">
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
