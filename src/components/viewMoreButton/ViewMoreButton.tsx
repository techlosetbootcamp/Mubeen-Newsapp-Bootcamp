import React from "react";
import { ViewMoreButtonProps } from "../../constants/types";

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  onClick,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={onClick}
        className="bg-transparent text-red-700 border border-red-700 py-2 px-4 rounded-md w-[220px] h-[60px]"
      >
        View More
      </button>
    </div>
  );
};

export default ViewMoreButton;
