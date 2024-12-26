import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState<string>('Fetching breaking news...');
  const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`
        );

        // Assume the first article is the breaking news
        if (response.data.results && response.data.results.length > 0) {
          const latestArticle = response.data.results[0];
          setBreakingNews(latestArticle.title || 'No breaking news available.');
        } else {
          setBreakingNews('No breaking news available.');
        }
      } catch (error) {
        console.error('Error fetching breaking news:', error);
        setBreakingNews('Unable to fetch breaking news. Please try again later.');
      }
    };

    fetchBreakingNews();
  }, [topStoriesKey]);

  return (
    <div className="bg-red-700 w-full md:h-auto h-[181px] py-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
      {/* Button */}
      <button className="bg-white text-red-700 font-semibold text-sm md:text-lg px-6 py-3 rounded-md shadow hover:bg-gray-100">
        Breaking News
      </button>
      {/* Text */}
      <h2 className="text-white text-center md:text-left text-sm md:text-lg">
        {breakingNews}
      </h2>
    </div>
  );
};

export default BreakingNews;









// import React from 'react';

// const BreakingNews = () => {
//   return (
//     <div className="bg-red-700 w-full md:h-auto h-[181px] py-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
//       {/* Button */}
//       <button className="bg-white text-red-700 font-semibold text-sm md:text-lg px-6 py-3 rounded-md shadow hover:bg-gray-100">
//         Breaking News
//       </button>
//       {/* Text */}
//       <h2 className="text-white text-center md:text-left text-sm md:text-lg">
//         Kanye West says he's running for president in 2020.
//       </h2>
//     </div>
//   );
// };

// export default BreakingNews;
