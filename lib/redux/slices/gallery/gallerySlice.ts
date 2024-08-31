import { createSlice } from "@reduxjs/toolkit";
import { addToGallery, deleteItemFromGallery, fetchGallery } from "./galleryThunk";
import { IGallery } from "@/types/gallery";

interface gallerySliceState {
  isLoading: boolean;
  gallery: IGallery[] | null;
  selectedGalleryItem: IGallery | null;
  currentPage: number;
  total: number;
  numberOfPages: number;
  error: string;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: gallerySliceState = {
  isLoading: false,
  gallery: null,
  selectedGalleryItem: null,
  currentPage: 1,
  total: 0,
  numberOfPages: 1,
  error: "",
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    selectGalleryItem: (state, action) => {
      state.selectedGalleryItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.gallery = action.payload.gallery;

        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
        state.numberOfPages = action.payload.numberOfPages;
        state.isLoading = false;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      .addCase(addToGallery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToGallery.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addToGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      
      .addCase(deleteItemFromGallery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFromGallery.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteItemFromGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      
      ;
  },
});


export const { selectGalleryItem } = gallerySlice.actions;

export default gallerySlice.reducer;
