import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { HiArrowUpTray } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { Article } from "../redux/newsSlice.ts";

function Hero() {
  const topStoriesKey = useSelector(
    (state: RootState) => state.news.apiKeys.topStories
  );
  const [heroArticle, setHeroArticle] = useState<Article | null>(null);

  const [isHearted, setIsHearted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchHeroArticle = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${topStoriesKey}`
        );

        const articles = response.data.results.map((article: Article) => ({
          image:
            article.multimedia && article.multimedia[0]
              ? article.multimedia[0].url
              : "",
          title: article.title,
          description: article.abstract,
          time: new Date(article.published_date).toLocaleTimeString(),
          author: article.byline || "Unknown Author",
        }));

        setHeroArticle(articles[0]);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchHeroArticle();
  }, [topStoriesKey]);

  if (!heroArticle) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative w-full md:flex md:gap-10 md:my-10 md:justify-center md:items-center">
      <div className="relative">
        <img
          src={heroArticle.image}
          alt="Hero"
          className="w-full max:h-[456px] md:max-h-[456px] md:rounded-lg shadow-lg object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 md:hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
            style={{ height: "110%" }}
          ></div>

          <div className="relative p-4">
            <h1 className="text-white text-2xl font-bold font-serif">
              {heroArticle.title}
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
                onClick={() => setIsHearted(false)}
              />
            ) : (
              <CiHeart
                size={24}
                className="cursor-pointer "
                onClick={() => setIsHearted(true)}
              />
            )}

            <HiArrowUpTray
              size={24}
              className={`cursor-pointer ${isShared ? "text-red-700" : ""}`}
              onClick={() => setIsShared((prev) => !prev)}
            />

            {isBookmarked ? (
              <IoBookmark
                size={24}
                className="cursor-pointer text-red-700"
                onClick={() => setIsBookmarked(false)}
              />
            ) : (
              <CiBookmark
                size={24}
                className="cursor-pointer"
                onClick={() => setIsBookmarked(true)}
              />
            )}
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
          {heroArticle.title}
        </h1>
        <p className="text-gray-600">{heroArticle.description}</p>
        <p className="text-sm text-gray-500">
          {heroArticle.time} | {heroArticle.author}
        </p>
      </div>
    </div>
  );
}

export default Hero;
