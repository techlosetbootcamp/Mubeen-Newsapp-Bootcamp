import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Latest Stories");
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
  return {
    navigate,
    activeTab,
    setActiveTab,
    handleTabClick,
  };
};

export default useHeader;
