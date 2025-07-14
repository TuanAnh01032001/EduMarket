import * as React from "react";

// Định nghĩa breakpoint cho thiết bị di động (dưới 768px sẽ được coi là mobile)
const MOBILE_BREAKPOINT = 768;

// Hook tùy chỉnh để kiểm tra thiết bị hiện tại có phải là mobile không
export function useIsMobile() {
  // Khởi tạo state lưu trạng thái thiết bị có phải là mobile hay không
  const [isMobile, setIsMobile] = React.useState(undefined);

  // Khi component được mount, thiết lập listener để theo dõi thay đổi kích thước màn hình
  React.useEffect(() => {
    // Tạo một media query lắng nghe khi màn hình nhỏ hơn breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Hàm cập nhật state mỗi khi kích thước cửa sổ thay đổi
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Gắn listener để theo dõi thay đổi kích thước màn hình
    mql.addEventListener("change", onChange);

    // Thiết lập giá trị khởi tạo khi component mount lần đầu
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup function: xóa listener khi component unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Trả về giá trị boolean (ép kiểu rõ ràng), true nếu là thiết bị mobile
  return !!isMobile;
}
