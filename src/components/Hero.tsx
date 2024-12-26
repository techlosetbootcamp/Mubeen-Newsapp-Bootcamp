import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";

interface Article {
  image: string;
  title: string;
  description: string;
  time: string;
  author: string;
}

function Hero() {
  const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);
  const [heroArticle, setHeroArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchHeroArticle = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`
        );

        const articles = response.data.results.map((article: any) => ({
          image: article.multimedia ? article.multimedia[0]?.url || "" : "",
          title: article.title,
          description: article.abstract,
          time: new Date(article.published_date).toLocaleTimeString(),
          author: article.byline || "Unknown Author",
        }));

        // Set the first article as the Hero content
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
      {/* Image */}
      <div className="relative">
        <img
          src={heroArticle.image}
          alt="Hero"
          className="w-full max:h-[456px] md:max-h-[456px] md:rounded-lg shadow-lg object-cover"
        />

        {/* Gradient overlay and text for mobile */}
        <div className="absolute bottom-0 left-0 right-0 md:hidden">
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
            style={{ height: "110%" }}
          ></div>

          {/* Text */}
          <div className="relative p-4">
            <h1 className="text-white text-2xl font-bold font-serif">{heroArticle.title}</h1>
          </div>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden md:flex flex-col gap-5 md:gap-8 md:w-[40%]">
        {/* Trending text and icons */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-red-600 font-bold">Trending</h1>
          <div className="flex gap-4 text-gray-600">
            <MdOutlineFavoriteBorder
              size={24}
              className="cursor-pointer hover:text-red-500"
            />
            <FaArrowUpFromBracket
              size={24}
              className="cursor-pointer hover:text-blue-500"
            />
            <FaBookmark
              size={24}
              className="cursor-pointer hover:text-green-500"
            />
          </div>
        </div>

        {/* Heading and description text */}
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">{heroArticle.title}</h1>
        <p className="text-gray-600">{heroArticle.description}</p>
        <p className="text-sm text-gray-500">
          {heroArticle.time} | {heroArticle.author}
        </p>
      </div>
    </div>
  );
}

export default Hero;












// import React from 'react';
// import hero from '../assets/hero.png';
// import { MdOutlineFavoriteBorder } from 'react-icons/md';
// import { FaArrowUpFromBracket } from 'react-icons/fa6';
// import {FaBookmark} from "react-icons/fa"

// function Hero() {
//   return (
//     <div className="relative w-full md:flex md:gap-10 md:my-10 md:justify-center md:items-center">
//       {/* Image */}
//       <div className="relative">
//         <img
//           src={hero}
//           alt="Hero Image"
//           className="w-full md:h-auto h-[456px] rounded-lg shadow-lg"
//         />

//         {/* Gradient overlay and text for mobile */}
//         <div className="absolute bottom-0 left-0 right-0 md:hidden">
//           {/* Gradient overlay */}
//           <div
//             className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
//             style={{ height: '110%' }}
//           ></div>

//           {/* Text */}
//           <div className="relative p-4">
//             <h1 className="text-white text-2xl font-bold font-serif">
//               Cake meme reflects coronavirus absurdity in a world where nothing is what it seems
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Content */}
//       <div className="hidden md:flex flex-col gap-5 md:gap-8 md:w-[40%]">
//         {/* Trending text and icons */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg text-red-600 font-bold">Trending</h1>
//           <div className="flex gap-4 text-gray-600">
//             <MdOutlineFavoriteBorder
//               size={24}
//               className="cursor-pointer hover:text-red-500"
//             />
//             <FaArrowUpFromBracket
//               size={24}
//               className="cursor-pointer hover:text-blue-500"
//             />
//             <FaBookmark
//               size={24}
//               className="cursor-pointer hover:text-green-500"
//             />
//           </div>
//         </div>

//         {/* Heading and description text */}
//         <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
//           Cake meme reflects coronavirus absurdity in a world where nothing is what it seems
//         </h1>
//         <p className="text-gray-600">
//           Earlier this month, a viral video depicting hyper-realistic cakes as everyday items had folks on social media double-guessing every other post, and sometimes even their own realities, effectively launching the next meme: “Is this real or is this cake?”
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Hero;

