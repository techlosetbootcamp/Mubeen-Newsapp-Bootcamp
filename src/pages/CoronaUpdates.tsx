import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import axios from "axios";
import NewsCard1 from "../components/childComponents/NewsCard1.tsx";
import PopupModal from "../components/childComponents/PopupModal.tsx";
import ViewMoreButton from "../components/childComponents/ViewMoreButton.tsx";




interface IconState {
    heart: boolean;
    share: boolean;
    save: boolean;
}

const CoronaUpdates: React.FC = () => {
    const [articles, setArticles] = useState([]);
    const [visibleCards, setVisibleCards] = useState(6);
    const [iconStates, setIconStates] = useState<IconState[]>([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get(
                `https://api.nytimes.com/svc/topstories/v2/health.json?api-key=${topStoriesKey}`
            );
            const formattedArticles = response.data.results.map((article) => ({
                image: article.multimedia?.[0]?.url || "",
                title: article.title,
                description: article.abstract,
                time: new Date(article.published_date).toLocaleTimeString(),
                author: article.byline || "Unknown Author",
            }));
            setArticles(formattedArticles);
            setIconStates(formattedArticles.map(() => ({ heart: false, share: false, save: false })));
        };

        fetchNews();
    }, [topStoriesKey]);

    const handleViewMore = () => setVisibleCards((prev) => prev + 6);

    const toggleIconState = (index: number, icon: keyof IconState) => {
        setIconStates((prev) => {
            const newStates = [...prev]; // Create a shallow copy
            newStates[index][icon] = !newStates[index][icon]; // Toggle the specific icon
            return newStates;
        });
    };

    return (
        <div className="md:mt-20 md:mx-20 m-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, visibleCards).map((article, index) => (
                    <NewsCard1
                        key={index}
                        article={article}
                        iconState={iconStates[index]}
                        onToggleIcon={(icon) => toggleIconState(index, icon)}
                        onClick={() => setSelectedArticle(article)}
                    />
                ))}
            </div>
            <ViewMoreButton onClick={handleViewMore} isVisible={visibleCards < articles.length} />
            {selectedArticle && (
                <PopupModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </div>
    );
};

export default CoronaUpdates;




















// import React, { useState, useEffect } from "react";
// import {  useSelector } from "react-redux";
// import { RootState } from "../redux/store.ts";
// import axios from "axios";
// import { CiViewTable } from "react-icons/ci";
// import { FaHeart, FaBookmark } from "react-icons/fa";
// import { FaArrowUpFromBracket } from "react-icons/fa6";
// import { AiOutlineClose } from "react-icons/ai";

// interface Multimedia {
//     url: string;
//     format: string;
//     height: number;
//     width: number;
//     type: string;
//     subtype: string;
//     caption: string;
//     copyright: string;
// }

// interface Article {
//     title: string;
//     abstract: string;
//     published_date: string;
//     byline: string;
//     multimedia: Multimedia[] | null;
// }

// interface FormattedArticle {
//     image: string;
//     title: string;
//     description: string;
//     time: string;
//     author: string;
// }

// const CoronaUpdates: React.FC = () => {
//     const [articles, setArticles] = useState<FormattedArticle[]>([]);
//     const [visibleCards, setVisibleCards] = useState(6);
//     const [iconStates, setIconStates] = useState<
//         { heart: boolean; share: boolean; save: boolean }[]
//     >([]);
//     const [selectedArticle, setSelectedArticle] = useState<FormattedArticle | null>(null);
//     const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);


//     useEffect(() => {
//         const fetchNews = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://api.nytimes.com/svc/topstories/v2/health.json?api-key=${topStoriesKey}`
//                 );
//                 const formattedArticles = response.data.results.map((article: Article) => ({
//                     image: article.multimedia ? article.multimedia[0]?.url || "" : "",
//                     title: article.title,
//                     description: article.abstract,
//                     time: new Date(article.published_date).toLocaleTimeString(),
//                     author: article.byline || "Unknown Author",
//                 }));

//                 setArticles(formattedArticles);

//                 // Initialize iconStates with default values for all articles
//                 setIconStates(
//                     formattedArticles.map(() => ({ heart: false, share: false, save: false }))
//                 );
//             } catch (error) {
//                 console.error("Error fetching news data:", error);
//             }
//         };

//         fetchNews();
//     }, [topStoriesKey]);

//     const handleViewMore = () => {
//         setVisibleCards((prev) => prev + 6);
//     };

//     const toggleIconState = (index: number, icon: "heart" | "share" | "save") => {
//         setIconStates((prevStates) => {
//             const newStates = [...prevStates];
//             newStates[index][icon] = !newStates[index][icon];
//             return newStates;
//         });
//     };

//     const handleStoryClick = (article: FormattedArticle) => {
//         setSelectedArticle(article);
//     };

//     const closePopup = () => {
//         setSelectedArticle(null);
//     };

//     return (
//         <div className="md:w-full w-auto">
//             {/* Header */}
//             <div className="bg-white w-full h-[54px] flex items-center justify-between px-4">
//                 <div className="flex gap-x-5 font-semibold">
//                     <div>
//                         <a href="/">Latest Stories</a>
//                     </div>
//                     <div>
//                         <a href="/">Opinion</a>
//                     </div>
//                     <div>
//                         <a href="/">Health</a>
//                     </div>
//                 </div>
//                 <div>
//                     <CiViewTable size={20} />
//                 </div>
//             </div>

//             {/* News Cards */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 max-w-full">
//                 {articles.slice(0, visibleCards).map((article, index) => (
//                     <div
//                         key={index}
//                         className="bg-white rounded-md shadow-md flex flex-col gap-y-4 max-w-full cursor-pointer"
//                         onClick={() => handleStoryClick(article)}
//                     >
//                         {/* Image Section */}
//                         <div className="flex items-center">
//                             <img
//                                 src={article.image}
//                                 alt="News Thumbnail"
//                                 className="w-full h-[200px] rounded-t-sm object-cover"
//                             />
//                         </div>

//                         {/* Content Section */}
//                         <div className="flex flex-col gap-y-2 items-center justify-center py-5 px-3">
//                             <div className="text-lg font-semibold font-serif">{article.title}</div>
//                             <div className="text-md">{article.description}</div>
//                         </div>

//                         {/* Time and Author Section */}
//                         <div className="flex md:flex-row flex-col items-center justify-center gap-x-2 gap-y-2 text-sm p-2">
//                             <div className="font-medium">{article.time}</div>
//                             <div>{article.author}</div>
//                         </div>

//                         {/* Separator Line */}
//                         <hr className="border-gray-300 w-full" />

//                         {/* Icons Section */}
//                         <div className="flex items-center justify-center gap-x-4 text-gray-500 text-sm py-3">
//                             <FaHeart
//                                 size={20}
//                                 className={`cursor-pointer ${iconStates[index]?.heart ? "text-red-700" : "hover:text-red-700"
//                                     }`}
//                                 onClick={() => toggleIconState(index, "heart")}
//                             />
//                             <FaArrowUpFromBracket
//                                 size={20}
//                                 className={`cursor-pointer ${iconStates[index]?.share ? "text-red-700" : "hover:text-red-700"
//                                     }`}
//                                 onClick={() => toggleIconState(index, "share")}
//                             />
//                             <FaBookmark
//                                 size={20}
//                                 className={`cursor-pointer ${iconStates[index]?.save ? "text-red-700" : "hover:text-red-700"
//                                     }`}
//                                 onClick={() => toggleIconState(index, "save")}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>


//             {/* "View More" Button */}
//             {visibleCards < articles.length && (
//                 <div className="flex justify-center my-8">
//                     <button
//                         onClick={handleViewMore}
//                         className="bg-transparent text-red-700 border border-red-700 py-2 px-4 rounded-md w-[220px] h-[60px]"
//                     >
//                         View More
//                     </button>
//                 </div>
//             )}

//             {/* Popup Modal */}
//             {selectedArticle && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg max-w-[400px] max-h-[550px] mx-5 mt-5 md:max-h-full shadow-lg md:w-[90%] md:max-w-[1100px] md:h-[450px] flex flex-col sm:flex-row gap-4 relative items-center overflow-hidden">
//                         {/* Close Icon */}
//                         <button
//                             className="absolute top-4 right-4 text-gray-500 hover:text-black"
//                             onClick={closePopup}
//                         >
//                             <AiOutlineClose size={24} />
//                         </button>

//                         {/* Left Section - Image */}
//                         <div className="w-[279px] h-[347px] md:w-[70%] md:h-[90%]">
//                             <img
//                                 src={selectedArticle.image}
//                                 alt="Popup Thumbnail"
//                                 className="rounded-lg w-full h-full object-fill p-10"
//                             />
//                         </div>

//                         {/* Right Section - Content */}
//                         <div className="flex flex-col w-full sm:w-[60%] gap-4 p-4 overflow-y-auto max-h-[90%]">
//                             {/* Header */}
//                             <div className="flex items-center justify-between pb-5">
//                                 <div className="text-sm font-bold text-red-500">Trending</div>
//                                 <div>
//                                     <div className="flex gap-x-4 pt-4">
//                                         <FaHeart
//                                             size={20}
//                                             className="cursor-pointer text-gray-500 hover:text-red-700"
//                                         />
//                                         <FaArrowUpFromBracket
//                                             size={20}
//                                             className="cursor-pointer text-gray-500 hover:text-red-700"
//                                         />
//                                         <FaBookmark
//                                             size={20}
//                                             className="cursor-pointer text-gray-500 hover:text-red-700"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Title */}
//                             <div className="text-2xl font-bold">{selectedArticle.title}</div>
//                             {/* Description */}
//                             <div className="text-md">{selectedArticle.description}</div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default CoronaUpdates;


