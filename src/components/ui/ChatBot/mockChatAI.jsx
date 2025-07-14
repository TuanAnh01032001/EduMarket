import { mockCourses } from '../../../data/mockData';

export function getAIResponse(input) {
    // Chuyển văn bản thành chữ thường và loại bỏ dấu câu đơn giản
    const query = input.toLowerCase(); 
    const courses = [...mockCourses]; // tránh thay đổi gốc
    // Lọc danh sách các khóa học `mockCourses` để tìm những khóa học khớp với từ khóa tìm kiếm.
    const matchedCourses = mockCourses.filter(course =>
    // Kiểm tra xem từ khóa có xuất hiện trong tên khóa học không.
    course.name.toLowerCase().includes(query) ||
    // Kiểm tra xem từ khóa có xuất hiện trong mô tả đầy đủ không.
    course.fullDescription.toLowerCase().includes(query) ||
    // Kiểm tra xem từ khóa có xuất hiện trong danh mục không.
    course.category.toLowerCase().includes(query) ||
    // Kiểm tra xem có bất kỳ thẻ (tag) nào chứa từ khóa không.
    course.tags.some(tag => tag.toLowerCase().includes(query))
  );

  // Nếu tìm thấy ít nhất một khóa học phù hợp.
  if (matchedCourses.length > 0  ) {
    // Trả về một tin nhắn thông báo thành công và danh sách các khóa học đã tìm thấy.
    return {
      text: `📌 Tìm thấy ${matchedCourses.length} khóa học phù hợp với yêu cầu của bạn:`,
      suggestions: matchedCourses
    };
  }

  
  // Nếu không tìm thấy khóa học nào.
  // Trả về một tin nhắn thông báo không tìm thấy và một mảng rỗng cho các gợi ý.
  return {
    text: `😢 Xin lỗi, tôi chưa tìm thấy khoá học nào phù hợp. Bạn có thể thử lại với từ khoá như "Tiếng anh", "IELTS", "Luyện tập", "Chiến lược"...`,
    suggestions: []
  };
}

/**
 * 💡 Lấy ra danh sách các từ khóa gợi ý ban đầu để hiển thị cho người dùng.
 * Hàm này sẽ thu thập tất cả các 'category' và 'tags' từ dữ liệu
 * và loại bỏ các giá trị trùng lặp.
 * @returns {Array<string>} - Một mảng chứa các từ khóa gợi ý độc nhất.
 */
export function getInitialSuggestions() {
  // Dùng Set để đảm bảo mỗi từ khóa chỉ xuất hiện một lần.
  const keywordSet = new Set();

  // Lặp qua tất cả các khóa học trong dữ liệu.
  mockCourses.forEach(course => {
    // Thêm danh mục (category) của khóa học vào Set.
    if (course.category) {
      keywordSet.add(course.category);
    }
    // Thêm tất cả các thẻ (tags) của khóa học vào Set.
    if (course.tags && course.tags.length > 0) {
      course.tags.forEach(tag => keywordSet.add(tag));
    }
  });

  // Chuyển Set trở lại thành một mảng và trả về.
  // Bạn có thể thêm logic để giới hạn số lượng hoặc xáo trộn nếu muốn.
  // Ví dụ: return Array.from(keywordSet).slice(0, 5); // Chỉ lấy 5 gợi ý đầu tiên
  return Array.from(keywordSet).slice(0, 8);
}

export function extractKeyword(text) {
  // Chuyển văn bản thành chữ thường và loại bỏ dấu câu đơn giản
  const cleanText = text.toLowerCase().replace(/[?.!]/g, '');

  // Danh sách từ khóa có trong mockCourses
  const allKeywords = new Set();
  mockCourses.forEach(course => {
    allKeywords.add(course.category.toLowerCase());
    course.tags.forEach(tag => allKeywords.add(tag.toLowerCase()));
    allKeywords.add(course.name.toLowerCase());
  });

  // Tìm từ khóa nào có trong câu người dùng
  for (const keyword of allKeywords) {
    if (cleanText.includes(keyword)) {
      return keyword;
    }
  }

  // Không tìm thấy thì trả nguyên câu để fallback
  return text;
}
