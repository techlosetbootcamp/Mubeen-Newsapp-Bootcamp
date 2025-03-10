import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Article,
  FormattedArticle,
  IconState,
  NewsState,
} from "../../types/newsSlice.ts";
import { BASE_URL, SEARCH_BASE_URL } from "../../constants/apiBaseUrl.ts";

console.log("Base url ============>", BASE_URL);

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

// Fetch general news (e.g., category-based)
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category: string, { rejectWithValue }) => {
    const apiKey = process.env.REACT_APP_TOP_STORIES_API_KEY || "";
    console.log("api key -========>", apiKey);

    if (!apiKey) {
      return rejectWithValue("API key is missing for fetchNews");
    }

    try {
      const response = await axios.get(
        `${BASE_URL}${category || "us"}.json?api-key=${apiKey}`
      );
      const formattedArticles = response.data.results?.map(
        (article: Article) => ({
          uri: article?.uri || "",
          image:
            article?.multimedia?.[0]?.url ||
            "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg",
          title: article?.title || "Currently the title is not available",
          description:
            article?.abstract || "Description is not Added By Author",
          time: new Date(article?.published_date).toLocaleTimeString() || "",
          author: article?.byline || "Unknown Author",
        })
      );
      return formattedArticles;
    } catch (error: any) {
      console.error("Error fetching news:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch news"
      );
    }
  }
);

// Fetch search results based on query
export const fetchSearchResults = createAsyncThunk(
  "news/fetchSearchResults",
  async (query: string, { rejectWithValue }) => {
    const apiKey = process.env.REACT_APP_TOP_STORIES_API_SEARCH_KEY || "";
    if (!apiKey) {
      return rejectWithValue("API key is missing for fetchSearchResults");
    }

    try {
      const response = await axios.get(
        `${SEARCH_BASE_URL}articlesearch.json?q=${query}&api-key=${apiKey}`
      );
      const formattedArticles = response.data.response.docs?.map(
        (article: Article) => {
          const multimedia = article.multimedia?.[0];
          return {
            uri: article.uri || "",
            image: multimedia
              ? `https://www.nytimes.com/${multimedia.url}`
              : "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg",
            title: article.headline.main || "",
            description: article.abstract || "",
            time: new Date(article.pub_date).toLocaleTimeString() || "",
            author: article.byline?.original || "Unknown Author",
          };
        }
      );
      return formattedArticles || []; // Return empty array if no results
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch search results"
      );
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
      } else {
        // Initialize if index doesn’t exist
        state.iconStates[index] = { heart: false, share: false, save: false };
        state.iconStates[index][icon] = true;
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
    // Fetch News
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.filteredArticles = action.payload;
        state.iconStates = action.payload.map(() => ({
          heart: false,
          share: false,
          save: false,
        }));
        state.loading = false;
        state.isSearching = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.isSearching = false;
        state.error = action.payload as string;
        state.filteredArticles = []; // Clear articles on error
      });

    // Fetch Search Results
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.isSearching = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        console.log("Search Results Fetched:", action.payload); // Debug log
        state.filteredArticles = action.payload;
        state.iconStates = action.payload.map(() => ({
          heart: false,
          share: false,
          save: false,
        }));
        state.loading = false;
        state.isSearching = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.isSearching = false; // Reset isSearching
        state.error = action.payload as string;
        state.filteredArticles = []; // Clear articles on error
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
