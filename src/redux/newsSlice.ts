import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface Article {
  uri: string;
  title: string;
  description: string;
  abstract: string;
  published_date: string;
  byline?: { original: string };
  multimedia: Multimedia[] | null;
  image: string;
  author: string;
  time: string;
  headline: { main: string };
  pub_date: string;
}

export interface FormattedArticle {
  uri: string;
  image: string;
  title: string;
  description: string;
  time: string;
  author: string;
}

export interface IconState {
  heart: boolean;
  share: boolean;
  save: boolean;
}

export interface NewsState {
  searchQuery: string;
  filteredArticles: FormattedArticle[];
  iconStates: IconState[];
  selectedArticle: FormattedArticle | null;
  apiKeys: {
    topStories: string;
    search: string;
  };
}

const initialState: NewsState = {
  searchQuery: "",
  filteredArticles: [],
  iconStates: [],
  selectedArticle: null,
  apiKeys: {
    topStories: "",
    search: "",
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilteredArticles: (state, action: PayloadAction<FormattedArticle[]>) => {
      state.filteredArticles = action.payload;
    },
    setIconState: (
      state,
      action: PayloadAction<{ index: number; icon: keyof IconState }>
    ) => {
      const { index, icon } = action.payload;
      state.iconStates[index][icon] = !state.iconStates[index][icon];
    },
    setIconStates: (state, action: PayloadAction<IconState[]>) => {
      state.iconStates = action.payload;
    },
    setSelectedArticle: (
      state,
      action: PayloadAction<FormattedArticle | null>
    ) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setFilteredArticles,
  setIconState,
  setIconStates,
  setSelectedArticle,
} = newsSlice.actions;

export default newsSlice.reducer;
