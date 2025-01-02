import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store.ts";
import { fetchNews, fetchSearchResults } from "../../redux/newsSlice.ts";

const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    searchQuery,
    filteredArticles,
    iconStates,
    selectedArticle,
    isSearching,
  } = useSelector((state: RootState) => state.news);
  const [visibleCards, setVisibleCards] = useState(6);

  useEffect(() => {
    dispatch(fetchNews("world"));
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      dispatch(fetchSearchResults(searchQuery.trim()));
    }
  }, [searchQuery]);

  return {
    searchQuery,
    handleSearch,
    filteredArticles,
    iconStates,
    selectedArticle,
    isSearching,
    visibleCards,
    setVisibleCards,
    dispatch,
  };
};

export default useSearch;
