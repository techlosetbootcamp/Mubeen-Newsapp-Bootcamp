import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { HiArrowUpTray } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import usePopupModal from "./usePopupModal.ts";

interface PopupModalProps {
  article: {
    image?: string;
    title?: string;
    description?: string;
  } | null;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ article, onClose }) => {
  const { iconState, onToggleIcon } = usePopupModal();

  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-[400px] max-h-[550px] mx-5 mt-5 md:max-h-full shadow-lg md:w-[90%] md:max-w-[1100px] md:h-[450px] flex flex-col sm:flex-row gap-4 relative items-center overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="w-[279px] h-[347px] md:w-[70%] md:h-[90%]">
          <img
            src={article?.image}
            alt="Popup Thumbnail"
            className="rounded-lg w-full h-full object-fill p-10"
          />
        </div>

        <div className="flex flex-col w-full sm:w-[60%] gap-4 p-4 overflow-y-auto max-h-[90%]">
          <div className="flex items-center justify-between pb-5">
            <div className="text-sm font-bold text-red-500">Trending</div>
            <div>
              <div className="flex gap-x-4 pt-4">
                {iconState.heart ? (
                  <IoMdHeart
                    size={20}
                    className="cursor-pointer text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleIcon("heart");
                    }}
                  />
                ) : (
                  <CiHeart
                    size={20}
                    className="cursor-pointer hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleIcon("heart");
                    }}
                  />
                )}

                <HiArrowUpTray
                  size={20}
                  className={`cursor-pointer ${
                    iconState.share ? "text-red-700" : "hover:text-red-700"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleIcon("share");
                  }}
                />

                {iconState.save ? (
                  <IoBookmark
                    size={20}
                    className="cursor-pointer text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleIcon("save");
                    }}
                  />
                ) : (
                  <CiBookmark
                    size={20}
                    className="cursor-pointer hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleIcon("save");
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold">{article?.title}</div>

          <div className="text-md">{article?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
