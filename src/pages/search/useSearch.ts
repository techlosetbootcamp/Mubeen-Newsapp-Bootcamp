import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import {
  fetchNews,
  fetchSearchResults,
  setIsSearching,
} from "../../store/newsSlice.ts";

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

  // Fetch news on initial mount
  useEffect(() => {
    dispatch(fetchNews("world"));
  }, [dispatch]);

  // Handle search logic
  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      dispatch(setIsSearching(true)); // Set searching state
      dispatch(fetchSearchResults(searchQuery.trim()));
    } else {
      // Reset state when query is empty
      dispatch(setIsSearching(false));
    }
  }, [dispatch, searchQuery]);

  // Effect to handle query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      dispatch(setIsSearching(false)); // Reset searching state if input is cleared
    }
  }, [dispatch, searchQuery]);

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
