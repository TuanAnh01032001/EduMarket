import { useState, useEffect } from 'react';
import { Course } from '../data/mockData';

// Hook tùy chỉnh để quản lý danh sách khóa học "yêu thích"
export const useFavorites = () => {
  // Khởi tạo state chứa danh sách các khóa học đã được đánh dấu yêu thích
  const [favorites, setFavorites] = useState<Course[]>([]);

  // Khi component mount, lấy dữ liệu yêu thích từ localStorage (nếu có)
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      // Chuyển đổi chuỗi JSON thành mảng đối tượng Course
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Hàm thêm một khóa học vào danh sách yêu thích
  const addToFavorites = (course: Course) => {
    const newFavorites = [...favorites, course]; // Tạo mảng mới có thêm khóa học mới
    setFavorites(newFavorites); // Cập nhật state
    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Lưu vào localStorage
  };

  // Hàm xóa một khóa học khỏi danh sách yêu thích
  const removeFromFavorites = (courseId: string) => {
    // Lọc ra các khóa học khác với ID cần xóa
    const newFavorites = favorites.filter(course => course.id !== courseId);
    setFavorites(newFavorites); // Cập nhật state
    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Lưu vào localStorage
  };

  // Hàm kiểm tra một khóa học có nằm trong danh sách yêu thích hay không
  const isFavorite = (courseId: string) => {
    return favorites.some(course => course.id === courseId); // Trả về true nếu có
  };

  // Trả ra các hàm và dữ liệu để component sử dụng
  return {
    favorites,             // Danh sách các khóa học đã thích
    addToFavorites,        // Hàm thêm vào yêu thích
    removeFromFavorites,   // Hàm xóa khỏi yêu thích
    isFavorite             // Hàm kiểm tra trạng thái yêu thích
  };
};
