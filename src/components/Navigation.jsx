import React from "react";
import { Heart, History, Home, BookOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/CourseModal/button";

export const Navigation = ({
  currentView,
  onViewChange,
  favoriteCount,
  historyCount,
}) => {
  return (
    // Thẻ <nav> là container chính cho thanh điều hướng.
    <nav className="bg-white shadow-md mb-6">
      <div className="container mx-auto px-4">
        {/* Sắp xếp các mục bên trong theo chiều ngang, căn giữa và có chiều cao cố định. */}
        <div className="flex items-center justify-between h-16">
          {/* Phần logo và tên thương hiệu */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">EduMarket</h1>
          </div>
          {/* Phần chứa các nút điều hướng */}
          <div className="flex items-center gap-2">
            {/* Nút Trang chủ */}
            <Button
              // Thay đổi style của nút dựa trên `currentView`. 'default' (nền xanh) nếu đang ở trang chủ, ngược lại là 'ghost' (trong suốt).
              variant={currentView === "home" ? "default" : "ghost"}
              // Gọi hàm `onViewChange` để chuyển sang view 'home' khi nhấn.
              onClick={() => onViewChange("home")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              {/* Chữ "Trang chủ" sẽ bị ẩn trên màn hình nhỏ (sm) để tiết kiệm không gian. */}
              <span className="hidden sm:inline">Trang chủ</span>
            </Button>

            {/* Nút Yêu thích */}
            <Button
              variant={currentView === "favorites" ? "default" : "ghost"}
              onClick={() => onViewChange("favorites")}
              className="flex items-center gap-2 relative" // `relative` để định vị cho badge số lượng.
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Yêu thích</span>
              {/* Chỉ hiển thị badge số lượng nếu `favoriteCount` lớn hơn 0. */}
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Button>

            {/* Nút Lịch sử */}
            <div className="flex items-center gap-2 relative">
              <Button
                variant={currentView === "history" ? "default" : "ghost"}
                onClick={() => onViewChange("history")}
                className="flex items-center gap-2 relative"
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Lịch sử</span>
                {/* Chỉ hiển thị badge số lượng nếu `historyCount` lớn hơn 0. */}
                {historyCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {historyCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
