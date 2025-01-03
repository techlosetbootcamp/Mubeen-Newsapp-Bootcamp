import React from "react";
import NewsCard from "../newsCard/NewsCard.tsx";
import PopupModal from "../popupModal/PopupModal.tsx";
import ViewMoreButton from "../viewMoreButton/ViewMoreButton.tsx";
import useNewsCardContainer from "./useNewsCardContainer.ts";

const NewsCardContainer: React.FC = () => {
  const {
    articles,
    loading,
    error,
    visibleCards,
    iconStates,
    selectedArticle,
    handleViewMore,
    toggleIconState,
    handleStoryClick,
    closePopup,
  } = useNewsCardContainer();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 lg:max-w-[1180px] md:mx-10">
        {loading ? (
          <div className="text-center col-span-full">Loading...</div>
        ) : error ? (
          <div className="text-center col-span-full text-red-500">
            Unable to fetch news. Please try again later.
          </div>
        ) : (
          articles
            .slice(0, visibleCards)
            .map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                iconState={iconStates[index]}
                onToggleIcon={(icon) => toggleIconState(index, icon)}
                onClick={() => handleStoryClick(article)}
              />
            ))
        )}
      </div>
      {!loading && !error && visibleCards < articles?.length && (
        <ViewMoreButton
          onClick={handleViewMore}
          isVisible={visibleCards < articles?.length}
        />
      )}
      {selectedArticle && (
        <PopupModal article={selectedArticle} onClose={closePopup} />
      )}
    </div>
  );
};

export default NewsCardContainer;
