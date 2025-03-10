import { TypedUseSelectorHook } from "react-redux";
import { useEffect } from "react";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/store.ts";
import { fetchHeroArticle } from "../../store/slices/heroSlice.ts";

const useHero = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useAppSelector;

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
