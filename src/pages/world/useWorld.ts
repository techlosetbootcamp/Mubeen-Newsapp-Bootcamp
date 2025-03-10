import { useEffect, useState } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/store.ts";
import { FormattedArticle } from "../../types/newsSlice.ts";
import { fetchNews } from "../../store/slices/newsSlice.ts";

const useWorld = () => {
  const dispatch = useAppDispatch();
  const { filteredArticles, loading } = useAppSelector(
    (state: RootState) => state.news
  );
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedArticle, setSelectedArticle] =
    useState<FormattedArticle | null>(null);

  useEffect(() => {
    dispatch(fetchNews("world"));
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

export default useWorld;
