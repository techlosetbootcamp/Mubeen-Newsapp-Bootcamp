import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/store.ts";
import { useEffect, useState } from "react";
import { FormattedArticle } from "../../types/newsSlice.ts";
import { fetchNews } from "../../store/slices/newsSlice.ts";

const usePodcasts = () => {
  const dispatch = useAppDispatch();
  const { filteredArticles, loading } = useAppSelector(
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
