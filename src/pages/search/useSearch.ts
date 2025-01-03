import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import {
  fetchNews,
  fetchSearchResults,
  setIsSearching,
} from "../../store/slices/newsSlice.ts";

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
  }, [dispatch]);

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
  };
};

export default useSearch;
