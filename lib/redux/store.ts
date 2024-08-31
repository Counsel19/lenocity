import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/auth/authSlice";

import GallerySlice from "./slices/gallery/gallerySlice";
import NewsSlice from "./slices/news/newsSlice";
import ModalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    gallery: GallerySlice,
    news: NewsSlice,
    modal: ModalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
