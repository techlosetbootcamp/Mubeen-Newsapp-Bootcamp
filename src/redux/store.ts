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









// import { configureStore } from '@reduxjs/toolkit';
// import newsReducer from './newsSlice';

// const store = configureStore({
//   reducer: {
//     news: newsReducer,
//   },
//   // Add extra data to the store to hold API keys
//   preloadedState: {
//     news: {
//       apiKeys: {
//         topStories: "kzoxGuCiCSr7YVhGimt0gsmRkjtexpui",
//         search: "nPEnGDDecHkwLBmamcT6IyqsBotQ8GYa",
//       },
//     },
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;






// // src/redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import newsReducer from './newsSlice.ts';

// const store = configureStore({
//   reducer: {
//     news: newsReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
