import { configureStore } from '@reduxjs/toolkit';
import newsReducer, { NewsState } from './newsSlice.ts';

// Define the initial state for the news slice, including API keys and other properties
const initialNewsState: NewsState = {
  searchQuery: '',
  filteredArticles: [],
  iconStates: [],
  selectedArticle: null,
  apiKeys: {
    topStories: "kzoxGuCiCSr7YVhGimt0gsmRkjtexpui",
    search: "nPEnGDDecHkwLBmamcT6IyqsBotQ8GYa",
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


