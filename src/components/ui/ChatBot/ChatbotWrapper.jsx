import React, { useState } from 'react';
import Chatbot from '../../Chatbot';
import { CourseModal } from '../../CourseModal';

const ChatbotWrapper = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      {open && (
        <Chatbot
          onViewCourse={(course) => setSelectedCourse(course)}
        />
      )}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center text-2xl"
        title="Chat với AI"
      >
        💬
      </button>
    </>
  );
};

export default ChatbotWrapper;
