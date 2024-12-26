import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setFilteredArticles, setIconStates, setIconState, setSelectedArticle } from "../redux/newsSlice.ts";
import { RootState } from "../redux/store.ts";
import NewsCard1 from "../components/childComponents/NewsCard1.tsx";
import PopupModal from "../components/childComponents/PopupModal.tsx";
import ViewMoreButton from "../components/childComponents/ViewMoreButton.tsx"
import SearchBar from "../components/childComponents/SearchBar.tsx";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const { searchQuery, filteredArticles, iconStates, selectedArticle } = useSelector((state: RootState) => state.news);
    const [visibleCards, setVisibleCards] = useState(6);
    const [isSearching, setIsSearching] = useState(false);
    const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);
    const searchKey = useSelector((state: RootState) => state.news.apiKeys.search);

    useEffect(() => {
        fetchTopStories();
    }, [dispatch]);

    const fetchTopStories = async () => {
        try {
            const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`);
            const formattedArticles = response.data.results.map((article: any) => ({
                image: article.multimedia ? article.multimedia[0]?.url || "" : "",
                title: article.title,
                description: article.abstract,
                time: new Date(article.published_date).toLocaleTimeString(),
                author: article.byline || "Unknown Author",
            }));

            dispatch(setFilteredArticles(formattedArticles));
            dispatch(setIconStates(formattedArticles.map(() => ({ heart: false, share: false, save: false }))));
        } catch (error) {
            console.error("Error fetching top stories:", error);
        }
    };

    const fetchSearchResults = async (query: string) => {
        try {
            const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${searchKey}`);
            const formattedArticles = response.data.response.docs.map((article: any) => ({
                image: article.multimedia ? `https://www.nytimes.com/${article.multimedia[0].url}` : "",
                title: article.headline.main,
                description: article.abstract || "No description available.",
                time: new Date(article.pub_date).toLocaleTimeString(),
                author: article.byline?.original || "Unknown Author",
            }));

            dispatch(setFilteredArticles(formattedArticles));
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            setIsSearching(true);
            fetchSearchResults(searchQuery.trim());
        }
    };

    useEffect(() => {
        if (!searchQuery.trim()) {
            setIsSearching(false);
            fetchTopStories();
        }
    }, [searchQuery]);

    const handleViewMore = () => {
        setVisibleCards((prev) => prev + 6);
    };

    const handleIconStateChange = (index: number, icon: "heart" | "share" | "save") => {
        dispatch(setIconState({ index, icon }));
    };

    const handleStoryClick = (article: any) => {
        dispatch(setSelectedArticle(article));
    };

    const closePopup = () => {
        dispatch(setSelectedArticle(null));
    };

    return (
        <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
            <div className="flex flex-col items-center justify-center mt-[160px]">
                <h1 className="text-2xl font-serif font-extrabold">Search News</h1>
                <SearchBar
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="mt-20">
                <div className="bg-white w-full h-[54px] flex items-center justify-start px-5 font-bold">
                    {isSearching ? "Searching..." : "Search Results"}
                </div>
                <div className="md:w-full w-auto">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 max-w-full m-2">
                        {filteredArticles.slice(0, visibleCards).map((article, index) => (
                            <NewsCard1
                                key={index}
                                article={article}
                                iconState={iconStates[index]}
                                onToggleIcon={(icon) => handleIconStateChange(index, icon)}
                                onClick={() => handleStoryClick(article)}
                            />
                        ))}
                    </div>
                    <ViewMoreButton onClick={handleViewMore} isVisible={visibleCards < filteredArticles.length} />
                    {selectedArticle && <PopupModal article={selectedArticle} onClose={closePopup} />}
                </div>
            </div>
        </div>
    );
};

export default Search;













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaSearch, FaHeart, FaBookmark } from "react-icons/fa";
// import { FaArrowUpFromBracket } from "react-icons/fa6";
// import { AiOutlineClose } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchQuery, setFilteredArticles, setIconState, setIconStates, setSelectedArticle } from "../redux/newsSlice.ts";
// import { RootState } from "../redux/store.ts";

// function Search() {
//   const dispatch = useDispatch();
//   const { searchQuery, filteredArticles, iconStates, selectedArticle } = useSelector((state: RootState) => state.news);
//   const [visibleCards, setVisibleCards] = useState(6);
//   const [isSearching, setIsSearching] = useState(false);
//   const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);
//   const searchKey = useSelector((state: RootState) => state.news.apiKeys.search);

//   // Fetch Top Stories
//   const fetchTopStories = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`
//       );
//       const formattedArticles = response.data.results.map((article: any) => ({
//         image: article.multimedia ? article.multimedia[0]?.url || "" : "",
//         title: article.title,
//         description: article.abstract,
//         time: new Date(article.published_date).toLocaleTimeString(),
//         author: article.byline || "Unknown Author",
//       }));

//       dispatch(setFilteredArticles(formattedArticles));
//       dispatch(setIconStates(formattedArticles.map(() => ({ heart: false, share: false, save: false }))));
//     } catch (error) {
//       console.error("Error fetching top stories:", error);
//     }
//   };

//   // Fetch Search Results
//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(
//         `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${searchKey}`
//       );
//       const formattedArticles = response.data.response.docs.map((article: any) => ({
//         image: article.multimedia && article.multimedia.length
//           ? `https://www.nytimes.com/${article.multimedia[0].url}`
//           : "",
//         title: article.headline.main,
//         description: article.abstract || "No description available.",
//         time: new Date(article.pub_date).toLocaleTimeString(),
//         author: article.byline?.original || "Unknown Author",
//       }));

//       dispatch(setFilteredArticles(formattedArticles));
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   // Handle Initial Data Load
//   useEffect(() => {
//     fetchTopStories();
//   }, [dispatch]);

//   // Handle Search with Enter Key and Input Changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setSearchQuery(e.target.value));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       setIsSearching(true);
//       fetchSearchResults(searchQuery.trim()); // Trigger search only on Enter key press
//     }
//   };

//   // Handle Input Clear (when query becomes empty)
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setIsSearching(false); // Stop searching if query is empty
//       fetchTopStories(); // Reload top stories
//     }
//   }, [searchQuery]);

//   // Handle "View More" functionality
//   const handleViewMore = () => {
//     setVisibleCards((prev) => prev + 6);
//   };

//   const toggleIconState = (index: number, icon: "heart" | "share" | "save") => {
//     dispatch(setIconState({ index, icon }));
//   };

//   const handleStoryClick = (article: any) => {
//     dispatch(setSelectedArticle(article));
//   };

//   const closePopup = () => {
//     dispatch(setSelectedArticle(null));
//   };

//   return (
//     <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
//       {/* Search Bar */}
//       <div className="flex flex-col items-center justify-center mt-[160px]">
//         <h1 className="text-2xl font-serif font-extrabold">Search News</h1>
//         <div className="relative mt-10 md:w-[400px] max-w-[320px] md:ml-0">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           <input
//             type="text"
//             className="md:w-full w-[320px] h-[54px] pl-12 pr-4 border border-gray-300 rounded-md focus:outline-none"
//             placeholder="Search News..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onKeyDown={handleKeyDown} // Only trigger search on Enter key press
//           />
//         </div>
//       </div>

//       {/* Search Results */}
//       <div className="mt-20">
//         <div className="bg-white w-full h-[54px] flex items-center justify-start px-5 font-bold">
//           {isSearching ? "Searching..." : "Search Results"}
//         </div>
//         <div className="md:w-full w-auto">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 max-w-full">
//             {filteredArticles.slice(0, visibleCards).map((article, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-md shadow-md flex flex-col gap-y-4 max-w-full cursor-pointer"
//                 onClick={() => handleStoryClick(article)}
//               >
//                 <img
//                   src={article.image}
//                   alt="News Thumbnail"
//                   className="w-full h-[200px] rounded-t-sm object-cover"
//                 />
//                 <div className="flex flex-col gap-y-2 items-center justify-center py-5 px-3">
//                   <div className="text-lg font-semibold font-serif">{article.title}</div>
//                   <div className="text-md">{article.description}</div>
//                 </div>
//                 <div className="flex md:flex-row flex-col items-center justify-center gap-x-2 gap-y-2 text-sm p-2">
//                   <div className="font-medium">{article.time}</div>
//                   <div>{article.author}</div>
//                 </div>
//                 <hr className="border-gray-300 w-full" />
//                 <div className="flex items-center justify-center gap-x-4 text-gray-500 text-sm py-3">
//                   <FaHeart
//                     size={20}
//                     className={`cursor-pointer ${iconStates[index]?.heart ? "text-red-700" : "hover:text-red-700"}`}
//                     onClick={() => toggleIconState(index, "heart")}
//                   />
//                   <FaArrowUpFromBracket
//                     size={20}
//                     className={`cursor-pointer ${iconStates[index]?.share ? "text-red-700" : "hover:text-red-700"}`}
//                     onClick={() => toggleIconState(index, "share")}
//                   />
//                   <FaBookmark
//                     size={20}
//                     className={`cursor-pointer ${iconStates[index]?.save ? "text-red-700" : "hover:text-red-700"}`}
//                     onClick={() => toggleIconState(index, "save")}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {visibleCards < filteredArticles.length && (
//             <div className="flex justify-center my-8">
//               <button
//                 onClick={handleViewMore}
//                 className="bg-transparent text-red-700 border border-red-700 py-2 px-4 rounded-md w-[220px] h-[60px]"
//               >
//                 View More
//               </button>
//             </div>
//           )}

//           {selectedArticle && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 max-w-md mx-auto w-full">
//                 <div className="flex justify-between items-center">
//                   <h2 className="font-bold text-xl">{selectedArticle.title}</h2>
//                   <AiOutlineClose
//                     className="cursor-pointer"
//                     onClick={closePopup}
//                   />
//                 </div>
//                 <p>{selectedArticle.description}</p>
//                 <img src={selectedArticle.image} alt={selectedArticle.title} />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Search;















// import React, { useEffect, useState } from "react";
// import { setSearchQuery, setFilteredArticles, setIconState, setIconStates, setSelectedArticle } from "../redux/newsSlice.ts";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store.ts";
// import axios from "axios";
// import { FaSearch, FaHeart, FaBookmark } from "react-icons/fa";
// import { FaArrowUpFromBracket } from "react-icons/fa6";
// import { AiOutlineClose } from "react-icons/ai";

// function Search() {
//   const dispatch = useDispatch();
//   const { searchQuery, filteredArticles, iconStates, selectedArticle } = useSelector((state: RootState) => state.news);
//   const [visibleCards, setVisibleCards] = useState(6);
//   const [isSearching, setIsSearching] = useState(false);
//   const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
//   const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);
//   const searchKey = useSelector((state: RootState) => state.news.apiKeys.search);



//   // Fetch Top Stories
//   const fetchTopStories = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`
//       );
//       const formattedArticles = response.data.results.map((article: any) => ({
//         image: article.multimedia ? article.multimedia[0]?.url || "" : "",
//         title: article.title,
//         description: article.abstract,
//         time: new Date(article.published_date).toLocaleTimeString(),
//         author: article.byline || "Unknown Author",
//       }));
  
//       dispatch(setFilteredArticles(formattedArticles));
//       dispatch(setIconStates(formattedArticles.map(() => ({ heart: false, share: false, save: false }))));
//     } catch (error) {
//       console.error("Error fetching top stories:", error);
//     }
//   };


//   // Fetch Search Results
//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(
//         `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${searchKey}`
//       );
//       const formattedArticles = response.data.response.docs.map((article: any) => ({
//         image: article.multimedia && article.multimedia.length
//           ? `https://www.nytimes.com/${article.multimedia[0].url}`
//           : "",
//         title: article.headline.main,
//         description: article.abstract || "No description available.",
//         time: new Date(article.pub_date).toLocaleTimeString(),
//         author: article.byline?.original || "Unknown Author",
//       }));
  
//       dispatch(setFilteredArticles(formattedArticles));
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   // Handle Initial Data Load
//   useEffect(() => {
//     fetchTopStories();
//   }, [dispatch]);

//   useEffect(() => {
//     // If the searchQuery is empty, fetch the top stories and reset the search
//     if (!searchQuery.trim()) {
//       fetchTopStories(); // Fetch the top stories when query is empty
//       setIsSearching(false); // Set isSearching to false when there is no query
//       clearTimeout(debounceTimeout); // Clear any active debounce timeout
//       return; // Exit early if query is empty
//     }
  
//     // Clear the previous timeout if it exists
//     if (debounceTimeout) clearTimeout(debounceTimeout);
  
//     // Set a new timeout for debouncing the search input
//     const timeout:any = setTimeout(() => {
//       setIsSearching(true);
//       fetchSearchResults(searchQuery.trim()); // Only call search API if query is not empty
//     }, 300); // 300 ms debounce delay
  
//     // Store the timeout ID
//     setDebounceTimeout(timeout);
  
//     // Cleanup function to clear the timeout on unmount or when `searchQuery` changes
//     return () => {
//       clearTimeout(timeout); // Ensure the timeout is cleared whenever the component unmounts or query changes
//     };
//   }, [searchQuery]); // Runs every time `searchQuery` changes

//   // Handle "View More" functionality
//   const handleViewMore = () => {
//     setVisibleCards((prev) => prev + 6);
//   };

//   const toggleIconState = (index: number, icon: "heart" | "share" | "save") => {
//     dispatch(setIconState({ index, icon }));
//   };

//   const handleStoryClick = (article: any) => {
//     dispatch(setSelectedArticle(article));
//   };

//   const closePopup = () => {
//     dispatch(setSelectedArticle(null));
//   };

//   return (
//     <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
//       {/* Search Bar */}
//       <div className="flex flex-col items-center justify-center mt-[160px]">
//         <h1 className="text-2xl font-serif font-extrabold">Search News</h1>
//         <div className="relative mt-10 md:w-[400px] max-w-[320px] md:ml-0">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           <input
//             type="text"
//             className="md:w-full w-[320px] h-[54px] pl-12 pr-4 border border-gray-300 rounded-md focus:outline-none"
//             placeholder="Search News..."
//             value={searchQuery}
//             onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//           />
//         </div>
//       </div>

//       {/* Search Results */}
//       <div className="mt-20">
//         <div className="bg-white w-full h-[54px] flex items-center justify-start px-5 font-bold">
//           {isSearching ? "Searching..." : "Search Results"}
//         </div>
//         <div className="md:w-full w-auto">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 max-w-full">
//             {filteredArticles.slice(0, visibleCards).map((article, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-md shadow-md flex flex-col gap-y-4 max-w-full cursor-pointer"
//                 onClick={() => handleStoryClick(article)}
//               >
//                 <img
//                   src={article.image}
//                   alt="News Thumbnail"
//                   className="w-full h-[200px] rounded-t-sm object-cover"
//                 />
//                 <div className="flex flex-col gap-y-2 items-center justify-center py-5 px-3">
//                   <div className="text-lg font-semibold font-serif">{article.title}</div>
//                   <div className="text-md">{article.description}</div>
//                 </div>
//                 <div className="flex md:flex-row flex-col items-center justify-center gap-x-2 gap-y-2 text-sm p-2">
//                   <div className="font-medium">{article.time}</div>
//                   <div>{article.author}</div>
//                 </div>
//                 <hr className="border-gray-300 w-full" />
//                 <div className="flex items-center justify-center gap-x-4 text-gray-500 text-sm py-3">
//                   <FaHeart
//                     size={20}
//                     className={`cursor-pointer ${iconStates[index]?.heart ? "text-red-700" : "hover:text-red-700"}`}
//                     onClick={() => toggleIconState(index, "heart")}
//                   />
//                   <FaArrowUpFromBracket
//                     size={20}
//                     className={`cursor-pointer ${iconStates[index]?.share ? "text-red-700" : "hover:text-red-700"}`}
//                     onClick={() => toggleIconState(index, "share")}
//                   />
//                   <FaBookmark
//                     size={20}
//                     className={`cursor-pointer ${iconStates[index]?.save ? "text-red-700" : "hover:text-red-700"}`}
//                     onClick={() => toggleIconState(index, "save")}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {visibleCards < filteredArticles.length && (
//             <div className="flex justify-center my-8">
//               <button
//                 onClick={handleViewMore}
//                 className="bg-transparent text-red-700 border border-red-700 py-2 px-4 rounded-md w-[220px] h-[60px]"
//               >
//                 View More
//               </button>
//             </div>
//           )}

//           {selectedArticle && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg max-w-[400px] max-h-[600px] mx-5 mt-5 md:max-h-full shadow-lg md:w-[90%] md:max-w-[1100px] md:h-[450px] flex flex-col sm:flex-row gap-4 relative items-center overflow-hidden">
//                 <button
//                   className="absolute top-4 right-4 text-gray-500 hover:text-black"
//                   onClick={closePopup}
//                 >
//                   <AiOutlineClose size={24} />
//                 </button>
//                 <img
//                   src={selectedArticle.image}
//                   alt="Popup Thumbnail"
//                   className="rounded-lg w-full h-full object-fill p-10"
//                 />
//                 <div className="flex flex-col w-full sm:w-[60%] gap-4 p-4 overflow-y-auto max-h-[90%]">
//                   <div className="flex items-center justify-between pb-5">
//                     <div className="text-sm font-bold text-red-500">Trending</div>
//                     <div>
//                       <div className="flex gap-x-4 pt-4">
//                         <FaHeart
//                           size={20}
//                           className="cursor-pointer text-gray-500 hover:text-red-700"
//                         />
//                         <FaArrowUpFromBracket
//                           size={20}
//                           className="cursor-pointer text-gray-500 hover:text-red-700"
//                         />
//                         <FaBookmark
//                           size={20}
//                           className="cursor-pointer text-gray-500 hover:text-red-700"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-2xl font-bold">{selectedArticle.title}</div>
//                   <div className="text-md">{selectedArticle.description}</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Search;



