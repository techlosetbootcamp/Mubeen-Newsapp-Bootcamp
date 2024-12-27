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
            const output = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${searchKey}`);
            const response = output.data.response
            const formattedArticles = response.docs.map((article: any) => ({
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







