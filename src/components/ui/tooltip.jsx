// Import React và Tooltip từ Radix UI (headless UI component)
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Import hàm tiện ích gộp className
import { cn } from "@/lib/utils";

// Export các thành phần Tooltip cơ bản từ Radix
const TooltipProvider = TooltipPrimitive.Provider; // Bao toàn bộ hệ thống tooltip
const Tooltip = TooltipPrimitive.Root; // Tooltip container chính
const TooltipTrigger = TooltipPrimitive.Trigger; // Phần tử kích hoạt tooltip

// Component TooltipContent hiển thị nội dung tooltip, có thể tùy chỉnh vị trí và class
const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset} // Khoảng cách giữa trigger và tooltip
      className={cn(
        // Style cho tooltip + hiệu ứng mở/đóng theo hướng
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Export các thành phần để dùng trong dự án
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
