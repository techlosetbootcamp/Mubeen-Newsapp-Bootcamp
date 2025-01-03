import React from "react";
import {
  setSearchQuery,
  setIconState,
  setSelectedArticle,
} from "../../store/newsSlice.ts";
import NewsCard from "../../components/newsCard/NewsCard.tsx";
import PopupModal from "../../components/popupModal/PopupModal.tsx";
import ViewMoreButton from "../../components/viewMoreButton/ViewMoreButton.tsx";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import useSearch from "./useSearch.ts";

const Search: React.FC = () => {
  const {
    searchQuery,
    handleSearch,
    filteredArticles,
    iconStates,
    selectedArticle,
    isSearching,
    visibleCards,
    setVisibleCards,
    dispatch,
  } = useSearch();

  return (
    <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
      <div className="flex flex-col items-center justify-center mt-[160px]">
        <h1 className="text-2xl font-serif font-extrabold">Search News</h1>
        <SearchBar
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="mt-20">
        <div
          className={`bg-white w-full h-[54px] flex items-center justify-start px-5 font-bold ${
            isSearching ? "text-red-700" : "text-black"
          }`}
        >
          {isSearching ? "Searching..." : "Search Results"}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 max-w-full m-2">
          {filteredArticles?.slice(0, visibleCards).map((article, index) => (
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
      {selectedArticle && (
        <PopupModal
          article={selectedArticle}
          onClose={() => dispatch(setSelectedArticle(null))}
        />
      )}
    </div>
  );
};

export default Search;
