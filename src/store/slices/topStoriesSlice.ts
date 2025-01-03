import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Article, TopStoriesState } from "../../types/topStoriesSlice.ts";
import { BASE_URL } from "../../constants/apiBaseUrl.ts";

const initialState: TopStoriesState = {
  articles: [],
  loading: false,
  error: false,
};

export const fetchTopStories = createAsyncThunk(
  "topStories/fetchTopStories",
  async (_) => {
    const apiKey = process.env?.REACT_APP_TOP_STORIES_API_KEY || "";

    const response = await axios.get(`${BASE_URL}world.json?api-key=${apiKey}`);

    return response.data.results.map((article: Article) => ({
      image: article.multimedia?.[0]?.url || "",
      title: article?.title,
      description: article?.abstract,
      time: new Date(article?.published_date).toLocaleTimeString(),
      author: article?.byline || "Unknown Author",
    }));
  }
);

const topStoriesSlice = createSlice({
  name: "topStories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopStories.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.articles = [];
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchTopStories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default topStoriesSlice.reducer;
