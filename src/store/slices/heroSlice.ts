import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  HeroArticle,
  HeroState,
  IconStatePayload,
} from "../../types/heroSlice.ts";
import { BASE_URL } from "../../constants/apiBaseUrl.ts";

export const initialState: HeroState = {
  heroArticle: null,
  isHearted: false,
  isShared: false,
  isBookmarked: false,
  loading: false,
};

export const fetchHeroArticle = createAsyncThunk<HeroArticle, string>(
  "hero/fetchHeroArticle",
  async (section: string) => {
    const apiKey =
      process.env?.REACT_APP_TOP_STORIES_API_KEY ||
      "kzoxGuCiCSr7YVhGimt0gsmRkjtexpui";
    const response = await axios.get(
      `${BASE_URL}${section}.json?api-key=${apiKey}`
    );
    const articles = response.data.results?.map((article: HeroArticle) => ({
      image: article.multimedia?.[0]?.url || "",
      title: article?.title,
      description: article?.abstract,
      time: new Date(article?.published_date).toLocaleTimeString(),
      author: article?.byline || "Unknown Author",
    }));
    return articles[0];
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroIconState: (state, action: PayloadAction<IconStatePayload>) => {
      const { icon, value } = action.payload;

      if (icon === "heart") {
        state.isHearted = value;
      } else if (icon === "share") {
        state.isShared = value;
      } else if (icon === "bookmark") {
        state.isBookmarked = value;
      }
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
