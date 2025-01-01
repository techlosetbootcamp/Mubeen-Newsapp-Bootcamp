import React from "react";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { HiArrowUpTray } from "react-icons/hi2";
import { FormattedArticle } from "../redux/newsSlice.ts";

interface NewsCardProps {
  article: FormattedArticle;
  iconState?: { heart: boolean; share: boolean; save: boolean }; // Made optional
  onToggleIcon: (icon: "heart" | "share" | "save") => void;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  iconState = { heart: false, share: false, save: false }, // Default values
  onToggleIcon,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-md shadow-md flex flex-col cursor-pointer md:h-[520px] h-[479px]"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={article?.image}
          alt="News Thumbnail"
          className="w-full h-[200px] rounded-t-sm object-cover"
        />
      </div>
      <div className="md:h-[280px] h-[240px]">
        <div className="flex flex-col gap-y-2 items-center py-5 px-3">
          <p className="text-lg font-semibold font-serif line-clamp-2">
            {article.title}
          </p>
          <p className="text-md line-clamp-3">{article.description}</p>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-center gap-x-2 gap-y-2 text-sm p-2 mb-4">
          <time className="font-medium">{article.time}</time>
          <p className="line-clamp-1 md:line-clamp-none">{article.author}</p>
        </div>
      </div>

      <div>
        <hr className="border-gray-300 w-full" />

        <div className="flex items-center justify-center gap-x-4 text-gray-500 text-sm py-3">
          <span className="text-red-700 font-medium">Trending</span>

          <CiHeart
            size={20}
            className={`cursor-pointer ${
              iconState.heart ? "text-red-700" : "hover:text-red-700"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleIcon("heart");
            }}
          />
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
          <CiBookmark
            size={20}
            className={`cursor-pointer ${
              iconState.save ? "text-red-700" : "hover:text-red-700"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleIcon("save");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
