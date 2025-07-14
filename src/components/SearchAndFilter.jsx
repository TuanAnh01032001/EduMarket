import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/SearchAndFilter/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/SearchAndFilter/select";
import { priceRanges } from "@/data/mockData";

export const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  selectedPriceRange,
  onPriceRangeChange,
}) => {
  return (
    // Container chính cho cả thanh tìm kiếm và bộ lọc, có nền trắng, bo góc và đổ bóng.
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Sử dụng flexbox để sắp xếp các phần tử. Trên màn hình nhỏ (mobile), chúng xếp chồng lên nhau (flex-col).
          Trên màn hình vừa và lớn (md), chúng nằm trên cùng một hàng (flex-row). */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Phần tử chứa ô nhập liệu tìm kiếm. `flex-1` để nó chiếm hết không gian còn lại. `relative` để định vị icon Search. */}
        <div className="flex-1 relative">
          {/* Icon kính lúp được đặt tuyệt đối bên trong ô nhập liệu để tạo giao diện đẹp mắt. */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {/* Component Input cho phép người dùng nhập từ khóa. */}
          <Input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm} // Giá trị của input được kiểm soát bởi state từ component cha.
            onChange={(e) => onSearchChange(e.target.value)} // Cập nhật state khi người dùng gõ.
            className="pl-10 h-12 text-base" // `pl-10` để tạo không gian cho icon Search bên trái.
          />
        </div>
        {/* Container cho bộ lọc giá. Có chiều rộng cố định trên màn hình lớn. */}
        <div className="w-full md:w-64">
          {/* Component Select (dropdown) để chọn khoảng giá. */}
          <Select
            value={selectedPriceRange.toString()}
            onValueChange={onPriceRangeChange}
          >
            {/* Phần hiển thị của Select khi chưa được mở ra. */}
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Chọn mức giá" />
            </SelectTrigger>
            {/* Phần nội dung của dropdown, chứa các lựa chọn. */}
            <SelectContent>
              {/* Lặp qua mảng `priceRanges` để tạo các mục lựa chọn (SelectItem). */}
              {priceRanges.map((range, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
