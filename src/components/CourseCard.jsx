import React from "react";
import { Heart, Star, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/CourseModal/button";

export const CourseCard = ({
  course,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onRemoveFromHistory,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    // Thẻ div chính của card, chứa toàn bộ nội dung.
    // Có các hiệu ứng khi di chuột vào như đổ bóng, nhấc lên một chút.
    // flex-col và h-full đảm bảo các card trong cùng một hàng sẽ có chiều cao bằng nhau.
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col h-full min-h-[480px]">
      {/* Nút xóa khỏi lịch sử: chỉ hiển thị khi prop onRemoveFromHistory được truyền vào. */}
      {onRemoveFromHistory && (
        <button
          onClick={onRemoveFromHistory} // Gọi hàm xóa khi được nhấn.
          className="absolute top-3 left-3 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors z-10"
          title="Xóa khỏi lịch sử xem"
        >
          {/* Icon dấu X */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Khu vực chứa ảnh bìa của khóa học và nút yêu thích. */}
      <div className="relative">
        {/* Ảnh bìa của khóa học */}
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-48 object-cover"
        />
        {/* Nút yêu thích (hình trái tim) */}
        <button
          onClick={onToggleFavorite} // Gọi hàm bật/tắt yêu thích khi nhấn.
          // Thay đổi style dựa trên trạng thái `isFavorite`.
          // Nếu đã yêu thích thì có nền đỏ, chữ trắng.
          // Nếu chưa, có nền trắng mờ và thay đổi màu khi di chuột.
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          {/* Icon trái tim, được tô màu nếu isFavorite là true. */}
          <Heart
            className="w-4 h-4"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Khu vực chứa nội dung text của card. */}
      {/* flex-1 và flex-col giúp khu vực này giãn ra để lấp đầy không gian còn lại trong card. */}
      <div className="flex flex-col flex-1 p-4">
        {/* Tên khóa học */}
        <h3
          className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[48px] max-h-[48px] h-[48px] overflow-hidden text-left cursor-pointer"
          title={course.name} // Hiển thị tên đầy đủ khi di chuột vào.
          onClick={onViewDetails} // Cho phép nhấn vào tên để xem chi tiết.
        >
          {course.name}
        </h3>

        {/* Mô tả ngắn của khóa học. line-clamp-2 giới hạn hiển thị trong 2 dòng. */}
        <div className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[40px] max-h-[40px] h-[40px] overflow-hidden">
          {course.shortDescription}
        </div>

        {/* Thông tin giảng viên */}
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-gray-500" />
          <span>{course.instructor}</span>
        </div>

        {/* Thông tin đánh giá (rating) */}
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span>{course.rating}</span>
          <span className="text-gray-500">({course.reviews} đánh giá)</span>
        </div>

        {/* Thông tin thời lượng khóa học */}
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>{course.duration} giờ</span>
        </div>

        {/* Phần chân card, chứa giá tiền và nút xem chi tiết. */}
        {/* mt-auto đẩy phần này xuống dưới cùng của card. */}
        <div className="flex items-center justify-between mt-auto">
          {/* Giá khóa học đã được định dạng */}
          <span className="font-bold text-lg text-green-600">
            {formatPrice(course.price)}
          </span>
          {/* Nút "Xem chi tiết" */}
          <Button onClick={onViewDetails} size="sm" variant="default">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};
