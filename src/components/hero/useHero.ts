import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../redux/store.ts";
import { fetchHeroArticle } from "../../redux/heroSlice.ts";

const useHero = () => {
  const dispatch = useDispatch();
  const { heroArticle, isHearted, isShared, isBookmarked, loading } =
    useSelector((state: RootState) => state.hero);

  useEffect(() => {
    dispatch<any>(fetchHeroArticle("us"));
  }, []);
  return {
    heroArticle,
    isHearted,
    isShared,
    isBookmarked,
    loading,
    dispatch,
  };
};

export default useHero;
