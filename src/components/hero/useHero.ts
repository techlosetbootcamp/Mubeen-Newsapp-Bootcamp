import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store.ts";
import { fetchHeroArticle } from "../../store/heroSlice.ts";

const useHero = () => {
  const dispatch: AppDispatch = useDispatch();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { heroArticle, isHearted, isShared, isBookmarked, loading } =
    useTypedSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHeroArticle("us"));
  }, [dispatch]);

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
