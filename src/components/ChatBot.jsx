import React, { useState, useEffect } from "react";
import {
  getAIResponse,
  getInitialSuggestions,
  extractKeyword,
} from "../components/ui/ChatBot/mockChatAI";

const Chatbot = ({ onViewCourse }) => {
  // State để lưu trữ lịch sử các tin nhắn trong cuộc trò chuyện (cả người dùng và bot).
  const [messages, setMessages] = useState([]);
  // State để quản lý giá trị hiện tại của ô nhập liệu của người dùng.
  const [input, setInput] = useState("");
  // State để lưu giữ các gợi ý khóa học được trả về từ AI.
  const [suggestions, setSuggestions] = useState([]);
  // State  để lưu các gợi ý từ khóa ban đầu.
  const [initialKeywords, setInitialKeywords] = useState([]);

  // useEffect để lấy gợi ý và hiển thị tin nhắn chào mừng chỉ một lần khi component được tải.
  useEffect(() => {
    // Gọi hàm để lấy các từ khóa gợi ý.
    const keywords = getInitialSuggestions();
    // Cập nhật state với các từ khóa vừa lấy.
    setInitialKeywords(keywords);

    // Thêm một tin nhắn chào mừng ban đầu vào cuộc trò chuyện.
    setMessages([
      {
        sender: "bot",
        text: "Chào bạn! Bạn đang muốn tìm khóa học về chủ đề gì?",
      },
    ]);
  }, []); // Mảng rỗng `[]` đảm bảo useEffect này chỉ chạy 1 lần duy nhất khi component mount.

  /**
   * Xử lý hành động gửi tin nhắn.
   * Hàm này sẽ xử lý đầu vào của người dùng, nhận phản hồi từ AI mô phỏng,
   * và cập nhật các state của cuộc trò chuyện và gợi ý.
   * có thể nhận đầu vào trực tiếp từ các nút gợi ý.
   */
  const handleSend = (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMessage = { sender: "user", text: messageText };

    // 👉 Trích xuất từ khóa chính từ câu
    const keyword = extractKeyword(messageText);

    // 👉 Truyền từ khóa đó vào hàm tìm kiếm
    const ai = getAIResponse(keyword);

    setMessages((prev) => [
      ...prev,
      userMessage,
      { sender: "bot", text: ai.text },
    ]);

    setSuggestions(ai.suggestions);

    if (!textToSend) setInput("");
  };

  // Render giao diện người dùng (UI) của component Chatbot.
  return (
    // Thẻ div chính chứa cửa sổ chatbot với vị trí cố định và các style được định sẵn.
    <div className="w-[360px] h-[500px] fixed bottom-20 right-6 bg-white shadow-xl rounded-lg flex flex-col overflow-hidden z-50">
      {/* Tiêu đề (header) của Chatbot */}
      <div className="bg-blue-600 text-white p-3 font-semibold">
        🤖 Tư vấn AI
      </div>

      {/* Khu vực hiển thị tin nhắn */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {/* Lặp qua mảng `messages` để hiển thị từng tin nhắn */}
        {messages.map((msg, i) => (
          <div
            key={i}
            // Áp dụng các style khác nhau tùy thuộc vào người gửi là người dùng hay bot.
            className={`p-2 rounded max-w-[80%] ${
              msg.sender === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 💡 HIỂN THỊ CÁC TỪ KHÓA GỢI Ý BAN ĐẦU */}
      {/* Chỉ hiển thị khi cuộc trò chuyện mới bắt đầu (chỉ có 1 tin nhắn chào của bot). */}
      {messages.length === 1 && (
        <div className="p-2">
          <p className="text-sm text-gray-600 mb-2">Hoặc thử các từ khóa:</p>
          <div className="flex flex-wrap gap-2">
            {initialKeywords.map((keyword, i) => (
              <button
                key={i}
                // 💡 Khi nhấn vào nút, gọi `handleSend` và truyền thẳng từ khóa vào.
                onClick={() => handleSend(keyword)}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Khu vực nhập liệu để người dùng gõ tin nhắn */}
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Bạn muốn học gì?"
          value={input}
          // Cập nhật state `input` khi người dùng gõ.
          onChange={(e) => setInput(e.target.value)}
          // Cho phép gửi tin nhắn bằng cách nhấn phím 'Enter'.
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gửi
        </button>
      </div>

      {/* Hiển thị khu vực gợi ý một cách có điều kiện nếu có bất kỳ gợi ý nào */}
      {suggestions.length > 0 && (
        <div className="p-3 border-t bg-white max-h-[150px] overflow-y-auto">
          <p className="text-sm font-semibold mb-1">📚 Gợi ý khóa học:</p>
          {suggestions.map((course) => (
            <button
              key={course.id}
              onClick={() => onViewCourse(course)}
              className="text-left w-full mb-2 p-2 rounded hover:bg-gray-100 transition-all border"
            >
              <p className="font-medium text-blue-700 underline">
                {course.name}
              </p>
              <p className="text-gray-500 text-sm text-wrap line-clamp-2">
                {course.shortDescription}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
