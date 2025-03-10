import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../store/slices/newsSlice.ts";
import heroReducer from "../store/slices/heroSlice.ts";
import breakingNewsReducer from "../store/slices/breakingNewsSlice.ts";
import topStoriesReducer from "../store/slices/topStoriesSlice.ts";
import editorsPicksReducer from "../store/slices/editorPicksSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    news: newsReducer,
    hero: heroReducer,
    breakingNews: breakingNewsReducer,
    topStories: topStoriesReducer,
    editorPicks: editorsPicksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
