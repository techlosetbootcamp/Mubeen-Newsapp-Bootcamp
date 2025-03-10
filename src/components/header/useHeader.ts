import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Latest Stories");
  const TABS = ["Latest Stories", "Opinion", "Health"];
  return {
    navigate,
    activeTab,
    setActiveTab,
    TABS,
  };
};

export default useHeader;
