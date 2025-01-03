import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className="relative mt-10 md:w-[800px]">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        className="md:w-[800px] w-[250px] h-[54px] pl-12 pr-4 border border-gray-300 rounded-md focus:outline-none"
        placeholder="Search News..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
