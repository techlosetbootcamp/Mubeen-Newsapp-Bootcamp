import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

interface FormattedArticle {
  image: string;
  title: string;
  description: string;
  time: string;
  author: string;
}

const EditorsPicks: React.FC = () => {
  const [articles, setArticles] = useState<FormattedArticle[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide index
  const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${topStoriesKey}`
        );
        const formattedArticles = response.data.results.map((article: any) => ({
          image: article.multimedia ? article.multimedia[0]?.url || "" : "",
          title: article.title,
          description: article.abstract,
          time: new Date(article.published_date).toLocaleTimeString(),
          author: article.byline || "Unknown Author",
        }));
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [topStoriesKey]);

  // Slick slider settings with responsive design
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards by default
    slidesToScroll: 2, // Scroll 1 card at a time
    beforeChange: (oldIndex: number, newIndex: number) => {
      setActiveIndex(newIndex); // Update the active index
    },
    customPaging: (i: number) => (
      <div
        className={`h-1 w-8 mt-2 ${i === Math.floor(activeIndex / settings.slidesToShow) ? "bg-red-700" : "bg-red-300"} rounded-full`}
      />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ padding: "10px" }}>
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    arrows: false, // Disable arrows on mobile
    centerMode: false, // Ensures no card is centered
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768, // For tablets and below
        settings: {
          slidesToShow: 1, // Show 1 card at a time on mobile/tablet
          slidesToScroll: 1,
          arrows: false, // Disable arrows on mobile
        },
      },
      {
        breakpoint: 1024, // For medium screens like laptops
        settings: {
          slidesToShow: 2, // Show 2 cards at a time on tablets and above
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-full mb-10">
      {/* Heading */}
      <div className="flex gap-x-6 items-center mb-6 pl-5">
        <h2 className="text-2xl font-semibold">Editor's Picks</h2>
        <IoStar size={20} />
      </div>

      {/* Carousel */}
      <Slider {...settings}>
        {articles.slice(0, 4).map((card, index) => (
          <div
            key={index}
            className="flex justify-center px-2 w-full"
          >
            <div className="flex flex-col h-[376px] md:h-[171px] md:flex-row max-w-[100%] w-full bg-white rounded-md shadow-md overflow-hidden gap-4">
              {/* Left Section - Image with overlay */}
              <div className="relative w-full md:w-[40%] h-full">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full md:h-full object-cover h-[170px]"
                />
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black to-transparent flex items-center justify-center gap-x-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FaHeart
                    size={20}
                    className="cursor-pointer text-gray-300 hover:text-red-700"
                  />
                  <FaArrowUpFromBracket
                    size={20}
                    className="cursor-pointer text-gray-300 hover:text-red-700"
                  />
                  <FaBookmark
                    size={20}
                    className="cursor-pointer text-gray-300 hover:text-red-700"
                  />
                </div>
              </div>

              {/* Right Section - Text */}
              <div className="flex flex-col justify-center py-10 px-4 md:px-4 md:py-4 w-full md:w-[60%] overflow-y-scroll md:overflow-hidden md:line-clamp-6 md:items-center md:mb-4">
                <div className="text-lg font-semibold">{card.title}</div>
                <div className="text-sm text-gray-600">{card.description}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EditorsPicks;

