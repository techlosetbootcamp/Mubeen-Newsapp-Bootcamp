import { RootState, useAppSelector } from "../../store/store.ts";
import { useEffect } from "react";
import { fetchBreakingNews } from "../../store/slices/breakingNewsSlice.ts";
import { useAppDispatch } from "../../store/store.ts";

const useBreakingNews = () => {
  const dispatch = useAppDispatch();
  const { breakingNews, loading, error } = useAppSelector(
    (state: RootState) => state.breakingNews
  );

  useEffect(() => {
    dispatch(fetchBreakingNews());
  }, []);

  return {
    breakingNews,
    loading,
    error,
  };
};

export default useBreakingNews;
