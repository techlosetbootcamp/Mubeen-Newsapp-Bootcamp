import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { fetchTopStories } from "../redux/topStoriesSlice.ts";
import Header from "./Header.tsx";
import NewsCard from "./NewsCard.tsx";
import PopupModal from "./PopupModal.tsx";
import ViewMoreButton from "./ViewMoreButton.tsx";
import { Article } from "../types/newsSlice.ts";

interface IconState {
  heart: boolean;
  share: boolean;
  save: boolean;
}

const NewsCardContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.topStories
  );

  const [visibleCards, setVisibleCards] = useState(6);
  const [iconStates, setIconStates] = useState<IconState[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  useEffect(() => {
    dispatch(fetchTopStories());
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      setIconStates(
        articles.map(() => ({
          heart: false,
          share: false,
          save: false,
        }))
      );
    }
  }, [articles]);

  const handleViewMore = () => setVisibleCards((prev) => prev + 6);

  const toggleIconState = (index: number, icon: keyof IconState) => {
    setIconStates((prev) => {
      const newStates = [...prev];
      newStates[index][icon] = !newStates[index][icon];
      return newStates;
    });
  };

  const handleStoryClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const closePopup = () => setSelectedArticle(undefined);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2">
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
      {!loading && !error && visibleCards < articles.length && (
        <ViewMoreButton
          onClick={handleViewMore}
          isVisible={visibleCards < articles.length}
        />
      )}
      {selectedArticle && (
        <PopupModal article={selectedArticle} onClose={closePopup} />
      )}
    </div>
  );
};

export default NewsCardContainer;
