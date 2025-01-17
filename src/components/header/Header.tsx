import React from "react";
import { CiViewTable } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HeaderProps } from "../../constants/types";

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white w-full md:h-[54px] h-auto flex items-center justify-between px-4 lg:max-w-[1180px] md:mx-10">
      <div className="flex gap-x-5 font-semibold">
        {["Latest Stories", "Opinion", "Health"].map((tab) => (
          <Link
            key={tab}
            to="#"
            className={`relative pb-2 ${
              activeTab === tab ? "font-bold text-black" : "text-gray-600"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(tab);
            }}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-[50%] h-[2px] bg-red-700" />
            )}
          </Link>
        ))}
      </div>
      <CiViewTable size={20} className="hidden md:flex" />
    </div>
  );
};

export default Header;
