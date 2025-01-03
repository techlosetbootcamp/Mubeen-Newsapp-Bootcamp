import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { RootState } from "../../store/store.ts";
import { useState, useEffect } from "react";
import { IconState } from "../../types/newsSlice.ts";
import { Article } from "../../types/newsSlice.ts";
import { fetchTopStories } from "../../store/topStoriesSlice.ts";

const useNewsCardContainer = () => {
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
  return {
    articles,
    loading,
    error,
    visibleCards,
    setVisibleCards,
    iconStates,
    setIconStates,
    selectedArticle,
    setSelectedArticle,
    dispatch,
    handleViewMore,
    toggleIconState,
    handleStoryClick,
    closePopup,
  };
};

export default useNewsCardContainer;
