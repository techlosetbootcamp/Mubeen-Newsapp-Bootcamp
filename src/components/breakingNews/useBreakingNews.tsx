import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchBreakingNews } from "../../redux/breakingNewsSlice.ts";

const useBreakingNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { breakingNews, loading, error } = useSelector(
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
