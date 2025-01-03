import { useState } from "react";

const useHome = () => {
  const [activeTab, setActiveTab] = useState("Latest Stories");
  return {
    activeTab,
    setActiveTab,
  };
};

export default useHome;
