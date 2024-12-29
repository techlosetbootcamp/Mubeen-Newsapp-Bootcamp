import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setFilteredArticles,
  setIconStates,
  setIconState,
  setSelectedArticle,
  FormattedArticle,
} from "../redux/newsSlice.ts";
import { RootState } from "../redux/store.ts";
import NewsCard from "../components/NewsCard.tsx";
import PopupModal from "../components/PopupModal.tsx";
import ViewMoreButton from "../components/ViewMoreButton.tsx";
import SearchBar from "../components/SearchBar.tsx";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, filteredArticles, iconStates, selectedArticle } =
    useSelector((state: RootState) => state.news);
  const [visibleCards, setVisibleCards] = useState(6);
  const [isSearching, setIsSearching] = useState(false);
  const topStoriesKey = useSelector(
    (state: RootState) => state.news.apiKeys.topStories
  );
  const searchKey = useSelector(
    (state: RootState) => state.news.apiKeys.search
  );

  const fetchTopStories = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`
      );
      const formattedArticles = response.data.results.map(
        (article: any): FormattedArticle => ({
          image: article.multimedia ? article.multimedia[0]?.url || "" : "",
          title: article.title,
          description: article.abstract,
          time: new Date(article.published_date).toLocaleTimeString(),
          author: article.byline || "Unknown Author",
          uri: article.uri,
        })
      );

      dispatch(setFilteredArticles(formattedArticles));
      dispatch(
        setIconStates(
          formattedArticles.map(() => ({
            heart: false,
            share: false,
            save: false,
          }))
        )
      );
    } catch (error) {
      console.error("Error fetching top stories:", error);
    }
  }, [dispatch, topStoriesKey]);

  const fetchSearchResults = useCallback(
    async (query: string) => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${searchKey}`
        );
        const formattedArticles = response.data.response.docs.map(
          (article: any): FormattedArticle => ({
            image: article.multimedia
              ? `https://www.nytimes.com/${article.multimedia[0].url}`
              : "",
            title: article.headline.main,
            description: article.abstract || "No description available.",
            time: new Date(article.pub_date).toLocaleTimeString(),
            author: article.byline?.original || "Unknown Author",
            uri: article.uri,
          })
        );

        dispatch(setFilteredArticles(formattedArticles));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [dispatch, searchKey]
  );

  useEffect(() => {
    fetchTopStories();
  }, [fetchTopStories]);

  return (
    <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
      <div className="flex flex-col items-center justify-center mt-[160px]">
        <h1 className="text-2xl font-serif font-extrabold">Search News</h1>
        <SearchBar
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              setIsSearching(true);
              fetchSearchResults(searchQuery.trim());
            }
          }}
        />
      </div>
      <div className="mt-20">
        <div className="bg-white w-full h-[54px] flex items-center justify-start px-5 font-bold">
          {isSearching ? "Searching..." : "Search Results"}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 max-w-full m-2">
          {filteredArticles.slice(0, visibleCards).map((article, index) => (
            <NewsCard
              key={article.uri}
              article={article}
              iconState={iconStates[index]}
              onToggleIcon={(icon) => dispatch(setIconState({ index, icon }))}
              onClick={() => dispatch(setSelectedArticle(article))}
            />
          ))}
        </div>
        {visibleCards < filteredArticles.length && (
          <ViewMoreButton
            onClick={() => setVisibleCards((prev) => prev + 6)}
            isVisible={visibleCards < filteredArticles.length}
          />
        )}
      </div>
      <PopupModal
        article={selectedArticle}
        onClose={() => dispatch(setSelectedArticle(null))}
      />
    </div>
  );
};

export default Search;
