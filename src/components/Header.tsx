import React, { useState } from "react";
import { CiViewTable } from "react-icons/ci";
import { Link } from "react-router-dom";
import useNavbar from "./navbar/useNavbar.ts";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Latest Stories");

  const { navigate } = useNavbar();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === "Latest Stories") {
      navigate("/");
    } else if (tab === "Opinion") {
      navigate("/podcasts");
    } else if (tab === "Health") {
      navigate("/corona-updates");
    }
  };

  return (
    <div className="bg-white w-full md:h-[54px] h-auto flex items-center justify-between px-4">
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
              handleTabClick(tab);
            }}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700" />
            )}
          </Link>
        ))}
      </div>
      <CiViewTable size={20} className="hidden md:flex" />
    </div>
  );
};

export default Header;
