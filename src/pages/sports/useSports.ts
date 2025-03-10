import React, { useEffect } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/store.ts";
import { FormattedArticle } from "../../types/newsSlice.ts";
import { fetchNews } from "../../store/slices/newsSlice.ts";

const useSports = () => {
  const dispatch = useAppDispatch();
  const { filteredArticles, loading } = useAppSelector(
    (state: RootState) => state.news
  );
  const [visibleCards, setVisibleCards] = React.useState(6);
  const [selectedArticle, setSelectedArticle] =
    React.useState<FormattedArticle | null>(null);

  useEffect(() => {
    dispatch(fetchNews("sports"));
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

export default useSports;
