import React from "react";
import { useNavigate } from "react-router-dom";

const useNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeRoute, setActiveRoute] = React.useState<string>("");
  const navigate = useNavigate();

  const handleRouteClick = (route: string) => {
    setActiveRoute(route);
  };

  return {
    isMobileMenuOpen,
    setMobileMenuOpen,
    handleRouteClick,
    activeRoute,
    navigate,
  };
};

export default useNavbar;
