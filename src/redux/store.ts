
import { configureStore } from "@reduxjs/toolkit";
import newsReducer, { NewsState } from "./newsSlice.ts";

const initialNewsState: NewsState = {
  searchQuery: "",
  filteredArticles: [],
  iconStates: [],
  selectedArticle: null,
  apiKeys: {
    topStories: process.env?.REACT_APP_TOP_STORIES_API_KEY|| "",
    search: process.env?.REACT_APP_TOP_STORIES_API_SEARCH_KEY || "",
  },
};

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  preloadedState: {
    news: initialNewsState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;