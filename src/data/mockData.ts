
export interface Course {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  instructor: string;
  rating: number;
  reviews: number;
  duration: string;
  level: string;
  category: string;
  tags: string[];
}

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Tiếng Anh Giao Tiếp Cơ Bản",
    price: 499000,
    image: "https://aten.edu.vn/wp-content/uploads/2023/12/qua-trinh-hoc-tieng-anh-giao-tiep-danh-cho-nguoi-di-lam-1.jpg",
    shortDescription: "Giao tiếp tiếng Anh tự tin trong các tình huống hàng ngày.",
    fullDescription: "Khóa học này giúp bạn xây dựng nền tảng giao tiếp cơ bản với các chủ đề quen thuộc như chào hỏi, mua sắm, hỏi đường và giới thiệu bản thân. Bao gồm thực hành phản xạ và hội thoại.",
    instructor: "Nguyễn Thị A",
    rating: 4.7,
    reviews: 1200,
    duration: "30 giờ",
    level: "Cơ bản",
    category: "Tiếng Anh Giao Tiếp",
    tags: ["Giao tiếp", "Cơ bản", "Phản xạ", "Hội thoại"]
  },
  {
    id: "2",
    name: "Tiếng Anh Cho Người Mất Gốc",
    price: 599000,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=300&fit=crop",
    shortDescription: "Lấy lại căn bản tiếng Anh từ đầu: từ vựng, ngữ pháp, phát âm.",
    fullDescription: "Khóa học phù hợp với người mất gốc hoàn toàn. Tập trung vào cách phát âm chuẩn, từ vựng phổ thông, cấu trúc câu cơ bản và các bài luyện nghe – nói đơn giản.",
    instructor: "Lê Văn B",
    rating: 4.6,
    reviews: 980,
    duration: "35 giờ",
    level: "Mất gốc",
    category: "Căn bản",
    tags: ["Mất gốc", "Ngữ pháp", "Từ vựng", "Phát âm"]
  },
  {
    id: "3",
    name: "Tiếng Anh Cho Công Việc",
    price: 899000,
    image: "https://i.ytimg.com/vi/_uaSN1I0Vos/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASngLFQGYoEvIWmNg-YPvagwW0Qw",
    shortDescription: "Phát triển kỹ năng tiếng Anh chuyên nghiệp nơi công sở.",
    fullDescription: "Tập trung vào kỹ năng viết email, thuyết trình, họp hành và trò chuyện chuyên nghiệp bằng tiếng Anh. Dành cho người đang đi làm và muốn cải thiện giao tiếp trong môi trường quốc tế.",
    instructor: "Phạm Thị C",
    rating: 4.8,
    reviews: 860,
    duration: "40 giờ",
    level: "Trung cấp",
    category: "Tiếng Anh Công Sở",
    tags: ["Công việc", "Email", "Thuyết trình", "Giao tiếp"]
  },
  {
    id: "4",
    name: "Luyện Thi IELTS 6.5+",
    price: 1499000,
    image: "https://britishacademy.edu.vn/wp-content/uploads/2024/05/11.png.webp",
    shortDescription: "Luyện đầy đủ 4 kỹ năng để đạt IELTS 6.5+.",
    fullDescription: "Khóa học luyện thi IELTS với giáo trình chuẩn Cambridge, gồm cả Reading, Listening, Writing và Speaking. Cung cấp tips, chiến lược làm bài và thực hành đề thi thật.",
    instructor: "Trần Văn D",
    rating: 4.9,
    reviews: 1600,
    duration: "70 giờ",
    level: "Trung cấp đến Nâng cao",
    category: "Luyện Thi",
    tags: ["IELTS", "4 kỹ năng", "Chiến lược", "Đề thi"]
  },
  {
    id: "5",
    name: "Tiếng Anh Du Lịch Cấp Tốc",
    price: 399000,
    image: "https://ise.edu.vn/wp-content/uploads/2021/04/tieng-anh-du-lich-cap-toc-01.png",
    shortDescription: "Sử dụng tiếng Anh cơ bản trong các tình huống du lịch.",
    fullDescription: "Học cách hỏi đường, đặt phòng khách sạn, gọi món ăn, và xử lý tình huống khi đi du lịch nước ngoài. Bao gồm cả từ vựng, mẫu câu và luyện nghe.",
    instructor: "Đỗ Thị E",
    rating: 4.5,
    reviews: 720,
    duration: "20 giờ",
    level: "Cơ bản",
    category: "Du Lịch",
    tags: ["Du lịch", "Tình huống", "Mẫu câu", "Nghe hiểu"]
  },
  {
    id: "6",
    name: "Luyện Nghe Nói Tiếng Anh Qua Phim",
    price: 799000,
    image: "https://tailieutienganh.edu.vn/public/files/upload/default/images/xem-phim-song-ngu-tieng-anh-free.jpg",
    shortDescription: "Cải thiện kỹ năng nghe – nói tiếng Anh qua phim ảnh.",
    fullDescription: "Học tiếng Anh qua các bộ phim nổi tiếng, tăng khả năng phản xạ và ngữ điệu bản ngữ. Bao gồm kịch bản phim, phân tích từ vựng và luyện phát âm.",
    instructor: "Ngô Văn F",
    rating: 4.6,
    reviews: 1050,
    duration: "42 giờ",
    level: "Cơ bản đến Trung cấp",
    category: "Nghe Nói",
    tags: ["Nghe", "Nói", "Phim", "Phản xạ"]
  }
];


export const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1 triệu", min: 500000, max: 1000000 },
  { label: "1 - 1.5 triệu", min: 1000000, max: 1500000 },
  { label: "Trên 1.5 triệu", min: 1500000, max: Infinity }
];
