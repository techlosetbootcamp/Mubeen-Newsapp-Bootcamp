import React from "react";
import NewsCard from "../../components/newsCard/NewsCard.tsx";
import ViewMoreButton from "../../components/viewMoreButton/ViewMoreButton.tsx";
import PopupModal from "../../components/popupModal/PopupModal.tsx";
import usePolitics from "./usePolitics.ts";

const Politics: React.FC = () => {
  const {
    filteredArticles,
    loading,
    visibleCards,
    selectedArticle,
    handleViewMore,
    setSelectedArticle,
  } = usePolitics();

  return (
    <div className="bg-PrimaryBackground md:pt-10  md:px-20 p-2">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-red-700 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles?.slice(0, visibleCards).map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onClick={() => setSelectedArticle(article)}
                iconState={{ heart: false, share: false, save: false }}
                onToggleIcon={(icon) => {
                  return icon;
                }}
              />
            ))}
          </div>
          <ViewMoreButton
            onClick={handleViewMore}
            isVisible={visibleCards < filteredArticles?.length}
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

export default Politics;
