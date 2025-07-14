import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/CourseModal/button';
import { mockCourses } from '@/data/mockData';
import { CourseCard } from './CourseCard';
import { useFavorites } from '@/hooks/useFavorites';
import { useViewHistory } from '@/hooks/useViewHistory';
import { useToast } from '@/hooks/use-toast';

 /**
   * ưu tiên gợi ý các khóa học cùng tags/category với đã thích/xem
   * Tuy nhiên sẽ tránh gợi ý các khóa học đã thích hoặc đã xem trước đó.
   * Ví dụ: nếu người dùng đã thích khóa học về "Tiếng Anh Giao Tiếp Cơ Bản" và đã xem khóa học về "Tiếng Anh Giao Tiếp Cơ Bản",
   * thì gợi ý sẽ ưu tiên các khóa học khác về "Luyện Nghe Nói Tiếng Anh Qua Phim"
   */
export const AISuggestions = ({ onViewDetails }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const { viewHistory } = useViewHistory();
  const { toast } = useToast();

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // Lấy danh sách id đã thích/xem
      const favoriteIds = favorites.map(c => c.id);
      const viewedIds = viewHistory.map(c => c.id);
      // Lấy tags và category từ các khóa học đã thích/xem
      const likedTags = new Set(favorites.flatMap(c => c.tags));
      const viewedTags = new Set(viewHistory.flatMap(c => c.tags));
      const likedCategories = new Set(favorites.map(c => c.category));
      const viewedCategories = new Set(viewHistory.map(c => c.category));

      // Lọc ra các khóa học chưa thích/chưa xem
      const notInteracted = mockCourses.filter(c => !favoriteIds.includes(c.id) && !viewedIds.includes(c.id));

      // Ưu tiên gợi ý các khóa học cùng tags/category với đã thích/xem
      let smartSuggestions = notInteracted.filter(c =>
        c.tags.some(tag => likedTags.has(tag) || viewedTags.has(tag)) ||
        likedCategories.has(c.category) || viewedCategories.has(c.category)
      );

      // Nếu chưa đủ 3 gợi ý, bổ sung random từ các khóa học còn lại
      if (smartSuggestions.length < 3) {
        const remaining = notInteracted.filter(c => !smartSuggestions.includes(c));
        while (smartSuggestions.length < 3 && remaining.length > 0) {
          const idx = Math.floor(Math.random() * remaining.length);
          smartSuggestions.push(remaining[idx]);
          remaining.splice(idx, 1);
        }
      }

      // Nếu vẫn chưa đủ, lấy từ toàn bộ mockCourses (trừ đã thích/xem)
      if (smartSuggestions.length === 0) {
        smartSuggestions = notInteracted.slice(0, 3);
      }

      setSuggestions(smartSuggestions);
      toast({
        title: 'Gợi ý thành công!',
        description: 'Chúng tôi đã tìm được những khóa học phù hợp với bạn.',
      });
    } catch (error) {
      setHasError(true);
      toast({
        title: 'Lỗi',
        description: 'Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (course) => {
    if (isFavorite(course.id)) {
      removeFromFavorites(course.id);
      toast({
        title: 'Đã xóa khỏi yêu thích',
        description: `${course.name} đã được xóa khỏi danh sách yêu thích.`,
      });
    } else {
      addToFavorites(course);
      toast({
        title: 'Đã thêm vào yêu thích',
        description: `${course.name} đã được thêm vào danh sách yêu thích.`,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          Gợi ý AI cho bạn
        </h2>

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

      {hasError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          <p className="font-medium">Không thể lấy gợi ý lúc này</p>
          <p className="text-sm">Vui lòng kiểm tra kết nối mạng và thử lại sau.</p>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="w-full h-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={isFavorite(course.id)}
              onToggleFavorite={() => handleToggleFavorite(course)}
              onViewDetails={() => onViewDetails(course)}
            />
          ))}
        </div>
      )}

      {suggestions.length === 0 && !isLoading && !hasError && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>
            Nhấn nút "Gợi ý sản phẩm phù hợp" để khám phá những khóa học dành riêng cho bạn!
          </p>
        </div>
      )}
    </div>
  );
};
