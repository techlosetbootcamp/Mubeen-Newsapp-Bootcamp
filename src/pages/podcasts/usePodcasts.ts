import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store.ts";
import { useEffect, useState } from "react";
import { FormattedArticle } from "../../types/newsSlice.ts";
import { fetchNews } from "../../redux/newsSlice.ts";

const usePodcasts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredArticles, loading } = useSelector(
    (state: RootState) => state.news
  );
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedArticle, setSelectedArticle] =
    useState<FormattedArticle | null>(null);

  useEffect(() => {
    dispatch(fetchNews("opinion"));
  }, []);

  const handleViewMore = () => setVisibleCards((prev) => prev + 6);

  return {
    filteredArticles,
    loading,
    visibleCards,
    handleViewMore,
    selectedArticle,
    setSelectedArticle,
  };
};

export default usePodcasts;
