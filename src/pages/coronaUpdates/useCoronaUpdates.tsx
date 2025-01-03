import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useState, useEffect } from "react";
import { FormattedArticle } from "../../types/newsSlice.ts";
import { fetchNews } from "../../store/newsSlice.ts";

const useCoronaUpdates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredArticles, loading } = useSelector(
    (state: RootState) => state.news
  );
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedArticle, setSelectedArticle] =
    useState<FormattedArticle | null>(null);

  useEffect(() => {
    dispatch(fetchNews("health"));
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

export default useCoronaUpdates;
