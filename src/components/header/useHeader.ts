import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Latest Stories");
  return {
    navigate,
    activeTab,
    setActiveTab,
  };
};

export default useHeader;
