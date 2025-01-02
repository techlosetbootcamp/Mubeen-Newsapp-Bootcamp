import React from "react";
import NewsCard from "../../components/newsCard/NewsCard.tsx";
import ViewMoreButton from "../../components/viewMoreButton/ViewMoreButton.tsx";
import PopupModal from "../../components/popupModal/PopupModal.tsx";
import usePodcasts from "./usePodcasts.ts";

const Podcasts: React.FC = () => {
  const {
    filteredArticles,
    loading,
    visibleCards,
    handleViewMore,
    selectedArticle,
    setSelectedArticle,
  } = usePodcasts();

  return (
    <div className="md:mt-20 md:mx-20 m-2">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-red-700 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.slice(0, visibleCards).map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                  iconState={{ heart: false, share: false, save: false }}
                  onToggleIcon={(icon) => {
                    return icon;
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No articles available</p>
            )}
          </div>
          <ViewMoreButton
            onClick={handleViewMore}
            isVisible={visibleCards < filteredArticles.length}
          />
          {selectedArticle && (
            <PopupModal
              article={selectedArticle}
              onClose={() => setSelectedArticle(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Podcasts;
