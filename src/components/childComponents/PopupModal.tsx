import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

interface PopupModalProps {
    article: {
        image: string;
        title: string;
        description: string;
    };
    onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ article, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-[400px] max-h-[550px] mx-5 mt-5 md:max-h-full shadow-lg md:w-[90%] md:max-w-[1100px] md:h-[450px] flex flex-col sm:flex-row gap-4 relative items-center overflow-hidden">
                {/* Close Icon */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    <AiOutlineClose size={24} />
                </button>

                {/* Left Section - Image */}
                <div className="w-[279px] h-[347px] md:w-[70%] md:h-[90%]">
                    <img
                        src={article.image}
                        alt="Popup Thumbnail"
                        className="rounded-lg w-full h-full object-fill p-10"
                    />
                </div>

                {/* Right Section - Content */}
                <div className="flex flex-col w-full sm:w-[60%] gap-4 p-4 overflow-y-auto max-h-[90%]">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-5">
                        <div className="text-sm font-bold text-red-500">Trending</div>
                        <div>
                            <div className="flex gap-x-4 pt-4">
                                <FaHeart
                                    size={20}
                                    className="cursor-pointer text-gray-500 hover:text-red-700"
                                />
                                <FaArrowUpFromBracket
                                    size={20}
                                    className="cursor-pointer text-gray-500 hover:text-red-700"
                                />
                                <FaBookmark
                                    size={20}
                                    className="cursor-pointer text-gray-500 hover:text-red-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-2xl font-bold">{article.title}</div>

                    {/* Description */}
                    <div className="text-md">{article.description}</div>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
