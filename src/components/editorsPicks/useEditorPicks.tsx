import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { RootState } from "../../store/store.ts";
import { useState, useEffect } from "react";
import { fetchEditorPicks } from "../../store/slices/editorPicksSlice.ts";

const useEditorPicks = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.editorPicks
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchEditorPicks());
  }, []);
  return {
    articles,
    loading,
    error,
    activeIndex,
    setActiveIndex,
    dispatch,
    fetchEditorPicks,
  };
};

export default useEditorPicks;
