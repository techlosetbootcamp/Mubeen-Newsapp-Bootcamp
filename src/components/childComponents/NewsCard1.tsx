import React from "react";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { FaArrowUpFromBracket } from "react-icons/fa6";

interface NewsCardProps {
    article: {
        image: string;
        title: string;
        description: string;
        time: string;
        author: string;
    };
    iconState: { heart: boolean; share: boolean; save: boolean };
    onToggleIcon: (icon: "heart" | "share" | "save") => void;
    onClick: () => void;
}

const NewsCard1: React.FC<NewsCardProps> = ({ article, iconState, onToggleIcon, onClick }) => {
    return (
        <div
            className="bg-white rounded-md shadow-md flex flex-col gap-y-4 cursor-pointer"
            onClick={onClick}
        >
            {/* Image Section */}
            <div className="flex items-center">
                <img
                    src={article.image}
                    alt="News Thumbnail"
                    className="w-full h-[200px] rounded-t-sm object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-y-2 items-center py-5 px-3">
                <div className="text-lg font-semibold font-serif">{article.title}</div>
                <div className="text-md">{article.description}</div>
            </div>

            {/* Time and Author Section */}
            <div className="flex md:flex-row flex-col items-center justify-center gap-x-2 gap-y-2 text-sm p-2">
                <div className="font-medium">{article.time}</div>
                <div>{article.author}</div>
            </div>

            {/* Separator Line */}
            <hr className="border-gray-300 w-full" />

            {/* Icons Section */}
            <div className="flex items-center justify-center gap-x-4 text-gray-500 text-sm py-3">
                <FaHeart
                    size={20}
                    className={`cursor-pointer ${iconState.heart ? "text-red-700" : "hover:text-red-700"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleIcon("heart");
                    }}
                />
                <FaArrowUpFromBracket
                    size={20}
                    className={`cursor-pointer ${iconState.share ? "text-red-700" : "hover:text-red-700"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleIcon("share");
                    }}
                />
                <FaBookmark
                    size={20}
                    className={`cursor-pointer ${iconState.save ? "text-red-700" : "hover:text-red-700"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleIcon("save");
                    }}
                />
            </div>
        </div>
    );
};

export default NewsCard1;
