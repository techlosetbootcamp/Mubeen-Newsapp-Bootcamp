import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Article, EditorPicksState } from "../../types/editorPicksSlice.ts";
import { BASE_URL } from "../../constants/apiBaseUrl.ts";

const initialState: EditorPicksState = {
  articles: [],
  loading: false,
  error: false,
};

export const fetchEditorPicks = createAsyncThunk(
  "editorPicks/fetchEditorPicks",
  async (_) => {
    const apiKey = process.env?.REACT_APP_TOP_STORIES_API_KEY || "";

    const response = await axios.get(`${BASE_URL}arts.json?api-key=${apiKey}`);

    return response.data.results?.map((article: Article) => ({
      image: article.multimedia?.[0]?.url || "",
      title: article?.title,
      description: article?.abstract,
      time: new Date(article?.published_date).toLocaleTimeString(),
      author: article?.byline || "Unknown Author",
    }));
  }
);

const editorPicksSlice = createSlice({
  name: "editorPicks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditorPicks.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.articles = [];
      })
      .addCase(fetchEditorPicks.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchEditorPicks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default editorPicksSlice.reducer;
