import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice.ts";
import heroReducer from "./heroSlice.ts";
import breakingNewsReducer from "./breakingNewsSlice.ts";
import topStoriesReducer from "./topStoriesSlice.ts";
import editorsPicksReducer from "./editorPicksSlice.ts";

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

export default store;
