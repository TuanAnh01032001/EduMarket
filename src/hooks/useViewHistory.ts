import { useState, useEffect } from 'react';
import { Course } from '../data/mockData';

// Hook tùy chỉnh dùng để quản lý lịch sử xem khóa học
export const useViewHistory = () => {
  // State lưu danh sách các khóa học đã xem
  const [viewHistory, setViewHistory] = useState<Course[]>([]);

  // Khi component mount, lấy lịch sử xem từ localStorage (nếu có)
  useEffect(() => {
    const savedHistory = localStorage.getItem('viewHistory');
    if (savedHistory) {
      setViewHistory(JSON.parse(savedHistory)); // Gán vào state sau khi parse từ JSON
    }
  }, []);

  // Hàm thêm một khóa học vào lịch sử xem
  const addToHistory = (course: Course) => {
    // Kiểm tra xem khóa học đã tồn tại trong lịch sử chưa
    const existingIndex = viewHistory.findIndex(item => item.id === course.id);
    let newHistory = [...viewHistory];

    if (existingIndex !== -1) {
      // Nếu đã tồn tại, xóa mục cũ để tránh trùng lặp
      newHistory.splice(existingIndex, 1);
    }

    // Thêm khóa học mới vào đầu danh sách (gần nhất xem đầu tiên)
    newHistory.unshift(course);

    // Chỉ giữ lại 10 khóa học gần nhất
    newHistory = newHistory.slice(0, 10);

    // Cập nhật state và lưu vào localStorage
    setViewHistory(newHistory);
    localStorage.setItem('viewHistory', JSON.stringify(newHistory));
  };

  // Hàm xóa một khóa học khỏi lịch sử xem
  const removeFromHistory = (courseId: string) => {
    const newHistory = viewHistory.filter(item => item.id !== courseId);
    setViewHistory(newHistory);
    localStorage.setItem('viewHistory', JSON.stringify(newHistory));
  };

  // Hàm xóa toàn bộ lịch sử xem
  const clearHistory = () => {
    setViewHistory([]);
    localStorage.removeItem('viewHistory');
  };

  // Trả ra các giá trị và hàm xử lý để dùng trong component
  return {
    viewHistory,         // Danh sách các khóa học đã xem
    addToHistory,        // Thêm khóa học vào lịch sử
    removeFromHistory,   // Xóa một khóa học khỏi lịch sử
    clearHistory         // Xóa toàn bộ lịch sử
  };
};
