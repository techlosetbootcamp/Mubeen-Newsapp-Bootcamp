import { useState } from "react";

const useProfile = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return {
    activeDropdown,
    toggleDropdown,
  };
};

export default useProfile;
