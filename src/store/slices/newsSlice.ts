import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Article,
  FormattedArticle,
  IconState,
  NewsState,
} from "../../types/newsSlice.ts";
import { BASE_URL } from "../../constants/apiBaseUrl.ts";

const initialState: NewsState = {
  searchQuery: "",
  filteredArticles: [],
  iconStates: [],
  selectedArticle: null,
  article: {
    uri: "",
    title: "",
    description: "",
    abstract: "",
    published_date: "",
    byline: { original: "" },
    multimedia: null,
    image: "",
    author: "",
    time: "",
    headline: { main: "" },
    pub_date: "",
    isSearching: false,
  },
  error: null,
  loading: false,
  isSearching: false,
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category: string) => {
    const apiKey = process.env?.REACT_APP_TOP_STORIES_API_KEY || "";

    try {
      const response = await axios.get(
        `${BASE_URL}${category || "us"}.json?api-key=${apiKey}`
      );
      const formattedArticles = response.data.results?.map(
        (article: Article) => ({
          uri: article?.uri || "",
          image: article?.multimedia?.[0]?.url || "",
          title: article?.title || "",
          description: article?.abstract || "",
          time: new Date(article?.published_date).toLocaleTimeString() || "",
          author: article?.byline || "Unknown Author",
        })
      );
      return formattedArticles;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw null;
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  "news/fetchSearchResults",
  async (query: string) => {
    const apiKey = process.env?.REACT_APP_TOP_STORIES_API_SEARCH_KEY || "";

    try {
      const response = await axios.get(
        `${BASE_URL}articlesearch.json?q=${query}&api-key=${apiKey}`
      );
      const formattedArticles = response.data.response.docs?.map(
        (article: Article) => {
          const multimedia = article.multimedia?.[0];
          return {
            uri: article.uri || "",
            image: multimedia
              ? `https://www.nytimes.com/${multimedia.url}`
              : "",
            title: article.headline.main || "",
            description: article.abstract || "",
            time: new Date(article.pub_date).toLocaleTimeString() || "",
            author: article.byline?.original || "Unknown Author",
          };
        }
      );
      return formattedArticles;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    setFilteredArticles: (state, action: PayloadAction<FormattedArticle[]>) => {
      state.filteredArticles = action.payload;
    },
    setIconState: (
      state,
      action: PayloadAction<{ index: number; icon: keyof IconState }>
    ) => {
      const { index, icon } = action.payload;
      if (state.iconStates[index]) {
        state.iconStates[index] = {
          ...state.iconStates[index],
          [icon]: !state.iconStates[index][icon],
        };
      }
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.isSearching = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.filteredArticles = action.payload;
        state.iconStates = action.payload?.map(() => ({
          heart: false,
          share: false,
          save: false,
        }));
        state.loading = false;
        state.isSearching = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        console.error("Error fetching sports news:", action.error);
        state.loading = false;
        state.isSearching = false;
        state.error = action.error.message || "Failed to load news";
        state.selectedArticle = null;
      });

    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.isSearching = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.filteredArticles = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        console.error("Error fetching search results:", action.error);
        state.loading = false;
        state.error = action.error.message || "Failed to load search results";
      });
  },
});

export const {
  setIsSearching,
  setSearchQuery,
  setFilteredArticles,
  setIconState,
  setIconStates,
  setSelectedArticle,
  setLoading,
} = newsSlice.actions;

export default newsSlice.reducer;
