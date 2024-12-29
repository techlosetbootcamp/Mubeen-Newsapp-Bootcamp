import React, { useState } from "react";
import { CiViewTable } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Latest Stories");
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === "Latest Stories") {
      navigate("/");
    } else if (tab === "Opinion") {
      navigate("/podcasts");
    } else if (tab === "Health") {
      navigate("/corona-virus");
    }
  };

  return (
    <div className="bg-white w-full h-[54px] flex items-center justify-between px-4">
      <div className="flex gap-x-5 font-semibold">
        {["Latest Stories", "Opinion", "Health"].map((tab) => (
          <a
            key={tab}
            href="#"
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
          </a>
        ))}
      </div>
      <CiViewTable size={20} />
    </div>
  );
};

export default Header;
