import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast"; // Thư viện toast headless từ Radix UI
import { cva } from "class-variance-authority"; // Tạo class theo biến thể
import { X } from "lucide-react"; // Icon dấu "X" (đóng)
import { cn } from "@/lib/utils"; // Hàm tiện ích gộp className

// Provider bao bọc toàn bộ hệ thống toast
const ToastProvider = ToastPrimitives.Provider;

// Viewport xác định vị trí hiển thị toast (góc phải dưới màn hình trên desktop)
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// Xác định các biến thể style của Toast (default, destructive)
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ...", // class mặc định dài
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Toast chính hiển thị nội dung, nhận prop `variant` để đổi giao diện
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

// Nút đóng Toast (hiện khi hover)
const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" /> {/* Icon đóng */}
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

// Tiêu đề của Toast
const ToastTitle = React.forwardRef(function ToastTitle(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;

// Mô tả phụ cho Toast
const ToastDescription = React.forwardRef(function ToastDescription(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// Export các thành phần Toast để dùng trong toàn app
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
