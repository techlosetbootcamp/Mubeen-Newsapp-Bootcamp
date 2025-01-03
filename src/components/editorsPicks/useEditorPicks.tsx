import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { RootState } from "../../store/store.ts";
import { useState, useEffect } from "react";
import { fetchEditorPicks } from "../../store/editorPicksSlice.ts";

const useEditorPicks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
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
