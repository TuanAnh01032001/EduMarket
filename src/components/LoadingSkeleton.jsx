import React from "react";

export const LoadingSkeleton = () => {
  return (
    // Container chính sử dụng CSS Grid để sắp xếp các card skeleton.
    // Bố cục sẽ thay đổi tùy theo kích thước màn hình (1 cột trên di động, 2 trên tablet, 3 trên desktop).
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Tạo một mảng với 6 phần tử và lặp qua nó để render 6 card skeleton.
        Đây là một cách nhanh để tạo ra nhiều component giống hệt nhau.
      */}
      {[...Array(6)].map((_, index) => (
        // Mỗi card skeleton là một thẻ div. `key` là bắt buộc và phải là duy nhất trong một vòng lặp.
        // `animate-pulse` là một lớp của Tailwind CSS tạo ra hiệu ứng nhấp nháy, mô phỏng trạng thái đang tải.
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          {/* Placeholder cho hình ảnh của card. */}
          <div className="w-full h-48 bg-gray-300"></div>
          {/* Container cho phần nội dung text của card. */}
          <div className="p-4">
            {/* Placeholder cho dòng tiêu đề. */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            {/* Placeholder cho dòng mô tả ngắn (rộng 3/4). */}
            <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
            {/* Placeholder cho một dòng thông tin khác (rộng 1/2). */}
            <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
            {/* Flex container cho phần chân card (giá và nút). */}
            <div className="flex justify-between items-center">
              {/* Placeholder cho giá tiền. */}
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              {/* Placeholder cho nút bấm. */}
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
