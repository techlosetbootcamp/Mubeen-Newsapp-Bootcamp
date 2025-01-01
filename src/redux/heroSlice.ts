import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HeroArticle, HeroState } from "../types/heroSlice.ts";

const initialState: HeroState = {
  heroArticle: null,
  isHearted: false,
  isShared: false,
  isBookmarked: false,
  loading: false,
};

export const fetchHeroArticle = createAsyncThunk(
  "hero/fetchHeroArticle",
  async (section: string) => {
    const apiKey =
      process.env?.REACT_APP_TOP_STORIES_API_KEY ||
      "kzoxGuCiCSr7YVhGimt0gsmRkjtexpui";
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`
    );
    const articles = response.data.results.map((article: HeroArticle) => ({
      image: article.multimedia?.[0]?.url || "",
      title: article.title,
      description: article.abstract,
      time: new Date(article.published_date).toLocaleTimeString(),
      author: article.byline || "Unknown Author",
    }));
    return articles[0];
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroIconState: (state, action) => {
      const { icon, state: value } = action.payload;
      state[`is${icon.charAt(0).toUpperCase() + icon.slice(1)}`] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeroArticle.fulfilled, (state, action) => {
        state.heroArticle = action.payload;
        state.loading = false;
      })
      .addCase(fetchHeroArticle.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setHeroIconState } = heroSlice.actions;
export default heroSlice.reducer;
