import { createSlice } from "@reduxjs/toolkit";
import { fetchGallery } from "./galleryThunk";
import { IGallery } from "@/types/gallery";

interface gallerySliceState {
  isLoading: boolean;
  gallery: IGallery[] | null;
  selectedGalleryItem: IGallery | null;
  error: string;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: gallerySliceState = {
  isLoading: false,
  gallery: null,
  selectedGalleryItem: null,
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
        state.gallery = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

export const { selectGalleryItem } = gallerySlice.actions;

export default gallerySlice.reducer;
