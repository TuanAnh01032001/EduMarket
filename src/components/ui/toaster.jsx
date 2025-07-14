import { useToast } from "@/hooks/use-toast";

// Import các thành phần UI cần thiết để hiển thị toast
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// Component Toaster hiển thị toàn bộ các toast đang được kích hoạt
export function Toaster() {
  const { toasts } = useToast(); // Lấy danh sách toast từ context

  return (
    <ToastProvider>
      {/* Duyệt qua danh sách toast và hiển thị từng cái */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>} {/* Tiêu đề toast */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}{" "}
              {/* Mô tả toast */}
            </div>
            {action} {/* Optional: Nút action nếu có */}
            <ToastClose /> {/* Nút đóng toast */}
          </Toast>
        );
      })}
      <ToastViewport /> {/* Vị trí hiển thị toast */}
    </ToastProvider>
  );
}
