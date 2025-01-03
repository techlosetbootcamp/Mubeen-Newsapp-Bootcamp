import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FormattedArticle } from "../../types/newsSlice";
import { fetchNews } from "../../store/newsSlice.ts";

const usePolitics = () => {
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
  return {
    filteredArticles,
    loading,
    visibleCards,
    selectedArticle,
    handleViewMore,
    setSelectedArticle,
  };
};

export default usePolitics;
