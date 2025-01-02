import React from "react";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const navigate = useNavigate();
  return {
    navigate,
  };
};

export default useHeader;
