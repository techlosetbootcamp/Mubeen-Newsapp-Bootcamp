import React from "react";
import { setHeroIconState } from "../../store/slices/heroSlice.ts";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { HiArrowUpTray } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import useHero from "./useHero.ts";

const Hero: React.FC = () => {
  const { heroArticle, isHearted, isShared, isBookmarked, loading, dispatch } =
    useHero();

  if (loading || !heroArticle) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative w-full md:flex md:gap-10 md:my-10 md:justify-center md:items-center lg:max-w-[1245px] md:px-10">
      <div className="relative">
        <img
          src={heroArticle?.image}
          alt="Hero"
          className="w-full max:h-[456px] md:max-h-[456px] md:rounded-lg shadow-lg object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 md:hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
            style={{ height: "110%" }}
          ></div>

          <div className="relative p-4">
            <h1 className="text-white text-xl md:text-2xl font-bold font-serif line-clamp-4">
              {heroArticle?.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-5 md:gap-8 md:w-[40%]">
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-red-600 font-bold">Trending</h1>
          <div className="flex gap-4 text-gray-600">
            {isHearted ? (
              <IoMdHeart
                size={24}
                className="cursor-pointer text-red-700"
                onClick={() =>
                  dispatch(setHeroIconState({ icon: "heart", value: false }))
                }
              />
            ) : (
              <CiHeart
                size={24}
                className="cursor-pointer"
                onClick={() =>
                  dispatch(setHeroIconState({ icon: "heart", value: true }))
                }
              />
            )}

            <HiArrowUpTray
              size={24}
              className={`cursor-pointer ${isShared ? "text-red-700" : ""}`}
              onClick={() =>
                dispatch(setHeroIconState({ icon: "share", value: !isShared }))
              }
            />

            {isBookmarked ? (
              <IoBookmark
                size={24}
                className="cursor-pointer text-red-700"
                onClick={() =>
                  dispatch(setHeroIconState({ icon: "bookmark", value: false }))
                }
              />
            ) : (
              <CiBookmark
                size={24}
                className="cursor-pointer"
                onClick={() =>
                  dispatch(setHeroIconState({ icon: "bookmark", value: true }))
                }
              />
            )}
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
          {heroArticle?.title}
        </h1>
        <p className="text-gray-600 md:line-clamp-5">
          {heroArticle?.description}
        </p>
        <p className="text-sm text-gray-500">
          {heroArticle?.time} | {heroArticle?.author}
        </p>
      </div>
    </div>
  );
};

export default Hero;
