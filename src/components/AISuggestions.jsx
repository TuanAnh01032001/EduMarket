import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react"; // Icon
import { Button } from "@/components/ui/CourseModal/button"; // Button tùy chỉnh
import { mockCourses } from "@/data/mockData"; // Dữ liệu gợi ý giả lập
import { CourseCard } from "./CourseCard"; // Thẻ hiển thị khóa học
import { useFavorites } from "@/hooks/useFavorites"; // Hook quản lý danh sách yêu thích
import { useToast } from "@/hooks/use-toast"; // Hook hiển thị toast

// Component gợi ý khóa học bằng AI
export const AISuggestions = ({ onViewDetails }) => {
  const [suggestions, setSuggestions] = useState([]); // Danh sách gợi ý
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [hasError, setHasError] = useState(false); // Trạng thái lỗi
  const [viewedCourses, setViewedCourses] = useState([]);
  // Hook quản lý "yêu thích"
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  // Hook toast để hiển thị thông báo
  const { toast } = useToast();

  const handleViewDetails = (course) => {
    // Nếu chưa từng xem khóa học này thì thêm vào danh sách
    setViewedCourses((prev) =>
      prev.includes(course.id) ? prev : [...prev, course.id]
    );

    // Gọi lại hàm xem chi tiết gốc
    onViewDetails(course);
  };

  // Hàm giả lập gọi API gợi ý khóa học
  const fetchSuggestions = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Lấy tags của các khóa học đã xem
      const viewedTags = new Set(
        mockCourses
          .filter((c) => viewedCourses.includes(c.id))
          .flatMap((c) => c.tags)
      );

      // Lọc các khóa học có ít nhất 1 tag trùng
      const relatedCourses = mockCourses.filter(
        (c) =>
          c.tags.some((tag) => viewedTags.has(tag)) &&
          !viewedCourses.includes(c.id)
      );

      // Fallback nếu chưa xem khóa nào
      const fallbackCourses = mockCourses.slice(0, 3);

      setSuggestions(
        relatedCourses.length > 0 ? relatedCourses : fallbackCourses
      );

      toast({
        title: "Gợi ý khóa học",
        description:
          relatedCourses.length > 0
            ? "Dựa theo các khóa học bạn đã xem."
            : "Bạn chưa xem khóa nào, nên đây là gợi ý phổ biến.",
      });
    } catch (err) {
      setHasError(true);
      toast({
        title: "Lỗi",
        description: "Không thể lấy gợi ý lúc này.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Thêm hoặc xóa khóa học khỏi yêu thích
  const handleToggleFavorite = (course) => {
    if (isFavorite(course.id)) {
      removeFromFavorites(course.id);
      toast({
        title: "Đã xóa khỏi yêu thích",
        description: `${course.name} đã được xóa khỏi danh sách yêu thích.`,
      });
    } else {
      addToFavorites(course);
      toast({
        title: "Đã thêm vào yêu thích",
        description: `${course.name} đã được thêm vào danh sách yêu thích.`,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Tiêu đề + nút gợi ý */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          Gợi ý AI cho bạn
        </h2>

        {/* Nút gọi API gợi ý */}
        <Button
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang tìm kiếm...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gợi ý sản phẩm phù hợp
            </>
          )}
        </Button>
      </div>

      {/* Thông báo lỗi nếu có */}
      {hasError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          <p className="font-medium">Không thể lấy gợi ý lúc này</p>
          <p className="text-sm">
            Vui lòng kiểm tra kết nối mạng và thử lại sau.
          </p>
        </div>
      )}

      {/* Hiển thị loading skeleton khi đang tải */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 animate-pulse"
            >
              <div className="w-full h-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị danh sách gợi ý nếu có */}
      {suggestions.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={isFavorite(course.id)} // Trạng thái yêu thích
              onToggleFavorite={() => handleToggleFavorite(course)} // Xử lý khi click tim
              onViewDetails={() => handleViewDetails(course)} // Xem chi tiết
            />
          ))}
        </div>
      )}

      {/* Giao diện mặc định khi chưa có gợi ý */}
      {suggestions.length === 0 && !isLoading && !hasError && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>
            Nhấn nút "Gợi ý sản phẩm phù hợp" để khám phá những khóa học dành
            riêng cho bạn!
          </p>
        </div>
      )}
    </div>
  );
};
