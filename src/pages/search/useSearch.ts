import { useCallback, useEffect, useState } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/store.ts";
import {
  fetchNews,
  fetchSearchResults,
  setIsSearching,
} from "../../store/slices/newsSlice.ts";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const {
    searchQuery,
    filteredArticles,
    iconStates,
    selectedArticle,
    isSearching,
    error,
    loading,
  } = useAppSelector((state: RootState) => state.news);
  const [visibleCards, setVisibleCards] = useState(6);

  useEffect(() => {
    if (!searchQuery.trim()) {
      dispatch(fetchNews("world"));
    }
  }, [dispatch, searchQuery]);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      dispatch(setIsSearching(true));
      dispatch(fetchSearchResults(searchQuery.trim()));
    } else {
      dispatch(setIsSearching(false));
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      dispatch(setIsSearching(false));
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
    error, // Return error
    loading, // Return loading
  };
};

export default useSearch;
