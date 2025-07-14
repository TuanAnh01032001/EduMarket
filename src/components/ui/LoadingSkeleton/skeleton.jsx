// Component Skeleton dùng để hiển thị hiệu ứng loading dạng khung xương
// Sử dụng class animate-pulse để tạo hiệu ứng nhấp nháy
// className cho phép tuỳ biến thêm style từ bên ngoài
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  // Trả về một thẻ div với hiệu ứng loading và các thuộc tính truyền vào
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
