import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNewsPost, fetchBlogPostById } from "./newsThunk";
import { INews } from "@/types/news";

interface newsSliceState {
  isLoading: boolean;
  allNewsPost: INews[] | null;
  singleNewsPost: INews | null;
  error: string;
  currentPage: number;
  total: number;
  numberOfPages: number;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: newsSliceState = {
  isLoading: false,
  allNewsPost: null,
  singleNewsPost: null,
  currentPage: 1,
  total: 0,
  numberOfPages: 1,
  error: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    selectNewsPost: (state, action) => {
      state.singleNewsPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNewsPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNewsPost.fulfilled, (state, action) => {
        state.allNewsPost = action.payload.blogs;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
        state.numberOfPages = action.payload.numberOfPages;
        state.isLoading = false;
      })
      .addCase(fetchAllNewsPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(fetchBlogPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action) => {
        state.singleNewsPost = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

export const { selectNewsPost } = newsSlice.actions;

export default newsSlice.reducer;
