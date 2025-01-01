import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { fetchNews } from "../redux/newsSlice.ts";
import NewsCard from "../components/NewsCard.tsx";
import ViewMoreButton from "../components/ViewMoreButton.tsx";
import PopupModal from "../components/PopupModal.tsx";
import { FormattedArticle } from "../types/newsSlice.ts";

const Politics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredArticles, loading } = useSelector(
    (state: RootState) => state.news
  );
  const [visibleCards, setVisibleCards] = React.useState(6);
  const [selectedArticle, setSelectedArticle] =
    React.useState<FormattedArticle | null>(null);

  useEffect(() => {
    dispatch(fetchNews("politics"));
  }, []);

  const handleViewMore = () => setVisibleCards((prev) => prev + 6);

  return (
    <div className="md:mt-20 md:mx-20 m-2">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-red-700 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.slice(0, visibleCards).map((article, index) => (
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

export default Politics;
