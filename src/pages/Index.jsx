import React, { useState, useMemo } from "react";
import { mockCourses, priceRanges } from "@/data/mockData"; // Dữ liệu mẫu và các mức giá
import { useFavorites } from "@/hooks/useFavorites"; // Hook quản lý yêu thích
import { useViewHistory } from "@/hooks/useViewHistory"; // Hook quản lý lịch sử xem
import { useToast } from "@/hooks/use-toast"; // Hook hiển thị thông báo
import { Navigation } from "@/components/Navigation"; // Thanh điều hướng
import { SearchAndFilter } from "@/components/SearchAndFilter"; // Thanh tìm kiếm và lọc
import { CourseCard } from "@/components/CourseCard"; // Thẻ hiển thị khóa học
import { CourseModal } from "@/components/CourseModal"; // Modal chi tiết khóa học
import { AISuggestions } from "@/components/AISuggestions"; // Gợi ý AI
import { Heart, Clock, Trash2 } from "lucide-react"; // Icon
import { Button } from "@/components/ui/CourseModal/button"; // Nút bấm tuỳ chỉnh
import ChatbotWrapper from "@/components/ui/ChatBot/ChatbotWrapper"; // Wrapper cho chatbot

// Component chính của trang Index
const Index = () => {
  // State quản lý giao diện và dữ liệu
  const [currentView, setCurrentView] = useState("home"); // Trang hiện tại: home, favorites, history
  const [searchTerm, setSearchTerm] = useState(""); // Từ khoá tìm kiếm
  const [selectedPriceRange, setSelectedPriceRange] = useState(0); // Khoảng giá được chọn
  const [selectedCourse, setSelectedCourse] = useState(null); // Khóa học đang xem chi tiết
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal

  // Lấy các hàm và dữ liệu từ custom hook quản lý yêu thích
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();
  // Lấy các hàm và dữ liệu từ custom hook quản lý lịch sử xem
  const { viewHistory, addToHistory, removeFromHistory, clearHistory } =
    useViewHistory();

  // Hàm xóa một mục đầu tiên khỏi lịch sử (không dùng trong giao diện)
  const handleRemoveHistoryItem = () => {
    if (viewHistory.length > 0) {
      removeFromHistory(viewHistory[0].id);
    }
  };

  // Hàm xóa toàn bộ lịch sử xem
  const handleClearHistory = () => {
    clearHistory();
  };

  // Hook hiển thị toast/thông báo
  const { toast } = useToast();

  // Lọc danh sách khóa học theo từ khoá và khoảng giá
  const filteredCourses = useMemo(() => {
    let filtered = mockCourses;

    // Lọc theo từ khoá tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.shortDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo khoảng giá nếu có chọn
    if (selectedPriceRange > 0) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter(
        (course) => course.price >= range.min && course.price <= range.max
      );
    }

    return filtered;
  }, [searchTerm, selectedPriceRange]);

  // Thêm hoặc xóa khóa học khỏi danh sách yêu thích
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

  // Xem chi tiết khóa học (mở modal và thêm vào lịch sử)
  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    addToHistory(course);
  };

  // Hiển thị lưới các khóa học hoặc thông báo nếu rỗng
  const renderCourseGrid = (courses, emptyMessage) => {
    if (courses.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            {/* Hiển thị icon phù hợp với từng chế độ */}
            {currentView === "favorites" ? (
              <Heart className="w-16 h-16 mx-auto" />
            ) : (
              <Clock className="w-16 h-16 mx-auto" />
            )}
          </div>
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Duyệt qua danh sách khóa học và hiển thị từng thẻ */}
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={isFavorite(course.id)}
            onToggleFavorite={() => handleToggleFavorite(course)}
            onViewDetails={() => handleViewDetails(course)}
            onRemoveFromHistory={
              currentView === "history"
                ? () => removeFromHistory(course.id)
                : undefined
            }
          />
        ))}
      </div>
    );
  };

  // Giao diện chính của trang
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Thanh điều hướng */}
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        favoriteCount={favorites.length}
        historyCount={viewHistory.length}
      />
      <div className="container mx-auto px-4 pb-8">
        {/* Trang chủ: tìm kiếm, gợi ý AI, danh sách khóa học */}
        {currentView === "home" && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Khám phá khóa học chất lượng cao
              </h2>
              <p className="text-gray-600">
                Học từ các chuyên gia hàng đầu với hơn 1000+ khóa học chất lượng
              </p>
            </div>
            {/* Thanh tìm kiếm và lọc */}
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={(value) =>
                setSelectedPriceRange(parseInt(value))
              }
            />
            {/* Gợi ý AI */}
            <AISuggestions onViewDetails={handleViewDetails} />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Tất cả khóa học ({filteredCourses.length})
              </h3>
              {/* Hiển thị danh sách khóa học đã lọc */}
              {renderCourseGrid(
                filteredCourses,
                "Không tìm thấy khóa học nào phù hợp với bộ lọc của bạn."
              )}
            </div>
          </>
        )}
        {/* Trang yêu thích */}
        {currentView === "favorites" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Khóa học yêu thích ({favorites.length})
            </h3>
            {/* Hiển thị danh sách yêu thích */}
            {renderCourseGrid(favorites, "Bạn chưa có khóa học yêu thích nào.")}
          </div>
        )}
        {/* Trang lịch sử xem */}
        {currentView === "history" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-500" />
              Lịch sử xem ({viewHistory.length}){/* Nút xóa toàn bộ lịch sử */}
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHistory}
                disabled={viewHistory.length === 0}
                title="Xóa tất cả lịch sử"
                className="ml-1"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span className="sr-only">Xóa tất cả</span>
              </Button>
            </h3>
            {/* Hiển thị danh sách lịch sử xem */}
            {renderCourseGrid(viewHistory, "Bạn chưa xem khóa học nào.")}
          </div>
        )}
      </div>
      {/* Modal chi tiết khóa học */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ChatbotWrapper />
    </div>
  );
};

export default Index;
