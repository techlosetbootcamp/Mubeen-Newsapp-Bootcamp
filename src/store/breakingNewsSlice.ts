import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BreakingNewsState } from "../types/breakinNewsSlice.ts";
import { BASE_URL } from "../constants/apiBaseUrl.ts";

const initialState: BreakingNewsState = {
  breakingNews: null,
  loading: false,
  error: false,
};

export const fetchBreakingNews = createAsyncThunk(
  "breakingNews/fetchBreakingNews",
  async (_) => {
    const apiKey = process.env?.REACT_APP_TOP_STORIES_API_KEY || "";

    const response = await axios.get(`${BASE_URL}world.json?api-key=${apiKey}`);

    if (response?.data?.results && response?.data?.results?.length > 0) {
      return (
        response?.data?.results?.[0]?.title || "No breaking news available."
      );
    }

    return "No breaking news available.";
  }
);

const breakingNewsSlice = createSlice({
  name: "breakingNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreakingNews.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.breakingNews = null;
      })
      .addCase(fetchBreakingNews.fulfilled, (state, action) => {
        state.loading = false;
        state.breakingNews = action.payload;
      })
      .addCase(fetchBreakingNews.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default breakingNewsSlice.reducer;
